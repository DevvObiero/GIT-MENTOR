import { useState } from 'react';
import axios from 'axios';
import StarBorder from "./StartBorder"; 

const AdviceSection = ({ username, stats }) => {
  const [rankInfo, setRankInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateAdvice = async () => {
    if (!username || !stats) {
      setError('Username and stats required.');
      return;
    }
    
    // Check if contributedTo is available in stats
    if (!stats.contributedTo && stats.contributedTo !== 0) {
      setError('Missing contributedTo data in stats.');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
     const response = await axios.post('https://git-mentor-production.up.railway.app/api/analyze', { username, stats });
      setRankInfo(response.data);
    } catch (err) {
      setError('Failed to generate advice.');
      console.error('Advice generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-2xl shadow-md mx-auto mt-10 text-center">
      {/* <h2 className="text-2xl font-semibold mb-4">GitHub Profile Advice</h2> */}
      
      {/* Show stats summary for debugging */}
      {stats && (
        <div className="mb-4 text-sm text-gray-600">
          <p>Stats loaded: {Object.keys(stats).join(', ')}</p>
        </div>
      )}
      
     
      
      <StarBorder
  as="a"
  onClick={handleGenerateAdvice}
  disabled={loading || !stats}
  color="#fff"
  speed="6s"
  className="cursor-pointer cursor-target"
>
  {loading ? 'Generating...' : 'Generate Advice'}
</StarBorder>


      

      {error && <p className="mt-4 text-red-500">{error}</p>}
      
      {rankInfo && (
        <div className="mt-6 text-left p-4 rounded">
          <p>Your rank: <strong>{rankInfo.rank}</strong> (Top {rankInfo.percentile}%).</p>
          <p>To reach <strong>{rankInfo.nextLevel}</strong>, you need ~<strong>{Math.ceil(rankInfo.neededPoints)}</strong> points.</p>
          <hr className="my-4" />
          <p className="whitespace-pre-line">{rankInfo.advice}</p>
        </div>
      )}
    </div>
  );
};

export default AdviceSection;