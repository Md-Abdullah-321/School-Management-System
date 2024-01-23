/*
 * Title: Site's Router 
 * Description: Handle All site's router
 * Author: Md Abdullah
 * Date: 12/01/24
 */

//dependencies:
const express = require("express");
const { handleGetHomeInfo, handleUpdateHomeInfo, handleAddUtility } = require("../controllers/homeController");
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const homeRouter = express.Router();


//PUT -> update home info
homeRouter.put("/update", isLoggedIn, isAdmin, handleUpdateHomeInfo);

//PUT -> update home info
homeRouter.post("/utility", isLoggedIn, isAdmin, handleAddUtility);

//GET -> get home info
homeRouter.get("/", handleGetHomeInfo);


module.exports = homeRouter;