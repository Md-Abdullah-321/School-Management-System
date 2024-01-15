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

const validateCreateStudent = [
    body('studentName')
        .notEmpty()
        .withMessage('Student name is required.'),
    body('fathersName')
        .notEmpty()
        .withMessage('Father\'s name is required.'),
    body('mothersName')
        .notEmpty()
        .withMessage('Mother\'s name is required.'),
    body('phoneNumber')
        .matches(/^(?:\+88|88)?(01[3-9]\d{8})$/)
        .withMessage('Please enter a valid Bangladeshi phone number.'),
    body('address')
        .notEmpty()
        .withMessage("Address is required"),
    body('dateOfBirth')
        .isISO8601()
        .withMessage('Invalid date of birth.'),
    body('className')
        .notEmpty()
        .withMessage('Class name is required.'),
    body('admissionDate')
        .notEmpty()
        .withMessage("Admission year is required")
        .isInt()
        .withMessage('Invalid admission year.'),
    body('image').optional(), 
];

module.exports = {
    validateCreateTeacher,
    validateTeacherLogin,
    validateCreateStudent,
}