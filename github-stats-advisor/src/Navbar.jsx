import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Install Lucide icons or replace with SVGs

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="mt-2 px-4 py-2 flex items-center justify-between bg-black text-white relative">
      {/* Logo and Title */}
     <div className="flex items-center">
  <img src="/vite.svg" alt="LOGO" className="h-6 sm:h-7 md:h-8 mr-2" />
  <span className="font-bold text-base sm:text-lg md:text-xl">GIT MENTOR</span>
</div>


      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-8 list-none">
        <li><Link className="hover:text-purple-500" to="/">Stats</Link></li>
        <li><Link className="hover:text-purple-500" to="/">Insights</Link></li>
        <li><Link className="hover:text-purple-500" to="/about">About</Link></li>
      </ul>

      {/* CTA Button */}
      <button className="hidden md:block text-white border border-white rounded px-4 py-2 font-bold">
        App Coming Soon
      </button>

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
          <li><Link onClick={() => setIsOpen(false)} to="/">Insights</Link></li>
          <li><Link onClick={() => setIsOpen(false)} to="/about">About</Link></li>
        </ul>
        <button className="mt-8 w-full text-white border border-white rounded px-4 py-2 font-bold">
          App Coming Soon
        </button>
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
