/*
 * Title: Check Existance with Email
 * Description: Check if email exist on database or not.
 * Author: Md Abdullah
 * Date: 14/01/24
 */

//Dependencies:
const createError = require("http-errors");
const mongoose = require("mongoose");

const checkExistanceWithEmail = async (Model, email, options = {}) => {
    try {
        const item = await Model.findOne({ email }, options);
        return item;
    } catch (error) {
        if (error instanceof mongoose.Error) {
            throw createError(400, "Invalid item email");
        }

        throw error;
    }
};

module.exports = checkExistanceWithEmail;
