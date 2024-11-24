const express = require("express");
const app = express();
const database = require("./config/database");

const PORT = 4000

// Connection with Dtaabase
database.dbConnect();

app.listen(PORT, () => {
    console.log(`App is listening on port: ${PORT}`);
});
