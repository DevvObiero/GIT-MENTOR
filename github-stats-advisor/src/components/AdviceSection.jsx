// AdviceSection.jsx
import { useState } from "react";
import axios from "axios";

const AdviceSection = ({ username }) => {
  const [rankInfo, setRankInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateAdvice = async () => {
    if (!username) {
      setError("Please enter your GitHub username first.");
      return;
    }

    setLoading(true);
    setError("");
    setRankInfo(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/analyze",
        { username }
      );
const { level, percentile, nextLevel, neededPoints, advice } = response.data;
setRankInfo({ rank: level, percentile, nextLevel, neededPoints, advice });

    } catch (err) {
      console.error("Error generating advice:", err);
      setError("Failed to generate advice. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4  rounded-2xl shadow-md  mx-auto mt-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">GitHub Profile Advice</h2>

      <button
        onClick={handleGenerateAdvice}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Advice"}
      </button>

      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}

      {rankInfo && (
        <div className="mt-6 text-left  p-4 rounded">
          <p>
            Your current rank: <strong>{rankInfo.rank}</strong> (Top {rankInfo.percentile}%).
          </p>
          <p className="mt-2">
            To reach <strong>{rankInfo.nextLevel}</strong>, you need approximately{" "}
            <strong>{Math.ceil(rankInfo.neededPoints)}</strong> more score points.
          </p>
          <hr className="my-4" />
          <p className="whitespace-pre-line">{rankInfo.advice}</p>
        </div>
      )}
    </div>
  );
};

export default AdviceSection;
