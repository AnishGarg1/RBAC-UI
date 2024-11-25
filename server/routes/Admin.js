import { deactivateUser, deleteBlogByAdmin, getAllBlogs, getAllUsers, switchUserRole } from "../controllers/Admin";
import { isAdmin } from "../middleware/auth";

// Admin routes
router.get("/users", isAdmin, getAllUsers); // Get all users
router.post("/switch-role", isAdmin, switchUserRole); // Switch user role
router.post("/deactivate-user", isAdmin, deactivateUser); // Deactivate user
router.get("/blogs", isAdmin, getAllBlogs); // Get all blogs
router.post("/delete-blog", isAdmin, deleteBlogByAdmin); // Delete a blog
