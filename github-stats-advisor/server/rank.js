// rank.js
function exponential_cdf(x) {
  return 1 - 2 ** -x;
}
function log_normal_cdf(x) {
  return x / (1 + x);
}
export function calculateRank({
  all_commits = false,
  commits = 0,
  prs = 0,
  issues = 0,
  reviews = 0,
  stars = 0,
  followers = 0,
}) {
  const COMMITS_MEDIAN = all_commits ? 1000 : 250,
        COMMITS_WEIGHT = 2;
  const PRS_MEDIAN = 50,
        PRS_WEIGHT = 3;
  const ISSUES_MEDIAN = 25,
        ISSUES_WEIGHT = 1;
  const REVIEWS_MEDIAN = 2,
        REVIEWS_WEIGHT = 1;
  const STARS_MEDIAN = 50,
        STARS_WEIGHT = 4;
  const FOLLOWERS_MEDIAN = 10,
        FOLLOWERS_WEIGHT = 1;

  const TOTAL_WEIGHT =
    COMMITS_WEIGHT +
    PRS_WEIGHT +
    ISSUES_WEIGHT +
    REVIEWS_WEIGHT +
    STARS_WEIGHT +
    FOLLOWERS_WEIGHT;

  const weightedSum =
    COMMITS_WEIGHT * exponential_cdf(commits / COMMITS_MEDIAN) +
    PRS_WEIGHT      * exponential_cdf(prs     / PRS_MEDIAN) +
    ISSUES_WEIGHT  * exponential_cdf(issues  / ISSUES_MEDIAN) +
    REVIEWS_WEIGHT * exponential_cdf(reviews / REVIEWS_MEDIAN) +
    STARS_WEIGHT   * log_normal_cdf(stars    / STARS_MEDIAN) +
    FOLLOWERS_WEIGHT * log_normal_cdf(followers/ FOLLOWERS_MEDIAN);

  const rankVal = 1 - weightedSum / TOTAL_WEIGHT;
  const percentile = rankVal * 100;

  const THRESHOLDS = [1, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  const LEVELS     = ["S","A+","A","A-","B+","B","B-","C+","C"];
  const idx = THRESHOLDS.findIndex(t => percentile <= t);

  return {
    level: LEVELS[idx],
    percentile: Math.round(percentile*100)/100,
    nextThreshold: THRESHOLDS[idx-1] ?? 0,
    nextLevel: LEVELS[idx-1] ?? LEVELS[0]
  };
}
