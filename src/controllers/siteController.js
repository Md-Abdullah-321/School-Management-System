/*
 * Title: Site Controller 
 * Description: handle all site Controller hare
 * Author: Md Abdullah
 * Date: 12/01/24
 */

const { getHomeInfo } = require("../services/siteServices");
const { successResponse, errorResponse } = require("./responseController");

//Dependencies:


const handleGetSiteHomeInfo = async (req, res, next) => {
    try {
        const homeInfo = await getHomeInfo();
 
        return successResponse(res, {
            statusCode: 200,
            message: "Home info returned successfully.",
            payload: {...homeInfo["0"]._doc},
        })
    } catch (error) {
        return errorResponse(res, {
            statusCode: 404,
            message: "Could not get home info."
        })
    }
}


module.exports = {
    handleGetSiteHomeInfo,
}