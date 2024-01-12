/*
 * Title: Teacher Controller 
 * Description: handle all teacher controller 
 * Author: Md Abdullah
 * Date: 11/01/24
 */

const HomeInfo = require("../models/homeSchema")
const { successResponse } = require("./responseController")

const handleGetTeacher = async (req, res, next) => {
    try {

        const home = await HomeInfo.find({});
        successResponse(res, {
            statusCode: 200,
            message: "Teacher get successfully",
            payload: {...home }
        })
    } catch (error) {
        
    }
}


module.exports = {
    handleGetTeacher,
}
