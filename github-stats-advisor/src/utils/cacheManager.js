// Cache manager for reducing API calls
const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export const getCachedStats = (username) => {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const userCache = cache[username];
    
    if (userCache && Date.now() - userCache.timestamp < CACHE_DURATION) {
      return userCache.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to get cached stats:', error);
    return null;
  }
};

export const setCachedStats = (username, stats) => {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cache[username] = {
      data: stats,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to cache stats:', error);
  }
};

export const clearExpiredCache = () => {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const now = Date.now();
    
    Object.keys(cache).forEach(username => {
      if (now - cache[username].timestamp >= CACHE_DURATION) {
        delete cache[username];
      }
    });
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Failed to clear expired cache:', error);
  }
};