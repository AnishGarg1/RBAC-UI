import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, switchUserRole, deleteUser } from "../../services/apiUtils/adminAPI";
import { ROLE } from "../../utils/constants";

const ManageUsers = () => {
  const [users, setUsers] = useState({ readers: [], authors: [] });
  const [filteredUsers, setFilteredUsers] = useState({ readers: [], authors: [] });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [modal, setModal] = useState({ isVisible: false, userId: null, newRole: "" });
  const [deleteModal, setDeleteModal] = useState({ isVisible: false, userId: null, role: "" });
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(token, dispatch);
        if (response?.readers && response?.authors) {
          setUsers({
            readers: response.readers,
            authors: response.authors
          });
          setFilteredUsers({
            readers: response.readers,
            authors: response.authors
          });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers({ readers: [], authors: [] });
        setFilteredUsers({ readers: [], authors: [] });
      }
    };
    fetchUsers();
  }, [token, dispatch]);

  const handleSwitchRole = async () => {
    try {
      const { userId, newRole } = modal;
      const updatedRole = newRole === ROLE.AUTHOR ? ROLE.READER : ROLE.AUTHOR;
      await switchUserRole(userId, updatedRole, token);

      setUsers((prev) => {
        const updatedUsers = { ...prev };
        updatedUsers[updatedRole === ROLE.AUTHOR ? "readers" : "authors"] = updatedUsers[
          updatedRole === ROLE.AUTHOR ? "readers" : "authors"
        ].map((user) =>
          user._id === userId ? { ...user, role: updatedRole } : user
        );
        return updatedUsers;
      });

      setFilteredUsers((prev) => {
        const updatedFiltered = { ...prev };
        updatedFiltered[updatedRole === ROLE.AUTHOR ? "readers" : "authors"] = updatedFiltered[
          updatedRole === ROLE.AUTHOR ? "readers" : "authors"
        ].map((user) =>
          user._id === userId ? { ...user, role: updatedRole } : user
        );
        return updatedFiltered;
      });

      setModal({ isVisible: false, userId: null, newRole: "" });
    } catch (error) {
      console.error("Error switching role:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const { userId, role } = deleteModal;
      await deleteUser(userId, token);

      setUsers((prev) => {
        const updatedUsers = { ...prev };
        updatedUsers[role] = updatedUsers[role].filter((user) => user._id !== userId);
        return updatedUsers;
      });

      setFilteredUsers((prev) => {
        const updatedFiltered = { ...prev };
        updatedFiltered[role] = updatedFiltered[role].filter((user) => user._id !== userId);
        return updatedFiltered;
      });

      setDeleteModal({ isVisible: false, userId: null, role: "" });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearchAndFilter = useCallback(() => {
    let filtered = { ...users };
    if (filterRole) {
      filtered.readers = filtered.readers.filter((user) => user.role === filterRole);
      filtered.authors = filtered.authors.filter((user) => user.role === filterRole);
    }
    if (searchQuery) {
      filtered.readers = filtered.readers.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
      filtered.authors = filtered.authors.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredUsers(filtered);
  }, [users, filterRole, searchQuery]);

  const openModal = (userId, currentRole) =>
    setModal({ isVisible: true, userId, newRole: currentRole === ROLE.AUTHOR ? ROLE.READER : ROLE.AUTHOR });
  const closeModal = () => setModal({ isVisible: false, userId: null, newRole: "" });

  const openDeleteModal = (userId, role) => setDeleteModal({ isVisible: true, userId, role });
  const closeDeleteModal = () => setDeleteModal({ isVisible: false, userId: null, role: "" });

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchQuery, filterRole, handleSearchAndFilter]);

  return (
    <div className="p-6 mt-10 container mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold mb-6 text-center text-blue-600">Manage Users</h1>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-6 bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search by name"
          className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value={ROLE.AUTHOR}>Author</option>
          <option value={ROLE.READER}>Reader</option>
        </select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        {filteredUsers.readers.length > 0 || filteredUsers.authors.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.readers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition duration-300">
                  <td className="px-6 py-3">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() =>
                        openModal(user._id, user.role === ROLE.AUTHOR ? ROLE.READER : ROLE.AUTHOR)
                      }
                      className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Switch Role
                    </button>
                    <button
                      onClick={() => openDeleteModal(user._id, "readers")}
                      className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.authors.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition duration-300">
                  <td className="px-6 py-3">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.role}</td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() =>
                        openModal(user._id, user.role === ROLE.AUTHOR ? ROLE.READER : ROLE.AUTHOR)
                      }
                      className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Switch Role
                    </button>
                    <button
                      onClick={() => openDeleteModal(user._id, "authors")}
                      className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600 py-6">No users found.</p>
        )}
      </div>

      {/* Modal for Role Switch */}
      {modal.isVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">Switch User Role</h2>
            <p className="text-center mb-4">
              Are you sure you want to switch the role of this user to{" "}
              {modal.newRole === ROLE.AUTHOR ? "Reader" : "Author"}?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSwitchRole}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Deleting User */}
      {deleteModal.isVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">Delete User</h2>
            <p className="text-center mb-4">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
