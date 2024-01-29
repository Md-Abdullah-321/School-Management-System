/*
 * Title: Site Controller 
 * Description: handle all site Controller hare
 * Author: Md Abdullah
 * Date: 12/01/24
 */

//Dependencies:
const checkExistanceWithId = require("../helper/checkExistanceWithId");
const HomeInfo = require("../models/homeSchema");
const { getHomeInfo, updateHomeInfo } = require("../services/siteServices");
const { successResponse, errorResponse } = require("./responseController");
require("dotenv").config();
const ID = process.env.SITE_DOCUMENT_ID;


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
        const {name, logo, backgroundImage } = req.body;
        const site = await checkExistanceWithId(HomeInfo, ID);

        site.siteInfo = { name, logo, backgroundImage };
        const updatedHomeInfo = await updateHomeInfo(ID, site);

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

const handleUpdateLocation = async (req, res) => {
    try {
        const { website, phone, whatsApp, email, address } = req.body;
        const site = await checkExistanceWithId(HomeInfo, ID);

        site.location = { website, phone, whatsApp, email, address };
        const updatedHomeInfo = await updateHomeInfo(ID, site);

        return successResponse(res, {
            statusCode: 200,
            message: "Location and Info updated successfully.",
            payload: { updatedHomeInfo },
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 404,
            message: "Could not update location info.",
        });
    }
}

const handleGetNotices = async (req, res) => {
    try {
 
        const notices = await HomeInfo.find({});

        return successResponse(res, {
            statusCode: 200,
            message: "Notices fetched successfully.",
            payload: notices[0].notice,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 404,
            message: "Could not get notices.",
        });
    }
};

const handlePostNotice = async (req, res) => {
    try {
 
        const { title, url } = req.body;
        const notice = {
            title, url
        }
        const site = await HomeInfo.find({});
        site[0].notice.push(notice);

         const updatedSite = await updateHomeInfo(ID, site[0]);

        return successResponse(res, {
            statusCode: 200,
            message: "Notice post successfully.",
            payload: updatedSite.notice,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 404,
            message: "Could not post notice.",
        });
    }
};


const handlePostGallery = async (req, res) => {
    try {
 
        const { event_name, event_collection } = req.body;
        const gallery = {
            event_name,
            event_collection
        }
        const site = await HomeInfo.find({});
        site[0].gallery.push(gallery);

         const updatedSite = await updateHomeInfo(ID, site[0]);

        return successResponse(res, {
            statusCode: 200,
            message: "New event post successfully.",
            payload: updatedSite.gallery,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 404,
            message: "Could not post event.",
        });
    }
};


const handleGetGallery = async (req, res) => {
    try {
 
        const site = await HomeInfo.find({});


        return successResponse(res, {
            statusCode: 200,
            message: "New event fetched successfully.",
            payload: site[0].gallery,
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 404,
            message: "Could not fetch event.",
        });
    }
};


const handleAddUtility = async (req, res) => {
    try {
        const {utility } = req.body;
        const site = await HomeInfo.findOne({});
        let isExist = false;
        site.utility.forEach((util) => {
            if (util.year === utility.year && util.month === utility.month) {
                isExist = true;
            }
        })

        if (isExist) {
            return errorResponse(res, {
                statusCode: 404,
                message: "Utility of this month is already exist.",
            });
        }
        

        const siteInfo = await checkExistanceWithId(HomeInfo, ID);
        siteInfo.utility.unshift(utility)

        const updates = {utility: siteInfo.utility};
        const updatedHomeInfo = await updateHomeInfo(ID, updates);

        return successResponse(res, {
            statusCode: 200,
            message: "Utility added successfully.",
            payload: {updatedHomeInfo},
        });
    } catch (error) {
        return errorResponse(res, {
            statusCode: 404,
            message: "Could not add utility.",
        });
    }
};


module.exports = {
    handleGetHomeInfo,
    handleUpdateHomeInfo,
    handleAddUtility,
    handleUpdateLocation,
    handleGetNotices,
    handlePostNotice,
    handlePostGallery,
    handleGetGallery,
}