import TargetCursor from './TargetCursor';

export default function Readme() {
  return (
    <div className="text-white px-6 py-10 space-y-10 relative z-10">
       <div>
      <TargetCursor 
        hideDefaultCursor={true}
      />
      
      <h1>Hover over the elements below</h1>
      <button className="cursor-target">Click me!</button>
      <div className="cursor-target">Hover target</div>
    </div>

      <section className="space-y-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">📘 How to Write an Impressive GitHub README</h1>

        <p>
          Your GitHub README is like your <strong>digital handshake</strong> — it tells people who you are,
          what you’re working on, and why they should care. Here’s how to make yours stand out.
        </p>

        <h2 className="text-2xl font-semibold">🧩 1. Add Technology Stack Logos</h2>
        <p>
          Show off your tech stack using icons! You can copy links for logos from websites like{' '}
          <a
            href="https://devicon.dev/"
            className="text-blue-400 underline"
            target="_blank"
            rel="noreferrer"
          >
            Devicon
          </a>{' '}
          or{' '}
          <a
            href="https://simpleicons.org/"
            className="text-blue-400 underline"
            target="_blank"
            rel="noreferrer"
          >
            Simple Icons
          </a>. These resources let you copy the image URL and paste it directly in your README using Markdown.
        </p>

        <h2 className="text-2xl font-semibold">🎥 2. Watch This YouTube Tutorial</h2>
        <p>
          For a beginner-friendly walkthrough on writing great READMEs, check out this video:{' '}
          <a
            href="https://www.youtube.com/watch?v=ECuqb5Tv9qI"
            className="text-blue-400 underline"
            target="_blank"
            rel="noreferrer"
          >
            "GitHub README Tutorial"
          </a>
        </p>

        <h2 className="text-2xl font-semibold">📝 3. Write a Short Developer Bio</h2>
        <p>
          Include a short paragraph that introduces who you are, what you do, and what excites you. Example:
        </p>
        <blockquote className="bg-gray-800 p-4 rounded text-sm italic border-l-4 border-blue-500">
          "Hi! I'm Paul Obiero, a frontend developer passionate about building beautiful web apps
          with React and Tailwind. Currently leveling up with GitMentor and aiming for Microsoft!"
        </blockquote>

        <h2 className="text-2xl font-semibold">📅 4. Commit Every Day</h2>
        <p>
          Try to commit code daily. It builds habit, keeps your skills sharp, and shows in your
          contribution graph (the green dots on your GitHub profile).
        </p>
        <p>
          Even small commits — like fixing typos or updating your README — help you stay consistent.
          Over time, this builds a coding habit that compounds!
        </p>

        <h2 className="text-2xl font-semibold">🏅 5. Google Developer Badges</h2>
        <p>
          You can showcase your achievements by adding Google Developer badges (e.g., Android,
          Cloud, Web) to your profile. These demonstrate your verified skills and look impressive.
          Learn more at{' '}
          <a
            href="https://developers.google.com/profile/badges"
            className="text-blue-400 underline"
            target="_blank"
            rel="noreferrer"
          >
            developers.google.com/profile/badges
          </a>
        </p>

        <h2 className="text-xl font-semibold mt-6">💡 Final Word: Consistency &gt; Talent</h2>
        <p>
          Great developers aren’t born — they’re made through daily effort. Push your code, improve
          your skills, and stay curious. The green dots don’t lie: <strong>consistency is the real flex</strong>.
        </p>
      </section>
    </div>
  );
}
