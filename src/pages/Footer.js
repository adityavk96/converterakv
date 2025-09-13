import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        <p>&copy; {new Date().getFullYear()} FileSwift. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
           </div>
      </div>
    </footer>
  );
};

export default Footer;