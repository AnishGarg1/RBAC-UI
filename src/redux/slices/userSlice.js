import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [], // List of all users fetched by the admin
  loading: false, // To track loading state for any user-related actions
  error: null, // To store any error messages
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set the list of users
    setUsersList(state, action) {
      state.users = action.payload;
    },
    // Add a user to the list
    addUser(state, action) {
      state.users.push(action.payload);
    },
    // Remove a user from the list by ID
    removeUser(state, action) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    // Update a user in the list by ID
    updateUser(state, action) {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    // Set loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },
    // Set error message
    setError(state, action) {
      state.error = action.payload;
    },
    // Clear error message
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setUsersList,
  addUser,
  removeUser,
  updateUser,
  setLoading,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
