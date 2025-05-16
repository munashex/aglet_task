import { Link, useLocation} from 'react-router-dom'; 
import Logo from '../images/aglet_logo.svg';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu(!openMenu); 

  const location = useLocation()

  return (
    
    // Absolute positioning on small/medium, static on large
    <div className={`absolute top-0 left-0 w-full z-10  ${location.pathname === '/contact' ? '' : 'lg:static'}`}>
      <div className="m-4 lg:mt-9 lg:mx-12">
        
        {/* Mobile Navbar */}
        <div className="flex lg:hidden items-center justify-between">
          <Link to="/">
          <img src={Logo} alt="aglet-Logo" className="w-24" />
          </Link>
          <button onClick={toggleMenu} className="outline-none">
            {openMenu ? <AiOutlineClose size={38} /> : <GiHamburgerMenu size={38} />}
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="lg:hidden">
          {openMenu && (
            <div className="absolute right-8 top-20 text-3xl font-bold space-y-3">
              <Link to="/" onClick={toggleMenu} className="block animate-fade-down">home</Link>
              <Link to="/contact" onClick={toggleMenu} className="block animate-fade-down animate-delay-300">contact</Link>
            </div>
          )}
        </div>

        {/* Desktop Navbar */}
        <div className="hidden lg:flex items-center justify-between">
          <Link to="/">
          <img src={Logo} alt="aglet-Logo" className="w-24" />
          </Link>
          <div className="flex items-center gap-5 font-semibold">
            <Link to="/" className="hover:underline">home</Link>
            <Link to="/contact" className="hover:underline">contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;




