const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    fname:{
        type:String,
        required: true,
        trim: true
    },
    lname:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique : true
    },
    password:{
        type:String,
        required: true,
        trim: true,
        unique:true
    },
    reEnterPassword:{
        type:String,
        required: true,
        trim: true
    },
    birthdate:{
        type:String,
        required: true,
        trim: true
    },
    photo:{
        type:String
    },
OTP:{
    type:Number
},
newPassword:{ 
    type:String
},
confirmPassword:{
    type:String
},

resetPasswordOTP:Number,
resetPasswordExpire: Date,
   
});

//hash password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//match password
userSchema.method("comparePasword", async function (enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
})

// get jwt token
userSchema.method("getJWT", function(){
    return JWT.sign({id:this._id}, process.env.JWT_SECRECT,{
        expiresIn:process.env.JWT_EXPIRE
    })
})

//get reset token
userSchema.method("getPaswordResetOTP", function () {
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000);
      }

    this.resetPasswordOTP = generateOTP()
    console.log("this.resetPasswordOTP ", this.resetPasswordOTP );

    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  
    return  this.resetPasswordOTP;
  });

const User = mongoose.model("User", userSchema);

module.exports = User;