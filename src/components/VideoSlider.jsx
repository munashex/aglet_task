import React, { useRef, useState, useEffect } from 'react';
import { HomeVideos } from '../data/homeVideos';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const VideoSlider = () => {
  
  const sliderRef = useRef(null); // Reference to the scrollable container

  // State
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track which video is hovered
  const [itemWidth, setItemWidth] = useState(0); // Width of individual video items
  const [scrollPosition, setScrollPosition] = useState(0); // Current scroll position
  const [maxScroll, setMaxScroll] = useState(0); // Maximum possible scroll position

  /**
   * Effect: Calculate and update slider dimensions
   * - Measures video item width
   * - Calculates maximum scroll position
   * - Sets up resize event listener for responsiveness
   */
  useEffect(() => {
    const updateDimensions = () => {
      if (sliderRef.current) {
        // Get width of first child (video item) to determine scroll amount
        const width = sliderRef.current.firstChild?.offsetWidth || 0;
        setItemWidth(width);
        // Calculate maximum scroll position (total width - visible width)
        setMaxScroll(sliderRef.current.scrollWidth - sliderRef.current.clientWidth);
      }
    };

    updateDimensions(); // Initial calculation
    window.addEventListener('resize', updateDimensions); // Update on window resize
    
    // Cleanup: Remove event listener
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  /**
   * Effect: Track scroll position
   * - Updates scroll position state when user scrolls
   * - Recalculates max scroll position (in case content changes)
   */
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
      // Cleanup: Remove event listener
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, []);

  
  const scroll = (direction) => {
    const { current } = sliderRef;
    if (current) {
      const scrollAmount = itemWidth || 300; // Default to 300px if itemWidth not calculated
      const behavior = 'smooth'; // Smooth scrolling animation
      
      direction === 'left'
        ? current.scrollBy({ left: -scrollAmount, behavior })
        : current.scrollBy({ left: scrollAmount, behavior });
    }
  };

  /**
   * Effect: Keyboard navigation
   * Allows left/right arrow keys to control slider
   */
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
    // Cleanup: Remove event listener
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [itemWidth]); // Re-run effect if itemWidth changes

  // Calculate scroll progress (0 to 1) for custom scroll indicator
  const scrollProgress = maxScroll > 0 ? scrollPosition / maxScroll : 0;

  return (
    <div className="hidden lg:flex flex-col relative w-full pt-20">
      {/* Left Navigation Arrow */}
      <button
        onClick={() => scroll('left')}
        className="absolute z-10 left-2 top-1/2 cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Scroll left"
      >
        <FaChevronLeft />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute z-10 right-2 top-1/2 cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Scroll right"
      >
        <FaChevronRight />
      </button>

      {/* Video Container with hidden scrollbar */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scroll-smooth 
                  [scrollbar-width:none] [-ms-overflow-style:none] 
                  [&::-webkit-scrollbar]:hidden"
      >
        {HomeVideos.map((item, index) => (
          <div
            key={index}
            className={`w-1/3 flex-shrink-0 transition duration-300
                        ${hoveredIndex !== null && hoveredIndex !== index
                          ? 'brightness-50' // Dim non-hovered videos
                          : 'brightness-100'}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Video Element with hover controls */}
            <video
              src={item.video}
              muted
              playsInline
              className="w-full object-cover hover:cursor-pointer"
              onMouseEnter={(e) => e.target.play()} // Play on hover
              onMouseLeave={(e) => e.target.pause()} // Pause when not hovered
              controls={false} // Disable default controls
            />
            
            {/* Video Description */}
            <div className="mt-8 space-y-2 px-4">
              <p className="font-bold text-2xl">{item.description}</p>
              <h4 className="text-[#4a4a4a] text-lg">{item.name}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Scroll Indicator */}
      <div className="w-1/4 mx-auto border-b border-gray-700 mt-8 relative h-4">
        <div 
          className="absolute top-0 left-0 border-b border-gray-200 h-full transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }} // Width based on scroll progress
        />
      </div>
    </div>
  );
};

export default VideoSlider;
