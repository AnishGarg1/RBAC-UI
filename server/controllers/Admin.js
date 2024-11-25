const User = require("../models/User");
const Blog = require("../models/Blog");

// Fetch all users with role 'Reader' and 'Author'
exports.getAllUsers = async (req, res) => {
    try {
      // Fetch users with 'Reader' and 'Author' roles
      const readers = await User.find({ role: 'Reader' }).populate('blogs');
      const authors = await User.find({ role: 'Author' }).populate('blogs');
  
      return res.status(200).json({
        success: true,
        readers, // send readers users
        authors, // send authors users
        message: "Users fetched successfully",
      });
    } catch (error) {
      console.log("Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error, try again",
      });
    }
};  

// Switch user role (Author <-> Reader)
exports.switchUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    if (!userId || !newRole || !["Author", "Reader"].includes(newRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

    // Find user and update role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = newRole;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User role updated to ${newRole}`,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// Deactivate (remove) a user
exports.deactivateUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Find and deactivate the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.active = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// Fetch all blogs of all users (for admin to manage content)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");
    return res.status(200).json({
      success: true,
      blogs,
      message: "All blogs fetched successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// Delete any blog (by admin)
exports.deleteBlogByAdmin = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    // Find and delete the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(blogId);

    // Remove blog reference from the user who created it
    await User.findByIdAndUpdate(
      blog.author,
      { $pull: { blogs: blogId } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};
