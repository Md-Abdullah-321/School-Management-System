/*
 * Title: Teacher Controller 
 * Description: handle all teacher controller 
 * Author: Md Abdullah
 * Date: 11/01/24
 */

const checkExistanceWithEmail = require("../helper/checkExistanceWithEmail");
const { createEntity } = require("../helper/createEntity");
const Teacher = require("../models/teacherSchema");
const { getTeachers, getTeacherById } = require("../services/teacherServices");
const { successResponse, errorResponse } = require("./responseController");
const createError = require("http-errors");



const handleCreateTeacher = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phoneNumber, subjects, address, picture } = req.body;

        const requiredFields = [firstName, lastName, email, phoneNumber, subjects, address, picture];
        if (requiredFields.some(field => !field)) {
            throw createError(204, "Error: All fields are required. Please provide the required information.");
        }

        const isExist = await checkExistanceWithEmail(Teacher, email);

        if (isExist) {
            throw createError(403, "Error: Teacher already exist with this email");
        }

        const teacherInfo = { firstName, lastName, email, phoneNumber, subjects, address, picture };
        const teacher = await createEntity(Teacher, teacherInfo);

        return successResponse(res, {
            statusCode: 200,
            message: "Teacher created successfully",
            payload: { ...teacher }
        });
    } catch (error) {
        next(error);
    }
};



const handleGetTeacher = async (req, res, next) => {
    try {
        
        const teacher = await getTeachers(Teacher);

        return successResponse(res, {
            statusCode: 200,
            message: "Teacher fetched successfully",
            payload: { ...teacher }
        });
    } catch (error) {
        next(error);
    }
};



// const handleUpdateTeacher = async (req, res, next) => {
//     try {
//         const { firstName, lastName, email, phoneNumber, subjects, address, picture } = req.body;

//         const requiredFields = [firstName, lastName, email, phoneNumber, subjects, address, picture];
//         if (requiredFields.some(field => !field)) {
//             throw createError(204, "Error: All fields are required. Please provide the required information.");
//         }
       
//         return successResponse(res, {
//             statusCode: 200,
//             message: "Teacher updated successfully",
//             payload: {  }
//         });
//     } catch (error) {
//         next(error);
//     }
// };



const handleGetTeacherById = async (req, res, next) => {
    try {
        
        const { id } = req.params;
        if (!id) {
             throw createError(403, "Error: Please provide an id");
        }

        const teacher = await getTeacherById(Teacher, id);
        if (!teacher) {
            throw createError(404, "Teacher with this id does not exist.")
        }

        return successResponse(res, {
            statusCode: 200,
            message: "Teacher fetched successfully",
            payload: { ...teacher._doc }
        });
    } catch (error) {
        next(error);
    }
};





module.exports = {
    handleCreateTeacher,
    handleGetTeacher,
    handleGetTeacherById
}
