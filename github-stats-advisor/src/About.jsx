import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 mt-3.5">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About GitHub Stats Advisor</h1>

      <p className="text-lg text-gray-700 mb-6">
        GitHub Stats Advisor is a tool that helps developers not just see their GitHub activity — but understand it.
        It analyzes your public profile and gives you personalized advice on how to grow as a developer.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Why I Built This</h2>
      <p className="text-gray-700 mb-6">
        I wanted a tool that goes beyond green squares and stars. I was tired of asking “What should I do to improve?”
        — so I built something that tells you: "You're 7 pull requests away from leveling up" or "Improve your visibility by earning 150 more stars."
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Who It’s For</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Students preparing for tech internships</li>
        <li>Beginner developers building their portfolio</li>
        <li>Open source contributors who want targeted feedback</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">What You Can Do</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Enter your GitHub username</li>
        <li>View live stats like stars, PRs, issues, and commits</li>
        <li>Get a growth grade (like A, B+, etc.)</li>
        <li>Receive actionable advice on how to improve</li>
        <li>Track progress over time (coming soon!)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Built With</h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>React + Tailwind CSS</li>
        <li>GitHub REST API v3</li>
        <li>Chart.js (coming soon for data visualizations)</li>
        <li>Optional backend: Node.js + MySQL or Firebase</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Let’s Grow Together 🚀</h2>
      <p className="text-gray-700">
        This project is for devs who want more than just numbers — they want progress. If you have ideas, feedback, or want to contribute, feel free to reach out or submit a pull request.
      </p>

      <p className="italic text-sm text-gray-500 mt-6">
        "You don't improve what you don't measure — but numbers only matter when they guide action."
      </p>

      <div className="mt-10 text-center">
        <img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          className="h-10 mx-auto mb-2"
        />
        <a
          href="https://ko-fi.com/devvobiero"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline"
        >
          Support the creator on Ko-fi
        </a>
      </div>

      <p className="text-xs text-center text-gray-400 mt-8">
        This project uses data powered in part by the{' '}
        <a
          href="https://github.com/anuraghazra/github-readme-stats"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Readme Stats API by Anurag Hazra
        </a>.
      </p>
    </div>
  );
};

export default About;
