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
           message: `Student fetched successfully`,
           payload: students,
       })
   } catch (error) {
       next(error);
   }
}


const handleGetPayment = async (req, res, next) => {
  try {
    const { month, year } = req.body;
      const { id } = req.params;
      
    const student = await checkExistanceWithId(Student, id);
    const paymentInfo = { month, year, paid: true };
    student.feesHistory.unshift(paymentInfo);
      
    const updates = { feesHistory: student.feesHistory };
    const updatedStudentInfo = await Student.findOneAndUpdate({ _id: id }, updates, { new: true });
      
    return successResponse(res, {
      statusCode: 200,
      message: `Payment has been done for ${month} ${year}.`,
      payload: updatedStudentInfo,
    });
  } catch (error) {
    next(error);
  }
};


const handleUpdateStudentInfo = async (req, res, next) => {
    try {        
        const { id } = req.params;

        const keys = Object.keys(req.body);
        let updates = {};
        keys.map((field) => {
            if (req.body[field]) {
                updates[field] = req.body[field];
            }
        })

        const updatedStudentInfo = await Student.findOneAndUpdate({ _id: id }, updates, { new: true });
        return successResponse(res, {
        statusCode: 200,
        message: `Student updated successfully.`,
        payload: updatedStudentInfo,
        });
  } catch (error) {
    next(error);
  }
};




module.exports = {
    handleCreateStudent,
    handleGetStudentsByClassName,
    handleDeleteStudent,
    handleGetStudents,
    handleGetPayment,
    handleUpdateStudentInfo,
}