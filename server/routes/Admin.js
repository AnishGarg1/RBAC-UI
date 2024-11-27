const express = require("express");
const { isAdmin, auth } = require("../middleware/auth");
const { getAllUsers, switchUserRole, deleteUser, getAllBlogs, deleteBlogByAdmin } = require("../controllers/Admin");
const router = express.Router();

// Admin routes
router.get("/users", auth, isAdmin, getAllUsers); // Get all users
router.post("/switch-role", auth, isAdmin, switchUserRole); // Switch user role
router.post("/delete-user", auth, isAdmin, deleteUser); // Delete user
router.get("/blogs", auth, isAdmin, getAllBlogs); // Get all blogs
router.post("/delete-blog", auth, isAdmin, deleteBlogByAdmin); // Delete a blog

module.exports = router;