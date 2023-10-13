const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res , next) =>{
    console.log("errorrr" , err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

if(err.message === "ValidationError"){
    const message = `Resource not found:${err.path}`;
    err = new ErrorHandler(message, 500)
}

if(err.code === 11000){
    const message = `Duplicate key  ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message,500)
}
res.status(err.statusCode).json({
    success:false,
    message:err.message
})
}

module.exports = errorMiddleware;