import { normalizeStats } from './statsNormalizer';

// Original ranking algorithm from server/rank.js
function exponential_cdf(x) {
  return 1 - 2 ** -x;
}

function log_normal_cdf(x) {
  return x / (1 + x);
}

const calculateRank = (stats) => {
  const { totalCommits: commits, totalPRs: prs, totalIssues: issues, reviews = 0, totalStars: stars, followers } = stats;
  
  const COMMITS_MEDIAN = 250;
  const COMMITS_WEIGHT = 2;
  const PRS_MEDIAN = 50;
  const PRS_WEIGHT = 3;
  const ISSUES_MEDIAN = 25;
  const ISSUES_WEIGHT = 1;
  const REVIEWS_MEDIAN = 2;
  const REVIEWS_WEIGHT = 1;
  const STARS_MEDIAN = 50;
  const STARS_WEIGHT = 4;
  const FOLLOWERS_MEDIAN = 10;
  const FOLLOWERS_WEIGHT = 1;

  const TOTAL_WEIGHT =
    COMMITS_WEIGHT +
    PRS_WEIGHT +
    ISSUES_WEIGHT +
    REVIEWS_WEIGHT +
    STARS_WEIGHT +
    FOLLOWERS_WEIGHT;

  const weightedSum =
    COMMITS_WEIGHT * exponential_cdf(commits / COMMITS_MEDIAN) +
    PRS_WEIGHT * exponential_cdf(prs / PRS_MEDIAN) +
    ISSUES_WEIGHT * exponential_cdf(issues / ISSUES_MEDIAN) +
    REVIEWS_WEIGHT * exponential_cdf(reviews / REVIEWS_MEDIAN) +
    STARS_WEIGHT * log_normal_cdf(stars / STARS_MEDIAN) +
    FOLLOWERS_WEIGHT * log_normal_cdf(followers / FOLLOWERS_MEDIAN);

  const rank = 1 - weightedSum / TOTAL_WEIGHT;
  const percentile = rank * 100;

  const THRESHOLDS = [1, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  const LEVELS = ["S", "A+", "A", "A-", "B+", "B", "B-", "C+", "C"];

  const idx = THRESHOLDS.findIndex((t) => percentile <= t);
  const level = LEVELS[idx];

  const nextLevel = idx > 0 ? LEVELS[idx - 1] : null;
  const nextThreshold = idx > 0 ? THRESHOLDS[idx - 1] : 0;

  return { level, percentile, nextLevel, nextThreshold, totalScore: Math.round(percentile) };
};

// Comprehensive GitHub advice engine
export const generateAdvice = (username, rawStats) => {
  // Normalize the stats first
  const stats = normalizeStats(rawStats);
  console.log('Raw stats received:', rawStats);
  console.log('Normalized stats:', stats);
  
  // Debug: Show what we're actually calculating with
  console.log('Calculating rank with:', {
    commits: stats.totalCommits,
    prs: stats.totalPRs, 
    issues: stats.totalIssues,
    stars: stats.totalStars,
    followers: stats.followers,
    reviews: stats.reviews
  });
  
  const { totalStars, totalCommits, totalPRs, totalIssues, followers, contributedTo, reviews } = stats;
  
  // Use the original ranking algorithm
  const { level: rank, percentile, nextLevel, nextThreshold, totalScore } = calculateRank(stats);
  const neededPoints = nextThreshold - percentile;
  
  // Contextual rank descriptions based on actual stats
  const getContextualDescription = (rank, stats) => {
    const { totalCommits } = stats;
    const isExperienced = totalCommits > 100;
    
    const baseDescriptions = {
      'S': 'Advanced developer - Highly skilled',
      'A+': 'Proficient developer - Above average', 
      'A': 'Competent developer - Good foundation',
      'A-': 'Solid developer - Building expertise',
      'B+': 'Developing skills - Making progress',
      'B': 'Active learner - Growing steadily',
      'B-': 'Emerging developer - On the right track',
      'C+': isExperienced ? 'Experienced coder - Focus on collaboration' : 'Building foundation - Good start',
      'C': 'Beginning journey - Lots of potential'
    };
    
    return baseDescriptions[rank] || 'GitHub Developer';
  };
  
  const description = getContextualDescription(rank, stats);
  
  // neededPoints already calculated above
  
  // Comprehensive analysis
  let advice = `════════════════════════════════\n`;
  advice += `🚀 GITHUB PROFILE ANALYSIS FOR ${username.toUpperCase()}\n`;
  advice += `════════════════════════════════\n\n`;
  
  advice += `📊 CURRENT STANDING:\n`;

  advice += `• Rank: ${rank} (${description})\n`;
  advice += `• Percentile: Top ${percentile}% of developers\n`;
  advice += `• Percentile Score: ${Math.round(percentile)}%\n`;
  advice += `• Next Target: ${nextLevel} (${Math.abs(Math.ceil(neededPoints))} percentile points to improve)\n\n`;
  

// Replace the ugly table with mobile-friendly metrics
advice += `📈 DETAILED METRICS BREAKDOWN:\n\n`;

const metrics = [
  { name: 'Total Commits', current: totalCommits, type: 'commits' },
  { name: 'Pull Requests', current: totalPRs, type: 'prs' },
  { name: 'Issues Opened', current: totalIssues, type: 'issues' },
  { name: 'Stars Earned', current: totalStars, type: 'stars' },
  { name: 'Followers', current: followers, type: 'followers' },
  { name: 'Repos Contributed', current: contributedTo, type: 'contributed' },
  { name: 'Code Reviews', current: reviews, type: 'reviews' }
];

metrics.forEach(metric => {
  const target = getTarget(metric.type, metric.current);
  const impact = getImpact(metric.type, metric.current);
  
  advice += `▶ ${metric.name}\n`;
  advice += `  Current: ${metric.current} | Target: ${target} | Impact: ${impact}\n\n`;
});

  advice += `📊 RANKING CALCULATION:\n`;

  advice += `• Commits: ${totalCommits} (median: 250)\n`;
  advice += `• Pull Requests: ${totalPRs} (median: 50)\n`;
  advice += `• Issues: ${totalIssues} (median: 25)\n`;
  advice += `• Stars: ${totalStars} (median: 50)\n`;
  advice += `• Followers: ${followers} (median: 10)\n`;
  advice += `• Reviews: ${reviews} (median: 2)\n`;
  advice += `• PERCENTILE: ${Math.round(percentile)}% (lower is better)\n\n`;
  
  advice += getDetailedAdvice(username, stats, rank, neededPoints);
  
  return {
    rank,
    percentile,
    nextLevel,
    neededPoints,
    advice,
    score: Math.round(totalScore),
    description
  };
};

const getTarget = (metric, current) => {
  const targets = {
    commits: Math.max(current + 50, 200),
    prs: Math.max(current + 10, 30),
    issues: Math.max(current + 5, 20),
    stars: Math.max(current + 25, 100),
    followers: Math.max(current + 15, 50),
    contributed: Math.max(current + 5, 15),
    reviews: Math.max(current + 3, 10)
  };
  return targets[metric] || current + 10;
};

const getImpact = (metric, current) => {
  const impacts = {
    commits: current < 100 ? 'High' : current < 500 ? 'Medium' : 'Low',
    prs: current < 20 ? 'Very High' : current < 50 ? 'High' : 'Medium',
    issues: current < 15 ? 'High' : current < 30 ? 'Medium' : 'Low',
    stars: current < 50 ? 'Very High' : current < 200 ? 'High' : 'Medium',
    followers: current < 25 ? 'High' : current < 100 ? 'Medium' : 'Low',
    contributed: current < 10 ? 'Very High' : current < 25 ? 'High' : 'Medium',
    reviews: current < 5 ? 'Very High' : current < 15 ? 'High' : 'Medium'
  };
  return impacts[metric] || 'Medium';
};

const getDetailedAdvice = (username, stats, rank, neededPoints) => {
  const { totalStars, totalCommits, totalPRs, totalIssues, followers, contributedTo, reviews = 0 } = stats;
  
  // Advanced developer profile analysis
  const analyzeProfile = () => {
    const hasHighCommits = totalCommits > 500;
    const hasProjects = totalStars > 10;
    const isCollaborative = totalPRs > 5 || contributedTo > 3;
    const isCommunityActive = followers > 5 || totalIssues > 5;
    const isExperienced = totalCommits > 200;
    
    let profileType = 'beginner';
    let context = '';
    
    if (hasHighCommits && !isCollaborative) {
      profileType = 'solo_developer';
      context = 'You have strong coding consistency but limited collaboration experience.';
    } else if (hasProjects && hasHighCommits && isCollaborative) {
      profileType = 'well_rounded';
      context = 'You have a balanced development profile with good project and collaboration skills.';
    } else if (isExperienced && !hasProjects) {
      profileType = 'private_developer';
      context = 'You have significant coding experience but limited public project visibility.';
    } else if (totalCommits < 50) {
      profileType = 'newcomer';
      context = 'You are at the beginning of your GitHub journey.';
    } else {
      profileType = 'developing';
      context = 'You are actively building your development skills and presence.';
    }
    
    return { profileType, context, hasHighCommits, hasProjects, isCollaborative, isCommunityActive, isExperienced };
  };
  
  const profile = analyzeProfile();
  
  let advice = `🎯 PERSONALIZED GROWTH STRATEGY:\n\n`;
  
  advice += `📋 PROFILE ANALYSIS:\n`;

  advice += `${profile.context}\n`;
  if ((rank === 'C+' || rank === 'C') && profile.isExperienced) {
    advice += `\nIMPORTANT: Your ${rank} rank reflects GitHub's collaboration scoring, not coding skill.\n`;
    advice += `With ${totalCommits} commits, you're clearly an experienced developer.\n`;
    advice += `Focus on open source contributions and community engagement to improve your rank.\n`;
  } else if (rank === 'C+' && totalCommits > 50) {
    advice += `\nYour C+ rank shows room for growth in GitHub collaboration and visibility.\n`;
  }
  advice += `\n`;
  advice += `\n`;
  
  // Priority analysis
  const priorities = [];
  if (totalPRs < 20) priorities.push({ area: 'Pull Requests', priority: 'CRITICAL', impact: 'Very High' });
  if (reviews < 5) priorities.push({ area: 'Code Reviews', priority: 'CRITICAL', impact: 'Very High' });
  if (totalStars < 50) priorities.push({ area: 'Project Quality', priority: 'HIGH', impact: 'High' });
  if (totalCommits < 100) priorities.push({ area: 'Consistency', priority: 'HIGH', impact: 'High' });
  if (contributedTo < 10) priorities.push({ area: 'Open Source', priority: 'MEDIUM', impact: 'Medium' });
  
  advice += `🔥 IMMEDIATE ACTION ITEMS (Next 30 Days):\n`;
  priorities.slice(0, 3).forEach((item, i) => {
    advice += `${i + 1}. [${item.priority}] ${item.area} - ${item.impact} Impact\n`;
  });
  advice += `\n`;
  
  advice += `📋 DETAILED IMPROVEMENT PLAN:\n\n`;
  
  if (profile.profileType === 'solo_developer') {
    advice += `🤝 COLLABORATION FOCUS (Your Priority):\n`;
    advice += `• Your ${totalCommits} commits show strong coding skills\n`;
    advice += `• Focus on open source contributions to showcase collaboration\n`;
    advice += `• Join developer communities and contribute to discussions\n`;
    advice += `• Participate in code reviews to share your expertise\n\n`;
  } else if (profile.profileType === 'private_developer') {
    advice += `⭐ VISIBILITY ENHANCEMENT (Your Priority):\n`;
    advice += `• Your experience (${totalCommits} commits) deserves recognition\n`;
    advice += `• Create public repositories showcasing your skills\n`;
    advice += `• Write technical blog posts about your projects\n`;
    advice += `• Share code snippets and solutions publicly\n\n`;
  } else if (totalCommits < 200) {
    advice += `🔄 CONSISTENCY BUILDING:\n`;
    advice += `• Set up a daily coding routine (minimum 1 hour)\n`;
    advice += `• Use GitHub's contribution graph as motivation\n`;
    advice += `• Create small, meaningful commits with clear messages\n`;
    advice += `• Target: ${Math.max(200 - totalCommits, 50)} more commits in next 3 months\n\n`;
  }
  
  if (totalPRs < 30) {
    advice += `🤝 COLLABORATION ENHANCEMENT:\n`;
    advice += `• Find 5 active open source projects in your tech stack\n`;
    advice += `• Start with documentation improvements and bug fixes\n`;
    advice += `• Join 'good first issue' initiatives\n`;
    advice += `• Participate in Hacktoberfest and similar events\n`;
    advice += `• Target: ${Math.max(30 - totalPRs, 10)} PRs in next 2 months\n\n`;
  }
  
  if (totalStars < 100) {
    advice += `⭐ PROJECT SHOWCASE STRATEGY:\n`;
    advice += `• Build 3 portfolio-worthy projects demonstrating different skills\n`;
    advice += `• Write comprehensive READMEs with demos and screenshots\n`;
    advice += `• Share projects on Reddit, Twitter, and dev communities\n`;
    advice += `• Create tutorial content around your projects\n`;
    advice += `• Target: ${Math.max(100 - totalStars, 25)} stars through quality projects\n\n`;
  }
  
  if (reviews < 10) {
    advice += `👥 CODE REVIEW MASTERY:\n`;
    advice += `• Join review teams in projects you contribute to\n`;
    advice += `• Offer to review PRs from junior developers\n`;
    advice += `• Focus on constructive feedback and learning\n`;
    advice += `• Document your review process and learnings\n`;
    advice += `• Target: ${Math.max(10 - reviews, 5)} reviews per month\n\n`;
  }
  
  if (followers < 50) {
    advice += `🌟 COMMUNITY BUILDING:\n`;
    advice += `• Share your coding journey and learnings\n`;
    advice += `• Write technical blog posts or create video content\n`;
    advice += `• Engage meaningfully with other developers' content\n`;
    advice += `• Participate in tech Twitter and LinkedIn discussions\n`;
    advice += `• Target: ${Math.max(50 - followers, 15)} new followers through value creation\n\n`;
  }
  
  advice += `🎯 90-DAY MILESTONE TARGETS:\n`;
  advice += `• Commits: +${Math.min(neededPoints * 0.3 / 0.3, 100)} (Daily coding habit)\n`;
  advice += `• Pull Requests: +${Math.min(neededPoints * 0.4 / 2, 15)} (Open source focus)\n`;
  advice += `• Stars: +${Math.min(neededPoints * 0.3 / 0.8, 50)} (Quality projects)\n\n`;
  
  advice += `🏆 SUCCESS METRICS TO TRACK:\n`;
  advice += `• Weekly commit streak maintenance\n`;
  advice += `• PR acceptance rate and review feedback quality\n`;
  advice += `• Project engagement (stars, forks, issues)\n`;
  advice += `• Community interaction and follower growth\n`;
  advice += `• Code review participation and mentorship activities\n\n`;
  
  advice += `💡 PRO TIPS FOR ${rank} DEVELOPERS:\n`;
  if (rank === 'S' || rank === 'S+') {
    advice += `• Focus on architectural contributions and technical leadership\n`;
    advice += `• Mentor other developers and lead open source initiatives\n`;
    advice += `• Speak at conferences and write advanced technical content\n`;
  } else if (rank === 'A' || rank === 'A+') {
    advice += `• Deepen expertise in specific technologies or domains\n`;
    advice += `• Take on more complex features and system design challenges\n`;
    advice += `• Start mentoring junior developers in your projects\n`;
  } else {
    advice += `• Focus on consistent daily practice and learning\n`;
    advice += `• Build a strong foundation with diverse project types\n`;
    advice += `• Engage actively with the developer community\n`;
  }
  
  advice += `\n═══════════════════════════════\n`;
  advice += `🚀 NEXT MILESTONE: Reach ${rank === 'S' ? 'S+' : 'next level'} by earning ${Math.ceil(neededPoints)} more points!\n`;
  advice += `📅 Estimated Timeline: ${Math.ceil(neededPoints / 20)} weeks with consistent effort\n`;
  advice += `═════════════════════════════════`;
  
  return advice;
};