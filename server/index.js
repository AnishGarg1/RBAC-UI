const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Connection with Dtaabase
database.dbConnect();

dotenv.config(); // parsing .env file variables

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 4000;

// routes

app.get("/", (req, res) => {
    res.send("Role Based Access Control - UI");
});

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});
