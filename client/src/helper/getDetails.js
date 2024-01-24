/*
 * Title: Get Dashboard Details. 
 * Description: Get details to show on dashboard.
 * Author: Md Abdullah
 * Date: 23/01/24
 */

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
    let ReceivedFees = 0;
    let DuePayments = 0;
    
    let date = new Date();
    students.payload.forEach(student => {
        student.feesHistory.forEach((tutionFee) => {
            if (tutionFee.paid === false) {
                DueFees += student.tution_fees;
            }

            if (months[tutionFee.month] === date.getMonth() && tutionFee.year === date.getFullYear() && tutionFee.paid === true) {
                ReceivedFees += student.tution_fees;
            }
        })
    });

    teacher.payload.forEach((teacher) => {
        if (teacher?.feesHistory?.length > 0) {
            teacher.paymentHistory.forEach((payment) => {
                if (payment.paid === false) {
                    DuePayments += teacher.salary;
                }
        })
        }
    })
    
    return { students, DueFees, ReceivedFees, DuePayments };
}
