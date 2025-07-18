import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import CardPreview from './components/CardPreview';


import Squares from './Squares';
import ShinyText from './components/ShinyText';
import Navbar from './Navbar';
import About from './About';
import './App.css';

function Home() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!username) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Optional delay effect
  };

  return (
    <>
      {/* Hero Section */}
      <div className="h-[400px] mt-9 relative">
        <Squares 
          speed={0.001} 
          squareSize={40}
          direction="down"
          borderColor="#fff"
          hoverFillColor="#4c51bf"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pointer-events-none">
          <ShinyText
            text="Get Personalized GitHub Growth Advice"
            speed={4}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
          />

          <div className="flex items-center gap-2 w-full justify-center pointer-events-auto">
            <input
              type="text"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 rounded-md text-black bg-white max-w-sm w-full text-center"
              style={{ fontFamily: 'Born2bSporty' }}
            />

            {username.trim() && (
              <button
                onClick={handleSubmit}
                className="bg-gray-600 hover:bg-purple-700 text-white p-2 rounded-md transition duration-300"
              >
                <FaArrowRight />
              </button>
            )}
          </div>

          <div className="h-6 mt-4">
            {loading && <span className="loader block mx-auto"></span>}
          </div>
        </div>
      </div>

      {/* GitHub Card Preview Section */}
      <div className="mt-10 px-4 text-center">
        <CardPreview username={username} />
      </div>
    </>
  );
}


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
