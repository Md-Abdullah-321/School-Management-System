/*
 * Title: Site's Router 
 * Description: Handle All site's router
 * Author: Md Abdullah
 * Date: 12/01/24
 */

//dependencies:
const express = require("express");
const { handleGetHomeInfo, handleUpdateHomeInfo } = require("../controllers/homeController");
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const homeRouter = express.Router();


//GET -> get home info
homeRouter.get("/", handleGetHomeInfo);

//PUT -> update home info
homeRouter.put("/update", isLoggedIn, isAdmin,handleUpdateHomeInfo);

module.exports = homeRouter;