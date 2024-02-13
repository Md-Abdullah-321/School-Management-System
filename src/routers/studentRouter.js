/*
 * Title:  
 * Description: 
 * Author: Md Abdullah
 * Date: 11/20/23
 */


//Dependencies:
const express = require("express");
const { handleCreateStudent, handleGetStudentsByClassName, handleDeleteStudent, handleGetStudents, handleGetPayment, handleUpdateStudentInfo, handleGetStudentById } = require("../controllers/studentController");
const { validateCreateStudent } = require("../validators/auth");
const runValidation = require("../validators");
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const studentRouter = express.Router();

// POST -> get payment by id:
studentRouter.post("/payment/:id",isLoggedIn,isAdmin, handleGetPayment);

// POST -> update student by id:
studentRouter.post("/update/:id", handleUpdateStudentInfo);

// POST -> create student :
studentRouter.post("/", validateCreateStudent, runValidation, handleCreateStudent);

// GET -> delete students by id :
studentRouter.get("/:id", handleGetStudentById);

// GET -> get students by className :
studentRouter.get("/get/:className", handleGetStudentsByClassName);

// GET -> delete students by id :
studentRouter.delete("/:id", handleDeleteStudent);


// GET -> delete students by id :
studentRouter.get("/", handleGetStudents);






module.exports = studentRouter;