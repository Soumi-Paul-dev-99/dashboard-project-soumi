const express = require("express");
const cors = require("cors");
const app = express();
 const errorMiddleware = require("./middleware/error");


app.use(cors());
app.use(express.json());

//Routes requires
const userRouter = require("./routes/userRoutes");
app.use("/users",userRouter);

//error handler
 app.use(errorMiddleware);

module.exports = app;