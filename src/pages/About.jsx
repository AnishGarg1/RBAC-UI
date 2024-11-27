import React from 'react';

const About = () => {
  return (
    <div className="mt-20 flex items-center justify-center w-full h-full text-center px-6">
      <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-xl p-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-4">About Us</h1>
        <p className="text-lg text-white leading-relaxed">
          Welcome to our platform! We are dedicated to providing a seamless and intuitive role-based access control system. 
          Our mission is to empower users to manage their roles and permissions effectively while maintaining top-notch security. 
        </p>
        <p className="text-lg text-white leading-relaxed mt-4">
          From admin tools to author functionalities, our system is designed to ensure a streamlined experience for all users.
          Thank you for choosing us as your trusted solution!
        </p>
      </div>
    </div>
  );
};

export default About;
