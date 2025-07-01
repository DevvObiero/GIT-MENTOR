import { useState } from 'react'
// import reactLogo from './assets/react.svg'ss
import Squares from './Squares';
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  

  return (
    <>
  <div className="h-[400px] mt-4 relative">
  <Squares 
    speed={0.2} 
    squareSize={40}
    direction="down"
    borderColor="#fff"
    hoverFillColor="#222"
  />

  {/* Overlay content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
    <h2 className="text-4xl md:text-3xl font-semibold mb-4">
      Get Personalized GitHub Growth Advice
    </h2>
    <input 
      type="text" 
      placeholder="Enter your GitHub username" 
      className="px-4 py-2 rounded-md text-black bg-white  w-full max-w-sm"
    />
  </div>
</div>

    </> 
  )
}

export default App
