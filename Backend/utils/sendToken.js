const sendToken = (res,user,statusCode)=>{
const token = user.getJWT();

const options = {
    expire :new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    )
};
const userid =  user?._id
res.status(statusCode).cookie("token",token,options).json({
    success:true,
    message:"User logged in successfully",
   userid
})
};

module.exports = sendToken