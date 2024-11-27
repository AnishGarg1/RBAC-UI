import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/admin/users"
          className="p-4 bg-blue-500 text-white text-center rounded-lg shadow-md hover:bg-blue-600"
        >
          Manage Users
        </Link>
        <Link
          to="/admin/blogs"
          className="p-4 bg-green-500 text-white text-center rounded-lg shadow-md hover:bg-green-600"
        >
          Manage Blogs
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
