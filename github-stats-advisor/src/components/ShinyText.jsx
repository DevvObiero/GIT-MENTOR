const ShinyText = ({ text, disabled = false, speed = 5, className = '', onClick }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      onClick={onClick} // ✅ Add this line!
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
        cursor: disabled ? 'not-allowed' : 'pointer', // Optional: ensure pointer
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
