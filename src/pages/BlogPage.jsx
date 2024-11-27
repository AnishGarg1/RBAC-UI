import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetails } from '../services/apiUtils/blogAPI';
import { useSelector } from 'react-redux';

const BlogPage = () => {
  const { blogId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogData = await getBlogDetails(blogId, token);
      setBlog(blogData);
    };
    fetchBlog();
  }, [blogId, token]);

  if (!blog) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg my-6 mt-10">
      <h1 className="text-4xl font-semibold text-center text-blue-900 mb-6">{blog.title}</h1>
      
      <div className="flex justify-center mb-4">
        <div className="text-gray-600 text-sm">
          <span className="font-semibold">{blog.author.firstName} {blog.author.lastName}</span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 pt-6 text-lg text-gray-800 leading-relaxed">
        <p className="mb-4">{blog.description}</p>
      </div>

      {/* Blog Content Container */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner mt-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Full Blog Content</h2>
        <p className="text-lg">{blog.content}</p> {/* Assuming `content` holds the full text of the blog */}
      </div>
    </div>
  );
};

export default BlogPage;
