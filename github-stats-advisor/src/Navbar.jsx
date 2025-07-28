import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import StarBorder from "./components/StartBorder"; 
// ct
// Install Lucide icons or replace with SVGs


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [stars, setStars] = useState(null);


  useEffect(() => {
  const fetchStars = async () => {
    try {
    const res = await fetch('https://api.github.com/repos/DevvObiero/GIT-MENTOR');
const data = await res.json();
setStars(data.stargazers_count);

    } catch (error) {
      console.error("Failed to fetch stars", error);
    }
  };

  fetchStars();
}, []);


//  py-2
  return (
    <header className="mt-2  
    smaller 
      flex items-center justify-between bg-transparent text-white relative">
      {/* Logo and Title */}
   <Link to="/">
  <div className="flex name items-center cursor-pointer">
    <img src="/logo.svg" alt="LOGO" className="h-18 w-auto sm:h-7 md:h-8 mr-2 logo" />
    <span className="font-bold smaller text-base sm:text-lg md:text-xl">
      GIT MENTOR
    </span>
  </div>
</Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 list-none">
        <li><Link className=" cursor-target hover:text-purple-500" to="/">Insights</Link></li>
        <li><Link className="hover:text-purple-500  cursor-target" to="/Readme">Readme</Link></li>
         <li><Link className="hover:text-purple-500 cursor-target " to="/about">About</Link></li>
      </ul>

      {/* CTA Button */}

<StarBorder
  as="a"
  href="https://github.com/DevvObiero/GIT-MENTOR"
  target="_blank"
  rel="noopener noreferrer"
  color="#fff" // white glow
  speed="6s"
  className='cursor-target'
>
  ⭐ {stars !== null ? `${stars} stars` : "Loading..."}
</StarBorder>

      {/* Burger Menu Icon for Mobile */}
      <button
        className="md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-black border-l border-purple-600 p-6 transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-6 mt-20 text-lg">
          <li><Link onClick={() => setIsOpen(false)} to="/">Stats</Link></li>
          <li><Link onClick={() => setIsOpen(false)} to="/Readme">Readme</Link></li>
          <li><Link onClick={() => setIsOpen(false)} to="/about">About</Link></li>
        </ul>
        <div className='mt-4' >
             <StarBorder
  as="a"
  href="https://github.com/DevvObiero/GIT-MENTOR"
  target="_blank"
  rel="noopener noreferrer"
  color="#fff" // white glow
  speed="6s"
>
  ⭐ {stars !== null ? `${stars} stars` : "Loading..."}
</StarBorder>

    </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </header>
  );
}
