/*
 * Title: Check Existance with ID
 * Description: Check if id exist on database or not.
 * Author: Md Abdullah
 * Date: 13/01/24
 */

//Dependencies:
const createError = require("http-errors");



const checkExistanceWithId = async (Model,id, options = {}) => {
   try {
        const item = await Model.findById(id, options);
        if (!item) {
            throw createError(404, `${Model.modelName} does not exist with this id`);
        }
       return item;
   } catch (error) {
        if (error instanceof mongoose) {
            throw (createError(400, "Invalid item Id"));
        }
       throw error;
   }
}



module.exports = checkExistanceWithId;