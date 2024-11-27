const express = require("express");
const { createBlog, deleteBlog, getAllBlogDetails, getBlogDetails, updateBlog, getAllAuthorBlogs } = require("../controllers/Blog");
const { auth, isAuthor } = require("../middleware/auth");
const router = express.Router();

// Route to create a new blog (only for authenticated authors)
router.post("/createBlog", auth, isAuthor, createBlog);

// Route to get details of a specific blog
router.post("/getBlog", auth, getBlogDetails);

// Route to update an existing blog (only for authenticated authors)
router.put("/updateBlog", auth, isAuthor, updateBlog);

// Route to get all blogs of a specific author (authorId sent in body)
router.post("/getAllAuthorBlogs", auth, isAuthor, getAllAuthorBlogs);

// Route to get all blogs (publicly accessible)
router.get("/getAllBlogs", getAllBlogDetails);

// Route to delete a blog (only for authenticated authors)
router.delete("/deleteBlog", auth, isAuthor, deleteBlog);

module.exports = router;
