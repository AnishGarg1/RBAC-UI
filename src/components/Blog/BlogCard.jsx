import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    console.log(`Navigating to: /blog/${blog._id}`);
    navigate(`/blog/${blog._id}`); // Navigate to the BlogPage with blogId
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-600">{blog.title}</h2>
      <p className="text-gray-600 mb-4">{blog.description ? blog.description.slice(0, 100) : "No Description"}...</p>
      <button
        onClick={handleViewDetails}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transform transition-all duration-200"
      >
        Show More
      </button>
    </div>
  );
};

export default BlogCard;
