const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODb_URI || "mongodb://localhost:27017/node-api",
    (err) => {
        if(!err) console.log("MongoDB connected ");
        else console.log("Connection error : "+ err);
    }
) 