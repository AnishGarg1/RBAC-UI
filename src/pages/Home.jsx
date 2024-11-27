import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs } from '../services/apiUtils/blogAPI';
import BlogCard from '../components/Blog/BlogCard';
import { useDispatch } from 'react-redux';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch blogs from the API (or any other source)
    const fetchBlogs = async () => {
      const blogData = await getAllBlogs(dispatch); // This function should return a list of blogs
      setBlogs(blogData);
    };
    fetchBlogs();
  }, [dispatch]);

  const handleShowMore = () => {
    setShowAll(true);
    navigate('/dashboard'); // Redirect to dashboard page
  };

  const blogsToDisplay = showAll ? blogs : blogs.slice(0, 5); // Display first 5 blogs if `showAll` is false

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogsToDisplay.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      {!showAll && (
        <div className="text-center mt-6">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
