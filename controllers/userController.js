const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const hashedPasswordByJWT = require("../utils/hashedPassword");

const authOfUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userEmailAndPassword = await User.findOne({ email });

  if (
    userEmailAndPassword &&
    (await userEmailAndPassword.matchPassword(password))
  ) {
    res.json({
      _id: userEmailAndPassword._id,
      name: userEmailAndPassword.name,
      email: userEmailAndPassword.email,
      isAdmin: userEmailAndPassword.isAdmin,
      token: hashedPasswordByJWT(userEmailAndPassword._id),
    });
  } else {
    // 401 => status for invalid authentication
    res.status(401);
    throw new Error("invalid email or password");
  }
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    // 400 means that user already exist
    res.status(400);
    throw new Error("User already exist");
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: hashedPasswordByJWT(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const userDetails = await User.findById(req.user._id);
  if (userDetails) {
    res.json({
      _id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      isAdmin: userDetails.isAdmin,
      
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const ubdateUserProfile = asyncHandler(async (req, res) => {
  const userUbdateDetails = await User.findById(req.user._id);
  if (userUbdateDetails) {
    userUbdateDetails.name = req.body.name || userUbdateDetails.name 
    userUbdateDetails.email = req.body.email || userUbdateDetails.email
    if(req.body.password){
      userUbdateDetails.password = req.body.password
    } 

    const ubdateDataInDB =  await userUbdateDetails.save()
    
    res.json({
      _id: ubdateDataInDB._id,
      name: ubdateDataInDB.name,
      email: ubdateDataInDB.email,
      isAdmin: ubdateDataInDB.isAdmin,
      token: hashedPasswordByJWT(ubdateDataInDB._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const userController = { authOfUser, getUserProfile , register , ubdateUserProfile };

module.exports = userController;
