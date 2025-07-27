import { useState, useEffect } from 'react';
import axios from 'axios';
import ShinyText from './ShinyText';


export default function CardPreview({ username, setStats }) {
  const [theme, setTheme] = useState('dark');
  const [showPrivate, setShowPrivate] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      if (!username) {
        setError('Enter a GitHub username');
        setStats(null);
        return;
      }
      
      setLoading(true);
      setError('');
      
      try {
        // Use your backend proxy to get the exact same stats as the image
        const response = await axios.get(`http://localhost:5000/api/stats/${username}`, {
          params: {
            theme: theme,
            count_private: showPrivate.toString()
          }
        });
        
        console.log('Stats from backend proxy:', response.data);
        setStats(response.data);
        setError('');
        
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError(`Failed to fetch stats: ${error.response?.data?.error || error.message}`);
        setStats(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, [username, showPrivate, theme, setStats]);

  const buildURL = () => {
    let url = `https://github-readme-stats.vercel.app/api?username=${username || 'DevvObiero'}&theme=${theme}&hide_border=true`;
    if (showPrivate) url += '&count_private=true';
    return url;
  };

  const handleCopy = async () => {
    const dynamicUrl = buildURL();
    const htmlCode = `<img src="${dynamicUrl}" alt="${username || 'DevvObiero'}'s GitHub Stats" />`;
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setError('Failed to copy text');
    }
  };

  return (
    <div className="flex flex-col mt-4 py-15 items-center justify-center space-y-6 text-gray-600 w-full">
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <label>Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="text-white cursor-target bg-black p-2 rounded"
          >
            {['default', 'dark', 'radical', 'merko', 'tokyonight', 'cobalt', 'synthwave', 'highcontrast', 'dracula'].map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showPrivate}
            className="cursor-target"
            onChange={() => setShowPrivate(!showPrivate)}
          />
          Show Private Commits
        </label>
      </div>
      <div className="w-full max-w-md px-4 relative">
        {/* {loading && <p className="text-blue-500">Loading stats...</p>} */}
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <img src={buildURL()} alt="GitHub stats preview" className="mx-auto w-full rounded-xl shadow-lg" />
        <div className="mt-4 text-center">
        
          <ShinyText
            onClick={handleCopy}
            text="Copy To Clipboard"
            speed={3}
            className="   cursor-target font-bold text-gray-800 mb-6 text-center"
          />
          
        </div>
        {copied && <p className="text-green-500 font-medium mt-2">Copied to clipboard</p>}
      </div>
    </div>
  );
}