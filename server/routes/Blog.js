const express = require("express");
const { createBlog, deleteBlog, getAllBlogDetails, getBlogDetails, updateBlog } = require("../controllers/Blog");
const { auth, isAuthor } = require("../middleware/auth");
const router = express.Router();

router.post("/createBlog", auth, isAuthor, createBlog);
router.post("/getBlog", auth, getBlogDetails);
router.put("/updateBlog", auth, isAuthor, updateBlog);
router.get("/getAllBlogs", getAllBlogDetails);
router.delete("/deleteBlog", auth, isAuthor, deleteBlog);

module.exports = router;