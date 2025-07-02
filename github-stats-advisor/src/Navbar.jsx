import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="mt-2 px-1 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/vite.svg" alt="LOGO" className="h-8 mr-2" />
        
        <span className="font-bold text-lg">GIT MENTOR</span>
      </div>

      <ul className="flex gap-8 list-none">
        <li><Link className="hover:text-purple-600" to="/">Stats</Link></li>
        <li><Link className="hover:text-purple-600" to="/">Insights</Link></li>
        <li><Link className="hover:text-purple-600" to="/about">About</Link></li>
      </ul>

      <button className="text-white border border-white rounded px-4 py-2 font-bold">
        App Coming Soon
      </button>
    </header>
  );
}
