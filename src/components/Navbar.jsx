import React, { useState } from "react";
import { BiTask } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/apiUtils/authAPI";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogOpen, setIsLogOpen] = useState(false);

  const handleClickLog = () => {
    logout(dispatch, navigate);
    setIsLogOpen(false);
  };

  const handleClickCancel = () => {
    setIsLogOpen(false);
  };

  const renderAdminButtons = () => (
    <>
      <Link to="/admin">
        <button className="relative group hover:text-white">
          Admin Dashboard
          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
        </button>
      </Link>
      <Link to="/dashboard">
        <button className="relative group hover:text-white">
          All Blogs
          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
        </button>
      </Link>
    </>
  );

  const renderAuthorButtons = () => (
    <>
      <Link to="/blogs">
        <button className="relative group hover:text-white">
          Manage My Blogs
          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
        </button>
      </Link>
      <Link to="/dashboard">
        <button className="relative group hover:text-white">
          All Blogs
          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
        </button>
      </Link>
    </>
  );

  const renderReaderButtons = () => (
    <Link to="/dashboard">
      <button className="relative group hover:text-white">
        All Blogs
        <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"></span>
      </button>
    </Link>
  );

  return (
    <div className="flex justify-center items-center bg-opacity-20 bg-black rounded-lg py-4 mx-auto px-5 md:px-10 mt-5 w-full max-w-screen-lg">
      <div className="flex items-center justify-between w-full">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:scale-105 transition-transform"
        >
          <BiTask size={24} />
          <span className="font-bold text-lg">RBAC UI System</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/contact" className="hover:text-gray-200">
            Contact
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About Us
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {token ? (
            <div className="flex items-center gap-4">
              {user?.role === "Admin" && renderAdminButtons()}
              {user?.role === "Author" && renderAuthorButtons()}
              {user?.role === "Reader" && renderReaderButtons()}
              <button
                className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
                onClick={() => setIsLogOpen(true)}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isLogOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Confirm Logout
            </h3>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800 hover:bg-gray-300"
                onClick={handleClickCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
                onClick={handleClickLog}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
