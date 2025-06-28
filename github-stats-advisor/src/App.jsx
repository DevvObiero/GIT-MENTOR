import { useState } from 'react'
// import reactLogo from './assets/react.svg'ss
import Squares from './Squares';
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  

  return (
    <>
    <div className="h-[400px]  mt-4"> {/* or h-screen, h-96, etc */}
  <Squares 
    speed={0.2} 
    squareSize={40}
    direction="diagonal"
    borderColor="#fff"
    hoverFillColor="#222"
  />
</div>
 
    </> 
  )
}

export default App
