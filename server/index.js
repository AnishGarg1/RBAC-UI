const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/User");
const blogRoutes = require("./routes/Blog");
const adminRoutes = require("./routes/Admin");

// Connection with Dtaabase
database.dbConnect();

dotenv.config(); // parsing .env file variables

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "*"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

const PORT = process.env.PORT || 4000;

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Role Based Access Control - UI");
});

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});
