import React from 'react';
import ShinyText from './components/ShinyText';
import TechCarousel from './components/TechCarousel';



const About = () => {
  return (


    <div className="max-w-4xl mx-auto p-6 mt-3.5">
     
      <ShinyText
  text="About GitHub Mentor"
  speed={3}
  className="text-4xl font-bold text-gray-800 mb-4"
/>


      <p className="text-lg text-gray-700 mb-6">
        GitHub Stats Advisor is a tool that helps developers not just see their GitHub activity — but understand it.
        It analyzes your public profile and gives you personalized advice on how to grow as a developer.
      </p>
<TechCarousel />


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



      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Let’s Grow Together </h2>
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

      {/* Meet the Builder Section */}
      <div className="mt-16 border-t pt-10 text-center">
        <img
          src="https://storage.ko-fi.com/cdn/useruploads/cbe5eaa4-88c3-4bfc-9137-c5d20c5bafe9_e701eeca-e6da-4171-b394-3d62da6c5b76.png"
          alt="Paul Obiero"
          className="w-24 h-24 rounded-full mx-auto shadow-lg mb-4 object-cover"
        />
            <ShinyText
  text="Meet the Builder Paul Obiero "
  speed={3}
  className="text-3xl font-bold text-gray-800 mb-4"
/>

        <p className="text-gray-600 max-w-md mx-auto mt-2">
          I'm a frontend developer and aspiring software engineer passionate about building tools that empower others.
          I believe in learning out loud and building solutions that solve real problems in the tech community.
        </p>
        <a
          href="https://paulobiero.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-blue-700 transition"
        >
          Visit My Portfolio
        </a>
      </div>
    </div>
  );
};

export default About;
