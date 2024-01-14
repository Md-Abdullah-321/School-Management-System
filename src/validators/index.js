/*
 * Title: Validate 
 * Description: Validate all inputs
 * Author: Md Abdullah
 * Date: 14/01/24
 */

//Dependencies:
const { validationResult } = require("express-validator");
const { errorResponse } = require("../controllers/responseController");


const runValidation = async (req, res, next) => {
    try {
        const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return errorResponse(res, {
            statusCode: 422,
            message: errors.array()[0].msg
        })
    }
        
        return next();
    } catch (error) {
        return next(error);
    }
}


module.exports = runValidation;

