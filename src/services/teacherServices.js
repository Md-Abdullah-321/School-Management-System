/*
 * Title: Teacher Services 
 * Description: handle all teacher services hare
 * Author: Md Abdullah
 * Date: 14/01/24
 */

//Dependencies:

const getTeachers = async (Model) => await Model.find({}).select("-role");

const getTeacherById = async (Model, id) => await Model.findById(id).select("-role");


module.exports = {
    getTeachers,
    getTeacherById,
}