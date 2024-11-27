import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            <span>RBAC UI</span>
          </div>
          <div className="space-x-6">
            <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TechHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
