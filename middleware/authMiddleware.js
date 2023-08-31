const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const viewDecodedIdFromHeader = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // get information for user who carry this decoded.id withoust password
      req.user = await User.findById(decoded.id).select("-password");
      
    } catch (error) {
      console.log(error);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }

  next();
});

module.exports = viewDecodedIdFromHeader;
