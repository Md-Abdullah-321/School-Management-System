/*
 * Title: Get Dashboard Details. 
 * Description: Get details to show on dashboard.
 * Author: Md Abdullah
 * Date: 23/01/24
 */

import { formatDateTime } from "./formatDateAndTime";

const months = {
    "January": 0,
    "February": 1,
    "March": 2,
    "April": 3,
    "May": 4,
    "June": 5,
    "July": 6,
    "August": 7,
    "September": 8,
    "October": 9,
    "November": 10,
    "December": 11,
}

const getStudentData = async () => {
    const res = await fetch("https://creepy-duck-glasses.cyclic.app/api/student");
    return await res.json();
}

const getTeacherData = async () => {
    const res = await fetch("https://creepy-duck-glasses.cyclic.app/api/teacher");
    return await res.json();
}

export const getDetails = async () => {
    const students = await getStudentData();
    const teacher = await getTeacherData();


    let DueFees = 0;
    let DuePayments = 0;
    
    students.payload.forEach(student => {
        let totalFees = (parseInt(formatDateTime(student.createdAt).slice(0, 2)) + 1) * student.tution_fees;
        student?.feesHistory?.forEach((tutionFee) => {
            if (tutionFee) {
                totalFees -= student.tution_fees;
            }
        })
        DueFees += totalFees;
    });

    teacher.payload.forEach((teacher) => {
        let totalFees = parseInt(formatDateTime(teacher.createdAt).slice(0, 2)) * teacher.salary;
        teacher.paymentHistory.forEach((payment) => {
            if (payment) {
                totalFees -= teacher.salary;
            }
        })
        DuePayments += totalFees;
    })
    
    return { students, DueFees, DuePayments };
}
