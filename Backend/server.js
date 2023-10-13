const app = require("./app");
const dbConnect = require("./config/dbConnect");
require("dotenv").config({path:"./config/config.env"});
const cookieParser = require("cookie-parser");
app.use(cookieParser())


process.on("uncaughtException", (err)=>{
    console.log(`Shutting down server due to ${err.name}: ${err.message}`)
})

//Database connection
dbConnect()

const server = app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is running on ${process.env.PORT}`)
});

//For mongodb error
process.on("unhandledRejection", (err)=>{
    console.log("unhandledRejection rrr",err);
    console.log(`Shutting down server due to ${err.name}: ${err.message}`);
    server.close(()=>{
        process.exit(1);
    })
})