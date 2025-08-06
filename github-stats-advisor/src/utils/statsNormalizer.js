// Normalize GitHub stats to consistent JSON format
export const normalizeStats = (rawStats) => {
  // Handle different possible stat formats
  const normalized = {
    totalStars: parseInt(rawStats.totalStars || rawStats.stars || 0),
    totalCommits: parseInt(rawStats.totalCommits || rawStats.commits || 0),
    totalPRs: parseInt(rawStats.totalPRs || rawStats.prs || rawStats.pullRequests || 0),
    totalIssues: parseInt(rawStats.totalIssues || rawStats.issues || 0),
    followers: parseInt(rawStats.followers || 0),
    contributedTo: parseInt(rawStats.contributedTo || rawStats.contributed || 0),
    reviews: parseInt(rawStats.reviews || 0)
  };

  // Validate and log the normalized data
  console.log('Raw stats received:', rawStats);
  console.log('Normalized stats:', normalized);
  
  // Ensure no NaN values
  Object.keys(normalized).forEach(key => {
    if (isNaN(normalized[key])) {
      normalized[key] = 0;
    }
  });

  return normalized;
};