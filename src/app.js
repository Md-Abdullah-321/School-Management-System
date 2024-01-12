/*
 * Title: App 
 * Description: handle all app related work.
 * Author: Md Abdullah
 * Date: 11/01/24
 */

//dependencies:
const express = require("express");
const teachersRouter = require("./routers/teachersRouter");


const app = express();

//Routers:
app.use("/api/teacher", teachersRouter);



module.exports = app;