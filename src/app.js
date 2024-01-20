/*
 * Title: App 
 * Description: handle all app related work.
 * Author: Md Abdullah
 * Date: 11/01/24
 */

//dependencies:
const express = require("express");
const teachersRouter = require("./routers/teachersRouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const homeRouter = require("./routers/homeRouter");
const { errorResponse } = require("./controllers/responseController");
const cookieParser = require("cookie-parser");
const studentRouter = require("./routers/studentRouter");
const messageRouter = require("./routers/messageRouter");


const app = express();


//App level Middleware:
//1. BodyParser - Use to parse body:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//2. Add Cors: 
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
//3. use cookie parser:
app.use(cookieParser());

//Routers:
app.use("/api/home", homeRouter);
app.use("/api/teacher", teachersRouter);
app.use("/api/student", studentRouter);
app.use("/api/message", messageRouter);


//Global error handling:
app.use((err,req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status || 500,
        message: err.message || "There is an error on the server."
    })
})


module.exports = {app, express};