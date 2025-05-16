import { useState } from "react";
import HomeImages from "../data/homeImages";
import VideoSlider from "../components/VideoSlider"; 

const Home = () => {
  // Track image load states
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (description) => {
    setLoadedImages((prev) => ({ ...prev, [description]: true }));
  };

  return (
    <div>
      {/* Images with name and description on small & medium screens */}
      <div className="space-y-2 lg:hidden">
        {HomeImages.map((item) => (
          <div key={item.description} className="relative">
            {/* Skeleton Placeholder */}
            {!loadedImages[item.description] && (
              <div className="w-full h-[300px] bg-gray-200 animate-pulse" />
            )}

            {/* Image */}
            <img
              src={item.image}
              alt={item.description}
              onLoad={() => handleImageLoad(item.description)}
              className={`w-full transition-opacity duration-700 ${
                loadedImages[item.description] ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            />

            {/* Text Overlay */}
            {loadedImages[item.description] && (
              <div className="absolute top-[50%] left-5 space-y-2">
                <h1 className="text-xl md:text-5xl font-bold">{item.description}</h1>
                <h1 className="md:text-xl">{item.name || ''}</h1>
              </div>
            )}
          </div>
        ))}
      </div>
       
      {/* video slider components */}
      <VideoSlider />
    </div>
  );
};

export default Home;

