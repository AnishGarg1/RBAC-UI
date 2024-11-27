import React from 'react';

const Contact = () => {
  return (
    <div className="mt-20 flex items-center justify-center w-full h-full text-center px-6">
      <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-xl p-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-lg text-white leading-relaxed">
          Have questions or feedback? We’d love to hear from you!
        </p>
        <p className="text-lg text-white leading-relaxed mt-4">
          Email us at <a href="mailto:support@example.com" className="text-blue-300 underline">support@example.com</a> or 
          call us at <a href="tel:+123456789" className="text-blue-300 underline">+123 456 789</a>. 
        </p>
        <p className="text-lg text-white leading-relaxed mt-4">
          Follow us on our social media platforms for the latest updates!
        </p>
      </div>
    </div>
  );
};

export default Contact;
