/*
 * Title: App 
 * Description: handle all app related work.
 * Author: Md Abdullah
 * Date: 11/01/24
 */

//dependencies:
const express = require("express");
const teachersRouter = require("./routers/teachersRouter");
const siteRouter = require("./routers/siteRouter");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


//App level Middleware:
//1. BodyParser - Use to parse body:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//2. Add Cors: 
app.use(cors());

//Routers:
app.use("/api/teacher", teachersRouter);
app.use("/api/site", siteRouter);


//Global error handling:
app.use((err,req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status || 500,
        message: err.message || "There is an error on the server."
    })
})



module.exports = app;