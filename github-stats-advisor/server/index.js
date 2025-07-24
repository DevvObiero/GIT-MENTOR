import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import { calculateRank } from "./rank.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

app.post('/api/analyze', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    // Fetch repositories and user data
    const [reposRes, userRes] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}/repos?per_page=100`),
      axios.get(`https://api.github.com/users/${username}`)
    ]);
    const repos = reposRes.data;
    const followers = userRes.data.followers;

    // Basic counts
    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);
    const totalCommits = repos.length;    // placeholder: use repo count as proxy
    const totalPRs = 0;                  // TODO: fetch PR count via separate API
    const totalIssues = 0;               // TODO: fetch issues count via separate API
    const totalReviews = 0;              // TODO: fetch reviews count via separate API

    // Calculate rank
    const { level, percentile, nextLevel, nextThreshold } = calculateRank({
      commits: totalCommits,
      prs: totalPRs,
      issues: totalIssues,
      reviews: totalReviews,
      stars: totalStars,
      followers
    });
    const neededPoints = nextThreshold - percentile;

    // Build prompt for AI
    const prompt = `GitHub user '${username}' stats:\n
- Public repos: ${repos.length}\n` +
                   `- Commits (proxy): ${totalCommits}\n` +
                   `- Stars: ${totalStars}\n` +
                   `- Forks: ${totalForks}\n` +
                   `- Followers: ${followers}\n` +
                   `Current rank: ${level} (top ${percentile}%).\n` +
                   `To reach ${nextLevel} (top ${nextThreshold}%), you need about ${Math.round(neededPoints)} more score points.\n` +
                   `Give me 3 actionable tips to improve my GitHub profile based on these numbers.`;

    // Call Claude via OpenRouter
    const aiRes = await axios.post(
      OPENROUTER_URL,
      {
        model: 'qwen/qwen3-coder:free',
        messages: [
          { role: 'system', content: 'You are a helpful and friendly GitHub mentor.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const advice = aiRes.data.choices[0].message.content;

    // Respond with structured data
    res.json({ level, percentile, nextLevel, neededPoints, advice });

  } catch (error) {
    console.error('Error in /api/analyze:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate advice. Try again.' });
  }
});

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
