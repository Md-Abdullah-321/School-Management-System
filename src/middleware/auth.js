/*
 * Title: Is Logged In, Is Logged Out, Is Admin middleware 
 * Description: Handle some common middleware here.
 * Author: Md Abdullah
 * Date: 14/01/24
 */


//Dependencies:
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            throw createError(401, "Access token not found, please login");
        }

        const decoded = jwt.verify(token, process.env.ACCESS_KEY);

        if (!decoded) {
            throw createError(401, "Invalid access token, please login again");
        }

        req.user = decoded.user;
        next();
    } catch (error) {
        return next(error);
    }
}


const isLoggedOut = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (token) {
            throw createError(400, "User is already logged in");
        }
        next();
    } catch (error) {
        return next(error);
    }
}


const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            throw createError(403, "Forbidden, You must be an admin to access the resource");
        }
        next();
    } catch (error) {
        return next(error);
    }
}


module.exports = {
    isLoggedIn,
    isLoggedOut,
    isAdmin
}