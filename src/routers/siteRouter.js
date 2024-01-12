/*
 * Title: Site's Router 
 * Description: Handle All site's router
 * Author: Md Abdullah
 * Date: 12/01/24
 */

//dependencies:
const express = require("express");
const { handleGetSiteHomeInfo} = require("../controllers/siteController");
const siteRouter = express.Router();


//GET -> get home info
siteRouter.get("/", handleGetSiteHomeInfo);

module.exports = siteRouter;