/*
 * Title: Site's Router 
 * Description: Handle All site's router
 * Author: Md Abdullah
 * Date: 12/01/24
 */

//dependencies:
const express = require("express");
const {handleGetHomeInfo, handleUpdateHomeInfo} = require("../controllers/siteController");
const siteRouter = express.Router();


//GET -> get home info
siteRouter.get("/", handleGetHomeInfo);

//PUT -> update home info
siteRouter.put("/update", handleUpdateHomeInfo);

module.exports = siteRouter;