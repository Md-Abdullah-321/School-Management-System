/*
 * Title: Teacher Services 
 * Description: handle all teacher services hare
 * Author: Md Abdullah
 * Date: 14/01/24
 */

//Dependencies:

const getTeachers = async (Model) => await Model.find({});


module.exports = {
   getTeachers,
}