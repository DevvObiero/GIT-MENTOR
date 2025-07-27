import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import { calculateRank } from './rank.js';
import { JSDOM } from 'jsdom';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Function to parse SVG and extract stats
const parseStatsFromSVG = (svgText) => {
  try {
    const dom = new JSDOM(svgText, { contentType: "image/svg+xml" });
    const document = dom.window.document;
    const textElements = document.querySelectorAll('text');
    
    const stats = {};
    let currentLabel = '';
    
    textElements.forEach((element) => {
      const text = element.textContent.trim();
      
      // Look for labels and their corresponding values
      if (text.includes('Total Stars')) {
        currentLabel = 'stars';
      } else if (text.includes('Total Commits')) {
        currentLabel = 'commits';
      } else if (text.includes('Total PRs')) {
        currentLabel = 'prs';
      } else if (text.includes('Total Issues')) {
        currentLabel = 'issues';
      } else if (text.includes('Contributed to')) {
        currentLabel = 'contributedTo';
      } else if (/^\d+$/.test(text) && currentLabel) {
        // If it's a number and we have a current label, store it
        stats[currentLabel] = parseInt(text);
        currentLabel = '';
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Error parsing SVG:', error);
    return null;
  }
};

// New endpoint to fetch stats from SVG
app.get('/api/stats/:username', async (req, res) => {
  const { username } = req.params;
  const { theme = 'dark', count_private = 'false' } = req.query;
  
  try {
    // Fetch SVG from GitHub ReadMe Stats
    const svgUrl = `https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&hide_border=true${count_private === 'true' ? '&count_private=true' : ''}`;
    
    console.log('Fetching SVG from:', svgUrl);
    const svgResponse = await axios.get(svgUrl);
    const parsedStats = parseStatsFromSVG(svgResponse.data);
    
    if (!parsedStats || Object.keys(parsedStats).length === 0) {
      throw new Error('Could not parse stats from SVG');
    }
    
    // Get followers count from GraphQL (since it's not in the card)
    let followers = 0;
    if (process.env.GITHUB_PAT) {
      try {
        const graphqlRes = await axios.post(
          'https://api.github.com/graphql',
          { 
            query: `query($login: String!) { user(login: $login) { followers { totalCount } } }`,
            variables: { login: username }
          },
          { headers: { Authorization: `Bearer ${process.env.GITHUB_PAT}` } }
        );
        
        if (graphqlRes.data?.data?.user?.followers) {
          followers = graphqlRes.data.data.user.followers.totalCount;
        }
      } catch (gqlError) {
        console.warn('Could not fetch followers:', gqlError.message);
      }
    }
    
    // Get reviews count from GraphQL (since it's not in the SVG card)
    let reviews = 0;
    if (process.env.GITHUB_PAT) {
      try {
        const reviewsRes = await axios.post(
          'https://api.github.com/graphql',
          { 
            query: `query($login: String!) { 
              user(login: $login) { 
                contributionsCollection { 
                  totalPullRequestReviewContributions 
                } 
              } 
            }`,
            variables: { login: username }
          },
          { headers: { Authorization: `Bearer ${process.env.GITHUB_PAT}` } }
        );
        
        if (reviewsRes.data?.data?.user?.contributionsCollection) {
          reviews = reviewsRes.data.data.user.contributionsCollection.totalPullRequestReviewContributions;
        }
      } catch (reviewError) {
        console.warn('Could not fetch reviews:', reviewError.message);
      }
    }

    // Normalize the stats object
    const stats = {
      totalStars: parsedStats.stars || 0,
      totalCommits: parsedStats.commits || 0,
      totalPRs: parsedStats.prs || 0,
      totalIssues: parsedStats.issues || 0,
      contributedTo: parsedStats.contributedTo || 0,
      followers: followers,
      reviews: reviews
    };
    
    console.log('Parsed and normalized stats:', stats);
    res.json(stats);
    
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    res.status(500).json({ error: `Failed to fetch stats: ${error.message}` });
  }
});

app.post('/api/analyze', async (req, res) => {
  const { username, stats } = req.body;
  if (!username || !stats) return res.status(400).json({ error: 'Username and stats required' });

  // Extract all stats including reviews
  const { totalStars, totalCommits, totalPRs, totalIssues, followers, contributedTo, reviews } = stats;
  
  const { level, percentile, nextLevel, nextThreshold } = calculateRank({
    commits: totalCommits,
    prs: totalPRs,
    issues: totalIssues,
    reviews: reviews || 0, // Use actual reviews count
    stars: totalStars,
    followers
  });
  const neededPoints = nextThreshold - percentile;

  // Updated prompt to include reviews metric
  const prompt = `GitHub user '${username}' stats:\n
- Commits: ${totalCommits}\n
- Stars: ${totalStars}\n
- Pull Requests: ${totalPRs}\n
- Issues: ${totalIssues}\n
- Reviews: ${reviews || 0}\n
- Followers: ${followers}\n
- Contributed to (last year): ${contributedTo}\n
Current rank: ${level} (top ${percentile}%).\n
To reach ${nextLevel} (top ${nextThreshold}%), you need ~${Math.round(neededPoints)} more points.\n
Give 3 actionable tips to improve my GitHub profile. Make sure to mention all the current stats including pull request reviews and contributed to repositories metrics.`;

  try {
    const aiRes = await axios.post(OPENROUTER_URL, {
      model: 'qwen/qwen3-coder:free',
      messages: [
        { role: 'system', content: 'You are a helpful GitHub mentor who provides detailed analysis of all GitHub metrics.' },
        { role: 'user', content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const advice = aiRes.data.choices[0].message.content;
    res.json({ rank: level, percentile, nextLevel, neededPoints, advice });
  } catch (error) {
    console.error('Error in /api/analyze:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate advice.' });
  }
});
app.get("/", (req, res) => {
  res.send("✅ GitMentor backend is live!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
