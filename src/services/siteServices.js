/*
 * Title: Site Services 
 * Description: handle all site services hare
 * Author: Md Abdullah
 * Date: 12/01/24
 */

//Dependencies:
const { errorResponse } = require("../controllers/responseController");
const HomeInfo = require("../models/homeSchema");


const getHomeInfo = () => HomeInfo.find({});


module.exports = {
    getHomeInfo,
}