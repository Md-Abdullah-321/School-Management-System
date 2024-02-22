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
const bcrypt = require("bcryptjs");
const createJSONWebToken = require("../helper/createJSONWebToken");
const { setAccessTokenCookie } = require("../helper/cookie");
const checkExistanceWithId = require("../helper/checkExistanceWithId");
const HomeInfo = require("../models/homeSchema");
const { updateHomeInfo } = require("../services/siteServices");
require("dotenv").config();
const ID = process.env.SITE_DOCUMENT_ID;



const handleLoginTeacher = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await checkExistanceWithEmail(Teacher, email);
        if (!user) {
            throw createError(404, "Teacher does not exist with this email");
        }

        // Compare the entered password with the stored hashed password
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            throw createError(403, "Invalid Credentials");
        }

        //create and set access Token
        const accessToken = createJSONWebToken({ user }, process.env.ACCESS_KEY, "7d");
        setAccessTokenCookie(res, accessToken);

        return successResponse(res, {
            statusCode: 200,
            message: "Teacher logged in successfully",
            payload: user,
        })

    } catch (error) {
        next(error);
    }
}



const handleCreateTeacher = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phoneNumber, subjects,salary, address, picture, password} = req.body;

        const requiredFields = [firstName, lastName, email, phoneNumber, subjects, salary,address, picture, password];
        if (requiredFields.some(field => !field)) {
            throw createError(204, "Error: All fields are required. Please provide the required information.");
        }

        const isExist = await checkExistanceWithEmail(Teacher, email);

        if (isExist) {
            throw createError(403, "Error: Teacher already exist with this email");
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const teacherInfo = { firstName, lastName, email, phoneNumber, subjects, address,salary, picture , password: hashedPassword};
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
            payload: teacher
        });
    } catch (error) {
        next(error);
    }
};


const handlePaySalary = async (req, res, next) => {
    try {
    const { month, year, amount, paid} = req.body;
    const { id } = req.params;
      
    const teacher = await checkExistanceWithId(Teacher, id);
    let isPaid = false;  
    teacher?.paymentHistory?.map((payment) => {
    if (payment?.month === month && parseInt(payment?.year) === parseInt(year)) {
        isPaid = true;
    }   
    })
    if (isPaid) {
        return errorResponse(res, {
              statusCode: 400,
              message: `Salary is already paid for ${month} ${year}.`
        })
    }
        
    const paymentInfo = { month, year,amount, paid };
    teacher.paymentHistory.unshift(paymentInfo);
    const site = await HomeInfo.find({});
    if (parseInt(site[0].reserve) < parseInt(amount)) {
        return errorResponse(res, {
            statusCode: 400,
            message: `Reserve payment is less than the payment.`,
        });
    }
    site[0].reserve = site[0].reserve - amount;
    await updateHomeInfo(ID, site[0]);
      
    const updates = { paymentHistory: teacher.paymentHistory };
    const updatedTeacherInfo = await Teacher.findOneAndUpdate({ _id: id }, updates, { new: true });
      
        
    return successResponse(res, {
      statusCode: 200,
      message: `Payment has been done for ${month} ${year}.`,
      payload: updatedTeacherInfo,
    });
  } catch (error) {
    next(error);
  }
};


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


const handleTeacherLogout = async(req, res, next) => {
    try {
        res.clearCookie('accessToken');
        //success response
        return successResponse(res, {
            statusCode: 200,
            message: "Teacher logged out successfully"
        })
    } catch (error) {
        next(error);
    }
}


const handleDeleteTeacherById = async(req, res, next) => {
    try {
        const { id } = req.params;
        await Teacher.findByIdAndDelete(id);
        //success response
        return successResponse(res, {
            statusCode: 200,
            message: "Teacher Deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}


const handleTeacherAttendance = async(req, res, next) => {
    try {        
        const {id, year, month, day, status} = req.body;
        const teacher = await Teacher.findById(id);

        let isPresented = false;
        teacher?.attendance?.map(presence => {
            if (presence.year === year && presence.month === month && presence.day === day) {
                presence.status = status;
                isPresented = true;
            }
        });

        if (!isPresented) {
            const updates = {
                year,
                month,
                day,
                status
            }
            teacher.attendance.unshift(updates);
        }


        await Teacher.findOneAndUpdate({ _id: id }, teacher);
        return successResponse(res, {
        statusCode: 200,
        message: `Teacher present updated successfully.`,
        payload: true,
        });
  } catch (error) {
    next(error);
  }
}


module.exports = {
    handleCreateTeacher,
    handleGetTeacher,
    handleGetTeacherById,
    handleLoginTeacher,
    handleTeacherLogout,
    handleDeleteTeacherById,
    handlePaySalary,
    handleTeacherAttendance,
}
