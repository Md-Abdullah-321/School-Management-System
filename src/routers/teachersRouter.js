/*
 * Title: Teacher's Router 
 * Description: Handle All teacher's router
 * Author: Md Abdullah
 * Date: 11/01/24
 */

//dependencies:
const express = require("express");
const {handleCreateTeacher, handleGetTeacher, handleGetTeacherById } = require("../controllers/teacherController");
const teachersRouter = express.Router();

//PUT -> Create teacher
teachersRouter.post("/", handleCreateTeacher);

//GET -> get all teachers
teachersRouter.get("/", handleGetTeacher);

//GET -> get teacher by id
teachersRouter.get("/:id", handleGetTeacherById);



module.exports = teachersRouter;