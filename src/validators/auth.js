/*
 * Title: Validation 
 * Description: validate Create and Login for Teacher.
 * Author: Md Abdullah
 * Date: 14/01/24
 */


//Dependencies:
const { body } = require("express-validator");

//validate create teacher:
const validateCreateTeacher = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),
    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),
    body("phoneNumber")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required"),
    //Add validation for number lenght
    body("subjects")
        .notEmpty()
        .withMessage("Subjects is required"),
    body("address")
        .notEmpty()
        .withMessage("Address is required"),
    body("picture")
        .trim()
        .notEmpty()
        .withMessage("Teacher image is required"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be minimum 6 character long")
]


//validate login for teacher:
const validateTeacherLogin = [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be minimum 6 character long")
]

module.exports = {
    validateCreateTeacher,
    validateTeacherLogin,
}