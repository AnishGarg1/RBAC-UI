const Blog = require("../models/Blog");
const User = require("../models/User");

exports.createBlog = async (req, res) => {
  try {
    const userId = req.user.id;

    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }
    
    // check for instructor
    const user = await User.findById(userId, {
        role: "Author",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const blog = new Blog({
      user: user._id,
      title,
      description,
      status: "In Progress",
    });

    const createdBlog = await blog.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: { blogs: createdBlog._id },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      blog,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// update blog
exports.updateBlog = async (req, res) => {
    try {
        const { blogId, title, description, status } = req.body;
        
        if(!blogId){
            return res.status(400).json({
                success: false,
                message: "Please fill all details",
            });
        }

        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.statusa(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if(title){
            blog.title = title;
        }
        if(description){
            blog.description = description;
        }
        if(status){
            blog.status = status;
        }

        await blog.save();

        return res.status(200).json({
            success: true,
            blog,
            message: "Blog updated successfully",
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}

// get blog details
exports.getBlogDetails = async (req, res) => {
    try {
        const { blogId } = req.body;

        if(!blogId){
            return res.status(400).json({
                success: false,
                message: "Please fill details",
            });
        }

        const blog = await Blog.findById(blogId).populate({path: "user"});

        blog.user.password = undefined;

        if(!blog){
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            blog,
            message: "Blog fetched successfully",
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error, try again",
        });
    }
}

// get user's all blog
exports.getAllBlogDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const allBlogs = await Blog.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      allBlogs,
      message: "All blogs fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

// delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    const userId = req.user.id;

    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details",
      });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { blogs: blogId },
      },
      { new: true }
    );

    await Blog.findByIdAndDelete(blogId);

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
