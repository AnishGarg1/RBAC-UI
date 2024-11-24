const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connection Successfull"))
    .catch((error) => {
        console.log("DB connection failed");
        console.log("Error:", error);
        process.exit(1);
    })
}