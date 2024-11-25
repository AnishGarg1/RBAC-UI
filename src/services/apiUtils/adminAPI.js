import toast from "react-hot-toast";
import { apiConnect } from "../apiConnect";
import { adminEndpoints } from "../apis";
import { setBlogsList } from "../../redux/slices/blogSlice";
import { setUsersList } from "../../redux/slices/userSlice";

const {
  GET_ALL_USERS_API,
  SWITCH_USER_ROLE_API,
  DEACTIVATE_USER_API,
  GET_ALL_BLOGS_API,
  DELETE_BLOG_BY_ADMIN_API,
} = adminEndpoints;

// Fetch all users
export const getAllUsers = async (token, dispatch) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnect(
      "GET",
      GET_ALL_USERS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET ALL USERS API RESPONSE.....", response);

    if (!response?.data?.success) {
      toast.error(response?.data?.message);
      throw new Error("Error");
    }
    result = response.data.users;
    dispatch(setUsersList(result));
    toast.success("Users fetched successfully");
  } catch (error) {
    console.log("GET ALL USERS API ERROR:", error);
    toast.error("Something went wrong");
  }
  toast.dismiss(toastId);
  return result;
};

// Switch user role
export const switchUserRole = async (userId, newRole, token) => {
  const toastId = toast.loading("Processing...");
  try {
    const response = await apiConnect(
      "POST",
      SWITCH_USER_ROLE_API,
      {
        userId,
        newRole,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("SWITCH USER ROLE API RESPONSE.....", response);

    if (!response?.data?.success) {
      toast.error(response?.data?.message);
      throw new Error("Error");
    }
    toast.success("User role updated successfully");
    return response.data.user;
  } catch (error) {
    console.log("SWITCH USER ROLE API ERROR:", error);
    toast.error("Something went wrong");
  }
  toast.dismiss(toastId);
};

// Deactivate a user
export const deactivateUser = async (userId, token) => {
  const toastId = toast.loading("Processing...");
  try {
    const response = await apiConnect(
      "POST",
      DEACTIVATE_USER_API,
      {
        userId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DEACTIVATE USER API RESPONSE.....", response);

    if (!response?.data?.success) {
      toast.error(response?.data?.message);
      throw new Error("Error");
    }
    toast.success("User deactivated successfully");
  } catch (error) {
    console.log("DEACTIVATE USER API ERROR:", error);
    toast.error("Something went wrong");
  }
  toast.dismiss(toastId);
};

// Fetch all blogs
export const getAllBlogsByAdmin = async (token, dispatch) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnect(
      "GET",
      GET_ALL_BLOGS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET ALL BLOGS BY ADMIN API RESPONSE.....", response);

    if (!response?.data?.success) {
      toast.error(response?.data?.message);
      throw new Error("Error");
    }
    result = response.data.blogs;
    dispatch(setBlogsList(result));
    toast.success("Blogs fetched successfully");
  } catch (error) {
    console.log("GET ALL BLOGS BY ADMIN API ERROR:", error);
    toast.error("Something went wrong");
  }
  toast.dismiss(toastId);
  return result;
};

// Delete a blog by admin
export const deleteBlogByAdmin = async (blogId, token) => {
  const toastId = toast.loading("Processing...");
  try {
    const response = await apiConnect(
      "POST",
      DELETE_BLOG_BY_ADMIN_API,
      {
        blogId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE BLOG BY ADMIN API RESPONSE.....", response);

    if (!response?.data?.success) {
      toast.error(response?.data?.message);
      throw new Error("Error");
    }
    toast.success("Blog deleted successfully");
  } catch (error) {
    console.log("DELETE BLOG BY ADMIN API ERROR:", error);
    toast.error("Something went wrong");
  }
  toast.dismiss(toastId);
};
