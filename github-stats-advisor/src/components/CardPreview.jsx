import React, { useState } from 'react';

const themes = ["default", "dark", "radical", "merko", "tokyonight", "cobalt", "synthwave", "highcontrast", "dracula"];

export default function CardPreview({ username }) {
  const [theme, setTheme] = useState("cobalt");
  const [showPrivate, setShowPrivate] = useState(false);
  const [hideBorder, setHideBorder] = useState(false);

  const buildURL = () => {
    let url = `https://github-readme-stats.vercel.app/api?username=${username || 'DevvObiero'}&theme=${theme}`;
    if (showPrivate) url += "&count_private=true";
    if (hideBorder) url += "&hide_border=true";
    return url;
  };

  return (
    <div className="flex flex-col   mt-4 py-8   items-center justify-center space-y-6 text-white w-full">
      
      {/* Theme Dropdown */}
    
      {/* Toggle Checkboxes */}
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

      {/* Card Preview */}
      <div className="w-full max-w-md px-4">
        <img
          src={buildURL()}
          alt="GitHub stats preview"
          className="mx-auto w-full rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
