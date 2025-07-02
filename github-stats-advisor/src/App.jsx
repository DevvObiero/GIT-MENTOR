import { Routes, Route } from 'react-router-dom';
import Squares from './Squares';
import ShinyText from './components/ShinyText';

import Navbar from './Navbar';
import About from './About';
import './App.css';




function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="h-[400px] mt-4 relative">
        <Squares 
          speed={0.001} 
          squareSize={40}
          direction="down"
          borderColor="#fff"
          hoverFillColor="#4c51bf"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pointer-events-none">
          
          <ShinyText
  text="  Get Personalized GitHub Growth Advice"
  speed={4}
  className="text-4xl font-bold text-white mb-4"
/>
          {/* <h2 className="text-4xl md:text-3xl font-semibold mb-4">
          
          </h2> */}
          <input 
            type="text" 
            placeholder="Enter your GitHub username" 
            className="px-4 py-2 rounded-md text-black bg-white w-full max-w-sm pointer-events-auto"
          />
        </div>
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
