import TargetCursor from './TargetCursor';
import ShinyText from './ShinyText';
import Footer from './Footer';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'




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
  text="Add your Tech Stack Logos"
  speed={3}
  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
/>
      
        <p>
          Show off your tech stack using icons! You can copy links for logos from a public repository ive always used {' '}
         
        <a
  href="https://github.com/tandpfun/skill-icons#readme"
  target="_blank"
            rel="noreferrer"
            className="cursor-target"
>
  <ShinyText
    text="This Free Repository"
    speed={3}
    className="font-bold text-gray-800 mb-6 text-center "
  />
</a>

  <div className="flex justify-center flex-wrap gap-4 py-6  my-4">
  <img src="https://user-images.githubusercontent.com/74038190/212257454-16e3712e-945a-4ca2-b238-408ad0bf87e6.gif" alt="JS" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Figma-Dark.svg" alt="Figma" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/1ac69ce5fbc389725f16f989fa53c62d6e1b4883/social%20icons/css3.svg" alt="CSS" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/React-Dark.svg" alt="React" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Postman.svg" alt="Postman" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/NodeJS-Dark.svg" alt="Node" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/bablubambal/All_logo_and_pictures/1ac69ce5fbc389725f16f989fa53c62d6e1b4883/social%20icons/html5.svg" alt="HTML" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/ExpressJS-Dark.svg" alt="Express" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Electron.svg" alt="Electron" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/Webpack-Dark.svg" alt="Webpack" width="50" height="50" />
  <img src="https://raw.githubusercontent.com/tandpfun/skill-icons/65dea6c4eaca7da319e552c09f4cf5a9a8dab2c8/icons/TailwindCSS-Dark.svg" alt="Tailwind" width="50" height="50" />
</div>

          This resource lets you copy the image URL and paste it directly in your README using Markdown.
          <SyntaxHighlighter language="markdown" style={oneDark}>
  {`![Tailwind](https://raw.githubusercontent.com/...)`}
</SyntaxHighlighter>
        </p>

 <ShinyText
  text="Write a Short Developer Bio"
  speed={3}
  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
/>
        <p>
          Include a short paragraph that introduces who you are, what you do, and what excites you. Example:
        </p>
     

     <ShinyText
  text="Commit Code Daily"
  speed={3}
  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
/>

<p className="text-gray-700 mb-4">
  Try to commit code daily. It builds habit, keeps your skills sharp, and shows in your
  contribution graph (the green dots on your GitHub profile).
</p>

<div className="flex justify-center mb-6">
  <img
    src="./public/Screenshot 2025-07-27 153153.png"
    alt="GitHub Contribution Graph Example"
    className="rounded-lg border shadow-md max-w-full sm:max-w-md"
  />
</div>

<p className="text-gray-700">
  Even small commits — like fixing typos or updating your README — help you stay consistent.
  Over time, this builds a coding habit that compounds!
</p>

        <ShinyText
  text="Watch This YouTube Tutorial"
  speed={3}
  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center"
/>
           

        <p>
          For a beginner-friendly walkthrough on writing great READMEs, check out this video:{' '}
       <a
  href="https://github.com/tandpfun/skill-icons#readme"
  target="_blank"
            rel="noreferrer"
            className="cursor-target"
>
  <ShinyText
    text= "GitHub README Tutorial"
    speed={3}
    className="font-bold text-gray-800 mb-6 text-center "
  />
</a>
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
