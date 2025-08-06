// Better SVG stats parser for GitHub readme stats
export const parseGitHubStatsSVG = async (username, theme = 'dark', showPrivate = false) => {
  try {
    const svgUrl = `https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&hide_border=true${showPrivate ? '&count_private=true' : ''}`;
    
    const response = await fetch(svgUrl);
    const svgText = await response.text();
    
    console.log('SVG URL:', svgUrl);
    console.log('SVG Response:', svgText.substring(0, 500) + '...');
    
    // Parse the SVG text more reliably
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, 'image/svg+xml');
    
    const stats = {
      totalStars: 0,
      totalCommits: 0, 
      totalPRs: 0,
      totalIssues: 0,
      contributedTo: 0,
      followers: 0,
      reviews: 0
    };
    
    // Get all text elements
    const textElements = doc.querySelectorAll('text');
    
    let currentMetric = '';
    textElements.forEach((element) => {
      const text = element.textContent.trim();
      
      // Look for metric labels
      if (text.includes('Total Stars')) {
        currentMetric = 'stars';
      } else if (text.includes('Total Commits')) {
        currentMetric = 'commits';
      } else if (text.includes('Total PRs')) {
        currentMetric = 'prs';
      } else if (text.includes('Total Issues')) {
        currentMetric = 'issues';
      } else if (text.includes('Contributed to')) {
        currentMetric = 'contributedTo';
      } else if (/^\d+$/.test(text) && currentMetric) {
        // Found a number after a metric label
        const value = parseInt(text);
        switch (currentMetric) {
          case 'stars':
            stats.totalStars = value;
            break;
          case 'commits':
            stats.totalCommits = value;
            break;
          case 'prs':
            stats.totalPRs = value;
            break;
          case 'issues':
            stats.totalIssues = value;
            break;
          case 'contributedTo':
            stats.contributedTo = value;
            break;
        }
        currentMetric = '';
      }
    });
    
    console.log('Parsed stats from SVG:', stats);
    return stats;
    
  } catch (error) {
    console.error('Error parsing GitHub stats SVG:', error);
    return null;
  }
};