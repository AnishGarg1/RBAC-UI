import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center animate__animated animate__fadeIn animate__delay-1s">
        Admin Dashboard
      </h1>

      {/* Overview Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 animate__animated animate__fadeIn animate__delay-2s">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome to the Admin Panel</h2>
        <p className="text-gray-600 mb-4">
          Here you can manage users, blogs, and other important features of the application.
        </p>
        <p className="text-gray-600">
          Select the section you wish to manage from the options below.
        </p>
      </div>

      {/* Action Links Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/admin/users"
          className="p-6 bg-blue-500 text-white text-lg font-semibold text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-600 hover:shadow-xl hover:translate-y-2"
        >
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              className="mx-auto mb-2 text-white"
            >
              <path
                fill="currentColor"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20c0-1.11.89-2 2-2h12c1.11 0 2 .89 2 2v1H4v-1z"
              />
            </svg>
          </div>
          <p>Manage Users</p>
        </Link>

        <Link
          to="/admin/blogs"
          className="p-6 bg-green-500 text-white text-lg font-semibold text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600 hover:shadow-xl hover:translate-y-2"
        >
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              className="mx-auto mb-2 text-white"
            >
              <path
                fill="currentColor"
                d="M21 8V4h-5V2h5c1.1 0 2 .9 2 2v4h-2zm0 4v6h-5v2h5c1.1 0 2-.9 2-2v-6h-2zm-8-4H3v6h10V8zm-2 4H5v-2h6v2z"
              />
            </svg>
          </div>
          <p>Manage Blogs</p>
        </Link>

        {/* New Section: Manage Categories */}
        <Link
          to="/admin/categories"
          className="p-6 bg-yellow-500 text-white text-lg font-semibold text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-yellow-600 hover:shadow-xl hover:translate-y-2"
        >
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              className="mx-auto mb-2 text-white"
            >
              <path
                fill="currentColor"
                d="M12 12h6v2h-6zm-1-8h6v2h-6zm0 4h6v2h-6zm-5 6h6v2H6zm0 4h6v2H6z"
              />
            </svg>
          </div>
          <p>Manage Categories</p>
        </Link>

        {/* New Section: View Analytics */}
        <Link
          to="/admin/analytics"
          className="p-6 bg-purple-500 text-white text-lg font-semibold text-center rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-purple-600 hover:shadow-xl hover:translate-y-2"
        >
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              className="mx-auto mb-2 text-white"
            >
              <path
                fill="currentColor"
                d="M12 12c1.1 0 2-.9 2-2V7h-4v3c0 1.1.9 2 2 2zm6-6V3H6v3h12zm3 3h-3v3c0 2.2-1.8 4-4 4h-4c-2.2 0-4-1.8-4-4V9H3v3c0 3.3 2.7 6 6 6h6c3.3 0 6-2.7 6-6V9z"
              />
            </svg>
          </div>
          <p>View Analytics</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
