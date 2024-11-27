const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // Extracting jwt from request cookie, body or header
    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    try {
        // verify the token
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decode;
    } catch (error) {
        return res.status(401).json({success: false, message: "Token is invalid"});
    }

    next(); // if token is valid, then move to next middleware or request handler
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, try again",
    });
  }
};

//isReader
exports.isReader = async (req, res, next) => {
  try{
      if(req.user.role !== "Reader"){
          return res.status(401).json({
              success:false,
              message:"This is a protected route for Readers only",
          });
      }
      next();
  }
  catch(error) {
      return res.status(500).json({
          success:false,
          message:"User role cannot be verified, please try again",
      })
  }
}

//isAuthor
exports.isAuthor = async (req, res, next) => {
  try{
      if(req.user.role !== "Author"){
          return res.status(401).json({
              success:false,
              message:"This is a protected route for Author only",
          });
      }
      next();
  }
  catch(error) {
      return res.status(500).json({
          success:false,
          message:"User role cannot be verified, please try again",
      })
  }
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try{
      if(req.user.role !== "Admin"){
          return res.status(401).json({
              success:false,
              message:"This is a protected route for Admin only",
          });
      }
      next();
  }
  catch(error) {
      return res.status(500).json({
          success:false,
          message:"User role cannot be verified, please try again",
      })
  }
}