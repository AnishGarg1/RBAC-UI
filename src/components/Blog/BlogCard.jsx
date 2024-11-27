import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    console.log(`first : /blog/${blog._id}`);
    navigate(`/blog/${blog._id}`); // Navigate to the BlogPage with blogId
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-4">{blog.description ? blog.description.slice(0, 100) : "No Description"}...</p>
      <button
        onClick={handleViewDetails}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Show More
      </button>
    </div>
  );
};

export default BlogCard;
