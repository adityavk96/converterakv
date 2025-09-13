import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-8 mt-12">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        <p>&copy; {new Date().getFullYear()} Aditya. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          {/* Additional footer content or social icons */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
