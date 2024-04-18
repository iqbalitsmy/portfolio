const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

// import somethings from route
const userMail = require("./routes/userMailRoutes");


// apply middleware 
app.use(express.json());


// cors
corsOptions = {
    origin: 'https://portfolio-6ecc.onrender.com/',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200,
    headers: ['Content-Type', 'Authorization'],
};

app.use(cors());

app.use(cookieParser(corsOptions));

// path with config file 
dotenv.config({ path: "./config/config.env" });

// user API 
app.use("/user-mail", userMail);


module.exports = app;