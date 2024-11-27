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
  const [deleteModal, setDeleteModal] = useState({ isVisible: false, userId: null, role: "" }); // New delete confirmation modal state
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

  // Handle Role Switch
  const handleSwitchRole = async () => {
    try {
      const { userId, newRole } = modal;

      // Update the role to the opposite role
      const updatedRole = newRole === ROLE.AUTHOR ? ROLE.READER : ROLE.AUTHOR;

      // Call the API to switch the role
      await switchUserRole(userId, updatedRole, token);

      // Update the users state
      setUsers((prev) => {
        const updatedUsers = { ...prev };
        updatedUsers[updatedRole === ROLE.AUTHOR ? "readers" : "authors"] = updatedUsers[
          updatedRole === ROLE.AUTHOR ? "readers" : "authors"
        ].map((user) =>
          user._id === userId ? { ...user, role: updatedRole } : user
        );
        return updatedUsers;
      });

      // Update the filtered users state
      setFilteredUsers((prev) => {
        const updatedFiltered = { ...prev };
        updatedFiltered[updatedRole === ROLE.AUTHOR ? "readers" : "authors"] = updatedFiltered[
          updatedRole === ROLE.AUTHOR ? "readers" : "authors"
        ].map((user) =>
          user._id === userId ? { ...user, role: updatedRole } : user
        );
        return updatedFiltered;
      });

      setModal({ isVisible: false, userId: null, newRole: "" }); // Close modal
    } catch (error) {
      console.error("Error switching role:", error);
    }
  };

  // Handle Deletion (called after confirmation)
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

      setDeleteModal({ isVisible: false, userId: null, role: "" }); // Close delete modal
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Memoize the handleSearchAndFilter function
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

  // Handle Modal for Role Switch
  const openModal = (userId, currentRole) =>
    setModal({ isVisible: true, userId, newRole: currentRole === ROLE.AUTHOR ? ROLE.READER : ROLE.AUTHOR });
  const closeModal = () => setModal({ isVisible: false, userId: null, newRole: "" });

  // Handle Delete Confirmation Modal
  const openDeleteModal = (userId, role) => setDeleteModal({ isVisible: true, userId, role });
  const closeDeleteModal = () => setDeleteModal({ isVisible: false, userId: null, role: "" });

  // Re-run search/filter on query or role change
  useEffect(() => {
    handleSearchAndFilter();
  }, [searchQuery, filterRole, handleSearchAndFilter]);

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      
      {/* Search and Filter */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border px-4 py-2 rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value={ROLE.AUTHOR}>Author</option>
          <option value={ROLE.READER}>Reader</option>
        </select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        {filteredUsers.readers.length > 0 || filteredUsers.authors.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.readers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() =>
                        openModal(user._id, user.role === ROLE.AUTHOR ? ROLE.READER : ROLE.AUTHOR)
                      }
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                    >
                      Switch Role
                    </button>
                    <button
                      onClick={() => openDeleteModal(user._id, "readers")}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.authors.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() =>
                        openModal(user._id, user.role === ROLE.AUTHOR ? ROLE.READER : ROLE.AUTHOR)
                      }
                      className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                    >
                      Switch Role
                    </button>
                    <button
                      onClick={() => openDeleteModal(user._id, "authors")}
                      className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>

      {/* Role Switch Modal */}
      {modal.isVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to switch this user's role?</h2>
            <button
              onClick={handleSwitchRole}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              Yes
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to delete this user?</h2>
            <button
              onClick={handleDeleteUser}
              className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              Yes
            </button>
            <button
              onClick={closeDeleteModal}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
