const frontendIcons = [
  'bxl-html5',
  'bxl-css3',
  'bxl-javascript',
  'bxl-react',
  'bxl-tailwind-css',
  'bxl-figma',
  'bxl-nodejs',
  'bxl-express-js',
];

const TechCarousel = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap mt-6">
      <div className="animate-scroll flex gap-12 text-4xl text-gray-600">
        {frontendIcons.concat(frontendIcons).map((icon, index) => (
          <i
            key={index}
            className={`bx ${icon} hover:text-white transition duration-300`}
          ></i>
        ))}
      </div>
    </div>
  );
};

export default TechCarousel;
