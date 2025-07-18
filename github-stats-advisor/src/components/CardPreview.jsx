import React, { useState } from 'react';

const themes = ["default", "dark", "radical", "merko", "tokyonight", "cobalt", "synthwave", "highcontrast", "dracula"];

export default function CardPreview({ username }) {
  const [theme, setTheme] = useState("cobalt");
  const [showPrivate, setShowPrivate] = useState(false);
  const [hideBorder, setHideBorder] = useState(false);
  const [copied, setCopied] = useState(false);

  const buildURL = () => {
    let url = `https://github-readme-stats.vercel.app/api?username=${username || 'DevvObiero'}&theme=${theme}`;
    if (showPrivate) url += "&count_private=true";
    if (hideBorder) url += "&hide_border=true";
    return url;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildURL());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="flex flex-col mt-4 py-15 items-center justify-center space-y-6 text-gray-600 w-full">
      {/* Dropdowns and Toggles */}
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <label>Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="text-white bg-black p-2 rounded"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showPrivate}
            onChange={() => setShowPrivate(!showPrivate)}
          />
          Show Private Commits
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hideBorder}
            onChange={() => setHideBorder(!hideBorder)}
          />
          Hide Border
        </label>
      </div>

      {/* Preview Card */}
      <div className="w-full max-w-md px-4 relative">
        <img
          src={buildURL()}
          alt="GitHub stats preview"
          className="mx-auto w-full rounded-xl shadow-lg"
        />

        {/* Copy to Clipboard Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleCopy}
            className=" hover:text-purple-950 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
          >
             Copy To clipboard
          </button>
        
              </div>
              <div  className="mt-2 text-center">
                  {copied && (
            <p className="text-green-500 mt-2 font-medium">✅ Copied!</p>
          )}
              </div>
      </div>
    </div>
  );
}
