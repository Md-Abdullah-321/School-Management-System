/*
 * Title: Site Services 
 * Description: handle all site services hare
 * Author: Md Abdullah
 * Date: 12/01/24
 */

//Dependencies:
const HomeInfo = require("../models/homeSchema");


const getHomeInfo = async() => await HomeInfo.find({});


module.exports = {
    getHomeInfo,
}