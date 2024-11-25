const BASE_URL = process.env.REACT_APP_BASE_URL;

// Auth Endpoints
export const authEndpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API: BASE_URL + "/auth/signup",
};

// Admin Endpoints
export const adminEndpoints = {
  GET_ALL_USERS_API: BASE_URL + "/admin/users", // Get all users
  SWITCH_USER_ROLE_API: BASE_URL + "/admin/switch-role", // Switch user role
  DEACTIVATE_USER_API: BASE_URL + "/admin/deactivate-user", // Deactivate user
  GET_ALL_BLOGS_API: BASE_URL + "/admin/blogs", // Get all blogs
  DELETE_BLOG_BY_ADMIN_API: BASE_URL + "/admin/delete-blog", // Delete a blog by admin
};

// Blog Endpoints
export const blogEndpoints = {
  CREATE_BLOG_API: BASE_URL + "/blog/createBlog", // Create a new blog
  GET_BLOG_DETAILS_API: BASE_URL + "/blog/getBlog", // Get details of a specific blog
  UPDATE_BLOG_API: BASE_URL + "/blog/updateBlog", // Update a blog
  GET_ALL_BLOGS_API: BASE_URL + "/blog/getAllBlogs", // Get all blogs
  DELETE_BLOG_API: BASE_URL + "/blog/deleteBlog", // Delete a blog
};
