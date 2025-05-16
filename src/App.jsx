// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <div className="font-antoni flex flex-col min-h-screen bg-black text-white">
        {/* Navbar on all screens */}
        <Navbar />

        {/* Page content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

