/*
 * Title: Student Controller 
 * Description: handle all student controller here.
 * Author: Md Abdullah
 * Date: 15/01/24
 */

const checkExistanceWithId = require("../helper/checkExistanceWithId");
const HomeInfo = require("../models/homeSchema");
const Student = require("../models/studentSchema");
const { updateHomeInfo } = require("../services/siteServices");
const { createStudent, getStudentsByClassName, deletestudent, getAllStudents } = require("../services/studentServices");
const { successResponse, errorResponse } = require("./responseController");
const ID = process.env.SITE_DOCUMENT_ID;

//Dependencies:


const handleCreateStudent = async (req, res, next) => {
   try {
       const { studentName, fathersName, mothersName, phoneNumber, address, dateOfBirth, className,tution_fees, admissionDate, image, feesHistory } = req.body;
       
       const studentInfo = { studentName, fathersName, mothersName, phoneNumber, address, dateOfBirth, className,tution_fees, admissionDate, image, feesHistory };

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
    let isPaid = false;  
    student.feesHistory.map((payment) => {
        if (payment.month === month && parseInt(payment.year) === parseInt(year)) {
            isPaid = true;
        }   
    })
    if (isPaid) {
          return errorResponse(res, {
              statusCode: 400,
              message: `Tution fee is already paid for ${month} ${year}.`
        })
    }
    const paymentInfo = { month, year, paid: true };
    student.feesHistory.unshift(paymentInfo);
      
    const updates = { feesHistory: student.feesHistory };
    const updatedStudentInfo = await Student.findOneAndUpdate({ _id: id }, updates, { new: true });
      
    const site = await HomeInfo.find({});
    site[0].reserve = site[0].reserve + student.tution_fees;
    await updateHomeInfo(ID, site[0]);
      
    return successResponse(res, {
      statusCode: 200,
      message: `Tution Fee has been paid for ${month} ${year}.`,
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

const handleGetStudentById = async (req, res, next) => {
    try {        
        const { id } = req.params;

        const student = await Student.findById(id);
        return successResponse(res, {
        statusCode: 200,
        message: `Student updated successfully.`,
        payload: student,
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
    handleGetStudentById,
}