import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsByAdmin, deleteBlogByAdmin } from "../../services/apiUtils/adminAPI";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null); // To store the selected blog ID for deletion
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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

  return (
    <div className="p-6 container mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Manage Blogs</h1>
      <div className="overflow-x-auto rounded-lg shadow-sm">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">No blogs available.</td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{blog.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {`${blog.author.firstName} ${blog.author.lastName}`}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(blog._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this blog?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBlog}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
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
