/*
 * Title: Student Controller 
 * Description: handle all student controller here.
 * Author: Md Abdullah
 * Date: 15/01/24
 */

const checkExistanceWithId = require("../helper/checkExistanceWithId");
const Student = require("../models/studentSchema");
const { createStudent, getStudentsByClassName, deletestudent, getAllStudents } = require("../services/studentServices");
const { successResponse } = require("./responseController");

//Dependencies:


const handleCreateStudent = async (req, res, next) => {
   try {
       const { studentName, fathersName, mothersName, phoneNumber, address, dateOfBirth, className, admissionDate, image, feesHistory } = req.body;
       
       const studentInfo = { studentName, fathersName, mothersName, phoneNumber, address, dateOfBirth, className, admissionDate, image, feesHistory };

       const student = await createStudent(Student, studentInfo);

       return successResponse(res, {
           statusCode: 201,
           message: "Student created successfully.",
           payload: student,
       })
   } catch (error) {
       next(error);
   }
}


const handleGetStudentsByClassName = async (req, res, next) => {
   try {
       
       const { className } = req.params;
       
       const students = await getStudentsByClassName(Student, className);

       return successResponse(res, {
           statusCode: 201,
           message: `Student of class ${className} fetched successfully.`,
           payload: students,
       })
   } catch (error) {
       next(error);
   }
}


const handleDeleteStudent = async (req, res, next) => {
   try {
       
       const { id } = req.params;
       checkExistanceWithId(Student,id);
       
       await deletestudent(Student, id);
       return successResponse(res, {
           statusCode: 200,
           message: `Student deleted successfully`,
           payload: {}
       })
   } catch (error) {
       next(error);
   }
}

const handleGetStudents = async (req, res, next) => {
   try {
       const students = await getAllStudents(Student);
       return successResponse(res, {
           statusCode: 200,
           message: `Student deleted successfully`,
           payload: students,
       })
   } catch (error) {
       next(error);
   }
}




module.exports = {
    handleCreateStudent,
    handleGetStudentsByClassName,
    handleDeleteStudent,
    handleGetStudents,
}