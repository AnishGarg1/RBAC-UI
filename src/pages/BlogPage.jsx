import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetails } from '../services/apiUtils/blogAPI';
import { useSelector } from 'react-redux';

const BlogPage = () => {
  const { blogId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState(null);
//   const navigate = useNavigate();
  useEffect(() => {
    const fetchBlog = async () => {
      const blogData = await getBlogDetails(blogId, token);
      setBlog(blogData);
    };
    fetchBlog();
  }, [blogId, token]);

//   if (!isLoggedIn) {
//     navigate('/login'); // Redirect to login page if not logged in
//   }

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
      {/* Accessing the author object properties */}
      <p className="text-gray-500 mb-6">
        By {blog.author.firstName} {blog.author.lastName} on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="text-lg">{blog.description}</div> {/* Assuming `description` is the full text */}
    </div>
  );
};

export default BlogPage;
