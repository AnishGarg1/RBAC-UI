import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing an icon for better visual representation

const Error = () => {
  const navigate = useNavigate();

  // Navigate back to homepage
  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-10 bg-white rounded-lg shadow-2xl max-w-md w-full">
        <FaExclamationTriangle className="text-6xl text-red-600 animate-bounce mb-4" />
        <h1 className="text-5xl font-bold text-gray-800 mb-4 animate__animated animate__fadeInUp">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          Oops! The page you're looking for doesn't exist. Please check the URL or return to the homepage.
        </p>
        <button
          onClick={handleHomeRedirect}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Error;
