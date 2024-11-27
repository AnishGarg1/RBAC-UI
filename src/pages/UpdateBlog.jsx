import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetails, updateBlog } from '../services/apiUtils/blogAPI';

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
  const { blogId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const blogData = await getBlogDetails(blogId, token);
      if (blogData) {
        setBlog({
          title: blogData.title,
          description: blogData.description,
          createdAt: blogData.createdAt,
        });
        setInitialBlog({
          title: blogData.title,
          description: blogData.description,
          createdAt: blogData.createdAt,
        });
      }
    };

    fetchBlog();
  }, [blogId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Trim spaces from the title and description before submitting
    const updatedData = {
      blogId,
      title: blog.title.trim(),
      description: blog.description.trim(),
    };

    // Check for empty description (allow empty but no spaces only)
    if (updatedData.description === '') {
      updatedData.description = ''; // Allow empty description
    }

    const result = await updateBlog(updatedData, token, dispatch);
    if (result) {
      navigate('/blogs');
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    navigate('/blogs');
  };

  // Disable the update button if there are no meaningful changes (ignoring spaces)
  const isUpdated =
    blog.title.trim() !== initialBlog.title.trim() || blog.description.trim() !== initialBlog.description.trim();

  return (
    <div className="p-6 mt-10 container mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-semibold text-center mb-6 text-blue-600">Update Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={blog.description}
            onChange={(e) => setBlog({ ...blog, description: e.target.value })}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
            rows="6"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all ${!isUpdated || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isUpdated || isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Blog'}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="ml-4 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="mt-4 text-gray-600">
        <p><span className="font-medium">Created At:</span> {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default UpdateBlog;
