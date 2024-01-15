/*
 * Title: Student Services 
 * Description: handle student services here.
 * Author: Md Abdullah
 * Date: 15/01/24
 */


//Dependencies:


const createStudent = async (Model, studentInfo) => await Model.create(studentInfo);

const getStudentsByClassName = async (Model, className) => await Model.find({ className });

const deletestudent = async (Model, id) => await Model.findByIdAndDelete(id);

const getAllStudents = async (Model) => await Model.find({});

module.exports = {
    createStudent,
    getStudentsByClassName,
    deletestudent,
    getAllStudents,
}