import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsByAdmin, deleteBlogByAdmin } from "../../services/apiUtils/adminAPI";
import { useNavigate } from "react-router-dom"; // To handle redirection

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null); // To store the selected blog ID for deletion
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsList = await getAllBlogsByAdmin(token, dispatch);
      setBlogs(blogsList);
    };
    fetchBlogs();
  }, [token, dispatch]);

  const handleDeleteBlog = async () => {
    if (selectedBlogId) {
      await deleteBlogByAdmin(selectedBlogId, token);
      setBlogs((prev) => prev.filter((blog) => blog._id !== selectedBlogId));
      setIsModalOpen(false); // Close the modal after deletion
    }
  };

  const openModal = (blogId) => {
    setSelectedBlogId(blogId); // Set the selected blog ID
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  const handleViewBlog = (blogId) => {
    navigate(`/blog/${blogId}`); // Redirect to the blog details page
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl container mx-auto mt-10">
      <h1 className="text-4xl font-semibold text-center mb-8 text-blue-700">Manage Blogs</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table-auto w-full text-sm text-left border-collapse border border-gray-300">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Author</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">No blogs available.</td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-4 text-gray-900 font-medium">{blog.title}</td>
                  <td className="px-6 py-4 text-gray-700">{`${blog.author.firstName} ${blog.author.lastName}`}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    {/* View button */}
                    <button
                      onClick={() => handleViewBlog(blog._id)}
                      className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      View
                    </button>
                    {/* Delete button */}
                    <button
                      onClick={() => openModal(blog._id)}
                      className="bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Confirm Deletion</h2>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete this blog? This action cannot be undone.
            </p>
            <div className="flex justify-around">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBlog}
                className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
