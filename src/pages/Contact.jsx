import contactVideo from '../videos/contact.mp4';
import { FaArrowDown } from "react-icons/fa6";
import secondSectionImage from '../images/contactImages/intro_image5.jpg';
import lastSectionImage from '../images/contactImages/berlin2-2.jpg';

const Contact = () => {
  const scrollToDiv = () => {
    const element = document.getElementById('secondSection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-black">
      {/* Fullscreen video background */}
      <div className="h-screen w-full relative">
        <video
          src={contactVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
        <div>
          <h1 className="absolute top-[40%] mx-auto w-full text-center text-black font-bold text-5xl md:text-7xl lg:text-9xl">Contact</h1>
          <button 
            className="absolute bottom-7 text-3xl right-5 cursor-pointer"
            onClick={scrollToDiv}
          >
            <FaArrowDown color="white"/>
          </button>
        </div>
      </div>

      {/* Second Section */}
      <div 
        id="secondSection"
        className="animate-fade-up lg:px-5 grid grid-cols-1 md:grid-cols-2 gap-y-9 md:gap-x-3 lg:gap-x-16 animate-duration-1000 mt-28 lg:mt-56">

        <div className="flex flex-col gap-y-5 lg:gap-y-8 px-7 font-bold md:text-xl lg:text-2xl">
          <h1>The core idea of antoni is focus and dedication. That is why each client gets an own, tailor-made antoni agency. Because we believe that concentrating on one client leads to real transformation.</h1>
          <h1>That means: our people from antoni_garage (now team x) fully concentrate on Mercedes-Benz, 24/7. The team of antoni_jellyhouse works only on Katjes, and the same for antoni_boost for Kärcher. antoni_giga just gets calls from Vodafone, antoni_heaven is dreaming with bett1.de and our latest baby antoni_99 focuses on ALDI. All fully customized and committed, but no pitches at all.</h1>
          <h1>Want to know more? We look forward to hearing from you.</h1>
        </div>

        <img 
          src={secondSectionImage} 
          alt="aglet-contact-image" 
          className="pr-7 md:h-[500px] lg:h-[600px] object-cover"
        />
      </div>

      {/* Last Section - Responsive Layout */}
      <div className="mt-20">
        {/* Mobile (sm) - Text Only */}
        <div className="md:hidden space-y-5 px-9">
          <h1 className="font-bold text-4xl">Berlin</h1> 
          <div className="text-gray-700">
            <p>antoni Holding GmbH</p>
            <p>Münzstraße 13</p>
            <p>10178 Berlin</p>
          </div>
          <div>
            <span className="font-semibold">Tel:
              <a href="tel:+27689526513" className="hover:underline"> +27 68 952 6513</a>
            </span><br />
            <span className="font-semibold">E-mail: 
              <a href="mailto:munashemugondaa@gmail.com" className="hover:underline"> munashemugondaa@gmail.com</a>
            </span>
          </div>
          <a href="https://maps.app.goo.gl/2A2eh3o9ZUwHC9pV7" className="text-gray-700">map</a>
        </div>

        {/* Tablet & Desktop */}
        <div className="hidden md:block mt-28 lg:mt-56">
         <div className="relative">
          <img 
            src={lastSectionImage} 
            alt="berlin-office" 
            className="w-1/2 h-[600px] object-cover md:px-6 lg:px-11"
          />
          <h1 className="absolute top-[40%] right-[40%] md:text-7xl lg:text-9xl font-bold">Berlin</h1> 

          <div className="space-y-5 px-9 lg:px-14 absolute bottom-2 left-[46%] ">
          <div className="text-gray-700">
            <p>antoni Holding GmbH</p>
            <p>Münzstraße 13</p>
            <p>10178 Berlin</p>
          </div>
          <div>
            <span className="font-semibold">Tel:
              <a href="tel:+27689526513" className="hover:underline"> +27 68 952 6513</a>
            </span><br />
            <span className="font-semibold">E-mail: 
              <a href="mailto:munashemugondaa@gmail.com" className="hover:underline"> munashemugondaa@gmail.com</a>
            </span>
          </div>
          <a href="https://maps.app.goo.gl/2A2eh3o9ZUwHC9pV7" className="text-gray-700">map</a>
        </div>

          </div>
        </div>
      </div>

      <h1 className="mt-20 md:mt-24 lg:mt-32">Zum Aufruf der Umgebungskarte verlinken wir zum Maps Dienst der Google Inc., Menlo Park, Karlifornien, USA. Bitte Beachten Sie die Datenschutzhinweise der Google Inc.</h1>
    </div>
  );
};

export default Contact;