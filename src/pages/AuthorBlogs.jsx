import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteBlog, getAllAuthorBlogs, createBlog } from "../services/apiUtils/blogAPI";
import { useNavigate } from "react-router-dom";

const AuthorBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null); // To store the selected blog ID for deletion
  const [isModalOpen, setIsModalOpen] = useState(false); // To control delete modal visibility
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // To control create blog modal visibility
  const [blogTitle, setBlogTitle] = useState(""); // To store the new blog title
  const [showDescription, setShowDescription] = useState({}); // For showing full description
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch blogs created by the author
  useEffect(() => {
    const fetchBlogs = async () => {
      if (user?._id) {
        const blogsList = await getAllAuthorBlogs(user._id, token, dispatch);
        setBlogs(blogsList);
      }
    };
    fetchBlogs();
  }, [token, dispatch, user?._id]);

  // Handle blog creation
  const handleCreateBlog = async () => {
    if (!blogTitle.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    const newBlog = await createBlog({ title: blogTitle }, token);
    if (newBlog) {
      setBlogs((prevBlogs) => [...prevBlogs, newBlog]); // Add the new blog to the list
      setIsCreateModalOpen(false); // Close the create modal
      navigate(`/blogs/${newBlog._id}`); // Redirect to the new blog
    }
  };

  // Delete the selected blog
  const handleDeleteBlog = async () => {
    if (selectedBlogId) {
      await deleteBlog(selectedBlogId, token);
      setBlogs((prev) => prev.filter((blog) => blog._id !== selectedBlogId));
      setIsModalOpen(false); // Close the modal after deletion
      toast.success("Blog deleted successfully");
    }
  };

  // Open the modal for blog deletion
  const openModal = (blogId) => {
    setSelectedBlogId(blogId); // Set the selected blog ID
    setIsModalOpen(true); // Open the modal
  };

  // Close the delete modal without deleting
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  // Handle the show more functionality
  const handleShowDescription = (blogId) => {
    setShowDescription((prevState) => ({
      ...prevState,
      [blogId]: !prevState[blogId],
    }));
  };

  // Redirect to the blog update page
  const handleUpdateBlog = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  // Function to format the createdAt date
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 container mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">My Blogs</h1>

      {/* Create Blog Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Create Blog
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-gray-50 rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold text-blue-700">{blog.title}</h2>
                <p className="text-gray-600 text-sm mt-2">
                    {blog?.description
                        ? showDescription[blog._id]
                        ? blog.description
                        : `${blog.description.substring(0, 100)}...`
                        : "No description"}
                </p>

              <button
                onClick={() => handleShowDescription(blog._id)}
                className="text-blue-500 text-sm mt-2 block"
              >
                {showDescription[blog._id] ? "Show Less" : "Show More"}
              </button>

              {/* Display created date */}
              <p className="text-gray-500 text-xs mt-2">
                Created at: {formatDate(blog.createdAt)}
              </p>

              {/* Action buttons */}
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleUpdateBlog(blog._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                >
                  Update
                </button>
                <button
                  onClick={() => openModal(blog._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for Confirming Deletion */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this blog?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBlog}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Creating a Blog */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Create a New Blog</h3>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBlog}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorBlogs;
