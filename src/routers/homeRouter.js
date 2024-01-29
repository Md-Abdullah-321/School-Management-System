/*
 * Title: Site's Router 
 * Description: Handle All site's router
 * Author: Md Abdullah
 * Date: 12/01/24
 */

//dependencies:
const express = require("express");
const { handleGetHomeInfo, handleUpdateHomeInfo, handleAddUtility, handleUpdateLocation, handleGetNotices, handlePostNotice, handlePostGallery, handleGetGallery } = require("../controllers/homeController");
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const homeRouter = express.Router();


//PUT -> update home info
homeRouter.put("/update-site", isLoggedIn, isAdmin, handleUpdateHomeInfo);

//PUT -> update location info
homeRouter.put("/update-location", isLoggedIn, isAdmin, handleUpdateLocation);

//GET -> get notices
homeRouter.get("/notice", handleGetNotices);

//POST -> post notices
homeRouter.post("/notice", isLoggedIn, isAdmin,handlePostNotice);

//POST -> post gallery
homeRouter.post("/event", isLoggedIn, isAdmin, handlePostGallery);

//POST -> get gallery
homeRouter.get("/event", handleGetGallery);

//PUT -> update home info
homeRouter.post("/utility", isLoggedIn, isAdmin, handleAddUtility);

//GET -> get home info
homeRouter.get("/", handleGetHomeInfo);


module.exports = homeRouter;