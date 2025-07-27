import TargetCursor from './TargetCursor';
import ShinyText from './ShinyText';
import Footer from './Footer';




export default function Readme() {
  return (
    <div className="text-gray-600 px-6 py-10 space-y-10 relative z-10">
      <div className="hidden md:block">
  <TargetCursor hideDefaultCursor={true} />
</div>


          <section className="space-y-6 max-w-4xl mx-auto">
                  <ShinyText
  text="How to Write an Impressive GitHub README"
  speed={3}
  className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6 text-center"
/>
      
        <p>
          Your GitHub README is like your <strong>digital handshake</strong> — it tells people who you are,
          what you’re working on, and why they should care. Here’s how to make yours stand out.
        </p>

         <ShinyText
  text="Add Technology Stack Logos"
  speed={3}
  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
/>
      
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
 <ShinyText
  text="Watch This YouTube Tutorial"
  speed={3}
  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
/>
      
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
 <ShinyText
  text="Write a Short Developer Bio"
  speed={3}
  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
/>
        <p>
          Include a short paragraph that introduces who you are, what you do, and what excites you. Example:
        </p>
        <blockquote className="bg-gray-800 p-4 rounded text-sm italic border-l-4 border-blue-500">
          "Hi! I'm Paul Obiero, a reallllll badman!!"
        </blockquote>

       <ShinyText
  text="Commit Code Daily"
  speed={3}
  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
/>
        <p>
          Try to commit code daily. It builds habit, keeps your skills sharp, and shows in your
          contribution graph (the green dots on your GitHub profile).
        </p>
        <p>
          Even small commits — like fixing typos or updating your README — help you stay consistent.
          Over time, this builds a coding habit that compounds!
        </p>

       

        <h2 className="text-xl font-semibold mt-6"> Final Word: Consistency &gt; Talent</h2>
        <p>
          Great developers aren’t born — they’re made through daily effort. Push your code, improve
          your skills, and stay curious. The green dots don’t lie: <strong>consistency is the real flex</strong>.
        </p>
      </section>
         <Footer />

    </div>

  );
}
