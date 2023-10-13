const User = require("../models/user.model");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("../utils/cloudinary");
const { catchAsyncError } = require("../middleware/catchAsyncError");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const axios = require("axios");
const uploader = require("../middleware/Multer")
const SECRET = "6LdTX18nAAAAAAoX6EgkQziHjBWCDwxPO-MQpiSw";
const jwt = require("jsonwebtoken");

exports.register = catchAsyncError(async (req, res, next) => {
  console.log(req.body);

  const {
    name,
    fname,
    lname,
    email,
    password,
    reEnterPassword,
    birthdate,
    recaptchaValue,
  } = req.body;

  
  

let userEmail = await User.findOne({email:email});
if(userEmail)
return res.status(409).send({message:"User with email already exit!"})

const user = {
  name,
  fname,
  lname,
  email,
  password,
  reEnterPassword,
  birthdate,
  recaptchaValue,
}

const activationToken = createActivationToken(user);
const activationUrl = `${process.env.FRONTEND_URL}/activation/${activationToken}`;

try{
  await sendEmail({
    email:email,
    subject:"Activate your account",
    message: `hello ${user.name}, please click on the link to activate your account: ${activationUrl}`
  })
} catch(error){
  res.status(500).json(error.message)
}
res.status(200).json({activationToken})
});

//Create Activation Token
const createActivationToken = (user)=>{
  return jwt.sign(user,process.env.ACTIVATION_SECRET,{
    expiresIn:"5m",
  });
};

//Activate User
exports.activateUser = catchAsyncError(async(req,res)=>{
  try {
    const {activation_token} = req.params;
    const user = jwt.verify(activation_token,process.env.ACTIVATION_SECRET);
    console.log(user);
    if(!user){
      res.status(500).send("error",error)
    }
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    
  console.log("req.file",req.file)
    const {
      name,
      fname,
      lname,
      email,
      password,
      reEnterPassword,
      birthdate,
      recaptchaValue,
    }=user;
if (!(name && fname && email && password && reEnterPassword && birthdate)) {
    res.status(400).send("all fields are required");
  }

  //verify the recaptcha value
  try {
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET}&response=${recaptchaValue}`
    );
    console.log("recaptchaResponse", recaptchaResponse);

    if (recaptchaResponse.data.success === true) {
      const newUser = await User.create({
        name,
        fname,
        lname,
        email,
        password,
        reEnterPassword,
        birthdate,
        photo: upload.url,
      });
     
      res.status(200).json({
        success: true,
        message: "User Register Successfully",
        newUser,
      });
    } else {
      res.status(400).json({ message: "reCaptcha verification failed" });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "error verification captcha",
    });
  }

  

      const oldUser = await User.findOne({ email });

  if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
} catch (error) {
    res.status(500).send(error)
  }
})

  
//login controller

exports.login = catchAsyncError(async (req, res, next) => {
  console.log("req.body", req.body);

  const { nameOrEmail, password } = req.body;

  //  if(((!email || !name) && !password)){
  //   return next(new ErrorHandler("Please enter your credentials",401))
  //  }
  // const user = await User.findOne({email: email}).select("+password");
  const user = await User.findOne({
    $or: [{ email: nameOrEmail }, { name: nameOrEmail }],
  }).select("+password");
  console.log("user", user);
  if (!user) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }

  const checkPassword = await user.comparePasword(password);

  console.log("check", checkPassword);

  if (!checkPassword) {
    return next(new ErrorHandler("Invalid Email and Password", 401));
  }

  sendToken(res, user, 201);

  // res.status(200).json({message:"user login successfully",user});
});

exports.logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

exports.ForgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // function generateOTP() {
  //     return Math.floor(100000 + Math.random() * 900000);
  //   }

  const resetOTP = user.getPaswordResetOTP();
  await user.save();

  const message = `Your password reset OTP is ${resetOTP}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password recovery One-Time Password (OTP)",
      text: message,
    });
    res.status(200).json({
      succcess: true,
      message: `OTP sent to this email ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpire = undefined;
    return next(new ErrorHandler(error.message, 401));
  }
});

exports.getOTP = catchAsyncError(async (req, res, next) => {
  console.log("req.body", req.body);

  const { email, OTP } = req.body;

  const user = await User.findOne({ email: email });
  console.log(user, "user");

  if (!user) {
    return next(new ErrorHandler("wrong credentials", 401));
  }

  if (!OTP) {
    return next(new ErrorHandler("Please enter Correct OTP", 401));
  }

  await user.save();

  if (user.resetPasswordOTP == OTP) {
    // user.resetPasswordOTP = undefined;
    // user.resetPasswordExpire = undefined;
    res.status(200).send({
      success: true,
    });
  } else {
    return next(new ErrorHandler("otp is invalid", 401));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const { OTP, newPassword, confirmPassword } = req.body;

  const resetPasswordOTP = req.body;

  const user = await User.findOne({
    resetPasswordOTP: OTP,
    // resetPasswordExpire
    // :{$gt: Date.now()}
  });

  if (!user) {
    return next(
      new ErrorHandler("reset password otp is invalid or hasbeen expired", 401)
    );
  }

  //Validate new password and confirm password match
  if (req.body.newPassword != req.body.confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  user.password = req.body.newPassword;
  user.resetPasswordOTP = undefined;

  console.log("user.password", user.password);
  // user.resetPasswordExpire = undefined;

  await user.save();
  res.status(200).json({ message: "Password reset successfull" });
});
