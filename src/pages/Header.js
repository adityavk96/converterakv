import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 md:px-12 sticky top-0 z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          File To Pdf
        </Link>
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/file-converter" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-300">
              File Converter
            </Link>
          </li>
          <li>
            <Link to="/pdf-merger" className="text-gray-600 hover:text-indigo-600 font-medium transition duration-300">
              PDF Merger
            </Link>
          </li>
          <li>
            <Link to="/file-converter" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold">
              Start Now
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;