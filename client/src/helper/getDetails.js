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
  try {
    const students = await getStudentData();
    const teachers = await getTeacherData();

    let dueFees = 0;
    let receivedFees = 0;
    let totalExpense = 0;
    let duePayments = 0;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    students.payload.forEach((student) => {
      student.feesHistory.forEach((tuitionFee) => {
        if (!tuitionFee.paid) {
          dueFees += student.tuitionFees;
        }

        if (
          months[tuitionFee.month] === currentMonth &&
          tuitionFee.year === currentYear &&
          tuitionFee.paid
        ) {
          receivedFees += student.tuitionFees;
        }
      });
    });

      console.log(teachers.payload);
      console.log(students.payload);
    //   teachers.payload.map((teacher) => {
    //       console.log(teacher);
    //   })
    // teachers.payload.forEach((teacher) => {
    //   totalExpense += teacher.salary;

    //   if (teacher.paymentHistory.length > 0) {
    //     teacher.paymentHistory.forEach((payment) => {
    //       if (!payment.paid) {
    //         duePayments += teacher.salary;
    //       }
    //     });
    //   }
    // });

    return { students, dueFees, receivedFees, duePayments, totalExpense };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error; // Rethrow the error to be handled elsewhere if needed
  }
};