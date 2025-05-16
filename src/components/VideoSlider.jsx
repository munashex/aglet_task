import React, { useRef, useState, useEffect } from 'react';
import { HomeVideos } from '../data/homeVideos';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const VideoSlider = () => {
  // Reference to the scrollable container
  const sliderRef = useRef(null);

  // Track the index of the hovered video for hover effects
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Store width of one item for smooth scrolling
  const [itemWidth, setItemWidth] = useState(0);
  
  // Track current horizontal scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Store the max scrollable width of the container
  const [maxScroll, setMaxScroll] = useState(0);
  
  // Simulate loading state for skeleton loading animation
  const [loading, setLoading] = useState(true);

  // Measure dimensions on mount and window resize
  useEffect(() => {
    const updateDimensions = () => {
      if (sliderRef.current) {
        const width = sliderRef.current.firstChild?.offsetWidth || 0;
        setItemWidth(width);
        setMaxScroll(sliderRef.current.scrollWidth - sliderRef.current.clientWidth);
      }
    };

    updateDimensions(); // Initial call
    window.addEventListener('resize', updateDimensions); // Update on resize

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Update scroll position and max scroll when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        setScrollPosition(sliderRef.current.scrollLeft);
        setMaxScroll(sliderRef.current.scrollWidth - sliderRef.current.clientWidth);
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll left or right using arrow buttons
  const scroll = (direction) => {
    const { current } = sliderRef;
    if (current) {
      const scrollAmount = itemWidth || 300; // Fallback if itemWidth is 0
      const behavior = 'smooth';

      direction === 'left'
        ? current.scrollBy({ left: -scrollAmount, behavior })
        : current.scrollBy({ left: scrollAmount, behavior });
    }
  };

  // Enable keyboard navigation with left/right arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scroll('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scroll('right');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [itemWidth]);

  // Calculate scroll progress percentage for custom progress bar
  const scrollProgress = maxScroll > 0 ? scrollPosition / maxScroll : 0;

  // Simulate a loading delay to show skeleton cards
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulated load time of 2s

    return () => clearTimeout(timer);
  }, []);

  // Component to show placeholder UI while loading
  const SkeletonCard = () => (
    <div className="w-1/3 flex-shrink-0 animate-pulse px-4">
      <div className="w-full h-64 bg-gray-300 rounded-lg"></div>
      <div className="mt-8 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="hidden lg:flex flex-col relative w-full pt-20">
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll('left')}
        className="absolute z-10 left-2 top-1/2 cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Scroll left"
      >
        <FaChevronLeft />
      </button>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        className="absolute z-10 right-2 top-1/2 cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Scroll right"
      >
        <FaChevronRight />
      </button>

      {/* Video List Scrollable Container */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-smooth 
                [scrollbar-width:none] [-ms-overflow-style:none] 
                [&::-webkit-scrollbar]:hidden"
      >
        {/* Show skeletons while loading, otherwise show video cards */}
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : HomeVideos.map((item, index) => (
              <div
                key={index}
                className={`w-1/3 flex-shrink-0 transition duration-300
                            ${hoveredIndex !== null && hoveredIndex !== index
                              ? 'brightness-50'
                              : 'brightness-100'}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Auto-play video on hover, pause on mouse leave */}
                <video
                  src={item.video}
                  muted
                  playsInline
                  className="w-full object-cover hover:cursor-pointer"
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                  controls={false}
                />
                {/* Video description */}
                <div className="mt-8 space-y-2 px-4">
                  <p className="font-bold text-2xl">{item.description}</p>
                  <h4 className="text-[#4a4a4a] text-lg">{item.name}</h4>
                </div>
              </div>
            ))}
      </div>

      {/* Scroll progress indicator */}
      <div className="w-1/4 mx-auto border-b border-gray-700 mt-8 relative h-4">
        <div
          className="absolute top-0 left-0 border-b border-gray-200 h-full transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
};

export default VideoSlider;
