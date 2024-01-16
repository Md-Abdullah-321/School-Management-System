/*
 * Title: Site Controller 
 * Description: handle all site Controller hare
 * Author: Md Abdullah
 * Date: 12/01/24
 */

const checkExistanceWithId = require("../helper/checkExistanceWithId");
const HomeInfo = require("../models/homeSchema");
const { getHomeInfo, updateHomeInfo } = require("../services/siteServices");
const { successResponse, errorResponse } = require("./responseController");

//Dependencies:


const handleGetHomeInfo = async (req, res) => {
    try {
        const homeInformation = await getHomeInfo();
    
        return successResponse(res, {
            statusCode: 200,
            message: "Home info returned successfully.",
            payload: homeInformation,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 404,
            message: "Could not get home info.",
        });
    }
};


const handleUpdateHomeInfo = async (req, res) => {
    try {
        const { id, name, logo, backgroundImage } = req.body;
        await checkExistanceWithId(HomeInfo, id);

        const updates = { name, logo, backgroundImage };
        const updatedHomeInfo = await updateHomeInfo(id, updates);

        return successResponse(res, {
            statusCode: 200,
            message: "Home info updated successfully.",
            payload: {updatedHomeInfo},
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 404,
            message: "Could not update home info.",
        });
    }
};


module.exports = {
    handleGetHomeInfo,
    handleUpdateHomeInfo
}