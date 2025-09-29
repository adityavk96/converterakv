import React, { useState, useRef, useEffect } from 'react';
import { Home, FileText, Image, Layers, Scissors, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <header className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md py-4 px-6 md:px-12 sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <h1 className="text-white font-bold text-xl">File to PDF</h1>

        {/* Desktop: horizontal menu */}
        <ul className="hidden md:flex items-center space-x-6">
          <li className="flex items-center space-x-1">
            <Home className="text-white w-5 h-5" />
            <Link to="/" className="text-white hover:text-gray-200 font-medium transition duration-300">
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-1">
            <Image className="text-white w-5 h-5" />
            <Link to="/image-to-pdf" className="text-white hover:text-gray-200 font-medium transition duration-300">
              Image to PDF
            </Link>
          </li>
                    <li className="flex items-center space-x-1">
            <Image className="text-white w-5 h-5" />
            <Link to="/word-to-pdf" className="text-white hover:text-gray-200 font-medium transition duration-300">
              Word to PDF
            </Link>
          </li>


          <li className="flex items-center space-x-1">
            <Layers className="text-white w-5 h-5" />
            <Link to="/pdf-merger" className="text-white hover:text-gray-200 font-medium transition duration-300">
              PDF Merger
            </Link>
          </li>
          <li className="flex items-center space-x-1">
            <Scissors className="text-white w-5 h-5" />
            <Link to="/reduce-file-size" className="text-white hover:text-gray-200 font-medium transition duration-300">
              Reduce PDF Size
            </Link>
          </li>
          <li className="flex items-center space-x-1">
            <Calculator className="text-white w-5 h-5" />
            <Link to="/Calculator" className="text-white hover:text-gray-200 font-medium transition duration-300">
              EMI Calculator
            </Link>
          </li>
        </ul>

        {/* Mobile: hamburger toggle */}
        <button
          ref={toggleRef}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {/* Hamburger: three lines */}
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
          />
        </button>
      </nav>

      {/* Mobile: dropdown menu, click outside closes */}
      {menuOpen && (
        <ul
          ref={menuRef}
          className="md:hidden flex flex-col space-y-2 mt-2 px-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded shadow"
        >
          <li className="flex items-center space-x-1">
            <Home className="text-white w-5 h-5" />
            <Link
              to="/"
              className="text-white hover:text-gray-200 font-medium transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-1">
            <Image className="text-white w-5 h-5" />
            <Link
              to="/image-to-pdf"
              className="text-white hover:text-gray-200 font-medium transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Image to PDF
            </Link>
          </li>
          <li className="flex items-center space-x-1">
            <Image className="text-white w-5 h-5" />
            <Link
              to="/word-to-pdf"
              className="text-white hover:text-gray-200 font-medium transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Word to PDF
            </Link>
          </li>


          <li className="flex items-center space-x-1">
            <Layers className="text-white w-5 h-5" />
            <Link
              to="/pdf-merger"
              className="text-white hover:text-gray-200 font-medium transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              PDF Merger
            </Link>
          </li>
          <li className="flex items-center space-x-1">
            <Scissors className="text-white w-5 h-5" />
            <Link
              to="/reduce-file-size"
              className="text-white hover:text-gray-200 font-medium transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Reduce PDF Size
            </Link>
          </li>
          <li className="flex items-center space-x-1">
            <Calculator className="text-white w-5 h-5" />
            <Link
              to="/Calculator"
              className="text-white hover:text-gray-200 font-medium transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              EMI Calculator
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
