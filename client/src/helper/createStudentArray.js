export const createStudentArry = (data, studentArray) => {
     data.payload.forEach((student) => {
        switch (student.className) {
          case "Play":
            studentArray[0] = studentArray[0] + 1;
            break;
          case "Narsary":
            studentArray[1] = studentArray[1] + 1;
            break;
          case "One":
            studentArray[2] = studentArray[2] + 1;
            break;
          case "Two":
            studentArray[3] = studentArray[3] + 1;
            break;
          case "Three":
            studentArray[4] = studentArray[4] + 1;
            break;
          case "Four":
            studentArray[5] = studentArray[5] + 1;
            break;
          case "Five":
            studentArray[6] = studentArray[6] + 1;
            break;
          default:
            return studentArray;
        }
     });
    
    return studentArray;
}