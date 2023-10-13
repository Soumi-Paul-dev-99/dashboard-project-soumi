const router = require("express").Router();
const uploader=require("../middleware/Multer");
// const {v4:uuidv4} = require("uuid");
let path = require("path");
let User = require("../models/user.model");
const cloudinary = require("../utils/cloudinary");
const { register, login, logout,  ForgotPassword, getOTP, resetPassword, activateUser } = require("../controller/userController");




    router.route("/register").post(uploader.single("photo"),register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/ForgotPassword").post(ForgotPassword);
router.route("/OTP").post(getOTP);
router.route("/resetPassword").post(resetPassword);
router.route("/activation/:activation_token").post(activateUser);
    module.exports = router;