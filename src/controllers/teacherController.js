/*
 * Title: Teacher Controller 
 * Description: handle all teacher controller 
 * Author: Md Abdullah
 * Date: 11/01/24
 */

const { successResponse } = require("./responseController")

const handleGetTeacher = async (req, res, next) => {
    try {
        
        successResponse(res, {
            statusCode: 200,
            message: "Teacher get successfully",
            payload: {}
        })
    } catch (error) {
        
    }
}


module.exports = {
    handleGetTeacher,
}
