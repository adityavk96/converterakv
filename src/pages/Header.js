import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md py-4 px-6 md:px-12 sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <h1>File to PDF</h1>
        <ul className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-gray-200 font-medium transition duration-300">
          Home
        </Link>
          <li>
            <Link to="/image-to-pdf" className="text-white hover:text-gray-200 font-medium transition duration-300">
              Image to PDF
            </Link>
          </li>
          <li>
            <Link to="/word-to-pdf" className="text-white hover:text-gray-200 font-medium transition duration-300">
              Word to PDF
            </Link>
          </li>
          <li>
            <Link to="/pdf-merger" className="text-white hover:text-gray-200 font-medium transition duration-300">
              PDF Merger
            </Link>
          </li>
          <li>
            <Link to="/reduce-file-size" className="text-white hover:text-gray-200 font-medium transition duration-300">
              Reduce PDF Size
            </Link>
          </li>
          <li>
            <Link to="/Calculator" className="text-white hover:text-gray-200 font-medium transition duration-300">
              EMI Calculator
            </Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
