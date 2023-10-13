const mongoose = require("mongoose");
const dbConnect = () =>{
    mongoose.connect(process.env.DB_URL).then((res)=>{
        console.log(`database connected successfully ${res.connection.host}`)
    })
};

module.exports = dbConnect;