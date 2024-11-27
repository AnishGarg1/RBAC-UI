import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, updateBlog } from '../services/apiUtils/blogAPI'; // Import the updateBlog function

const UpdateBlog = () => {
  const [blog, setBlog] = useState({
    title: '',
    description: '',
    createdAt: '', // Add createdAt to the state
  });
  const [initialBlog, setInitialBlog] = useState({
    title: '',
    description: '',
    createdAt: '', // Add createdAt to the initial state
  });
  const [isLoading, setIsLoading] = useState(false);
  const { blogId } = useParams(); // Retrieve the blogId from the URL
  const { token } = useSelector((state) => state.auth); // Get token from the Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing blog details when the component mounts
    const fetchBlog = async () => {
      const blogData = await getBlogDetails(blogId, token); // Replace with your API call
      if (blogData) {
        setBlog({
          title: blogData.title,
          description: blogData.description,
          createdAt: blogData.createdAt, // Set the createdAt field
        });
        setInitialBlog({
          title: blogData.title,
          description: blogData.description,
          createdAt: blogData.createdAt, // Set the createdAt field in initial state
        });
      }
    };

    fetchBlog();
  }, [blogId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedData = {
      blogId,
      title: blog.title,
      description: blog.description,
    };

    const result = await updateBlog(updatedData, token, dispatch);
    if (result) {
      navigate('/blogs'); // Redirect to the blogs list page
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    navigate('/blogs'); // Redirect to the blogs list page without making changes
  };

  // Disable the update button if there are no changes
  const isUpdated = blog.title !== initialBlog.title || blog.description !== initialBlog.description;

  return (
    <div className="p-6 container mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Update Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            id="description"
            value={blog.description}
            onChange={(e) => setBlog({ ...blog, description: e.target.value })}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            rows="6"
            required
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 ${!isUpdated ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!isUpdated || isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Blog'}
        </button>
        
        <button
          type="button"
          onClick={handleCancel}
          className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </form>

      {/* Blog creation date */}
      <div className="mt-4 text-gray-500">
        <p>Created At: {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default UpdateBlog;
