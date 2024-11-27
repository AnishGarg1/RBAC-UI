import React, { useState, useEffect } from 'react';
import BlogCard from '../components/Blog/BlogCard';
import { getAllBlogs } from '../services/apiUtils/blogAPI';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const dispatch = useDispatch();

  // Get user data from Redux store
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogData = await getAllBlogs(dispatch); // Fetch all blogs
      setBlogs(blogData);
    };
    fetchBlogs();
  }, [dispatch]);

  return (
    <div className="container mt-10 mx-auto p-8 bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 rounded-lg shadow-xl">
      {/* Welcome Section */}
      <div className="mb-8 mx-5 p-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
        <h1 className="text-4xl font-extrabold mb-2 text-shadow">Welcome, {user?.firstName}!</h1>
        <p className="text-lg mb-4 font-medium">We're glad to have you on board. Here's what's happening in your dashboard:</p>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold">Role: <span className="font-semibold">{user?.role}</span></span>
        </div>
      </div>

      {/* Blogs Section */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Latest Blogs</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            <p>No blogs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
