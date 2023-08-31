const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const viewDecodedIdFromHeader = require("../middleware/authMiddleware")


router.route('/').post(userController.register)
router.post("/login", userController.authOfUser);
router.route("/profile").get(viewDecodedIdFromHeader,userController.getUserProfile).put(viewDecodedIdFromHeader,userController.ubdateUserProfile)
// use of ubdateUserProfile //////

module.exports = router;
