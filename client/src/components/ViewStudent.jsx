import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewStudent() {
  const id = useParams().id;
  const [student, setStudent] = useState({});

  const fetchTeacher = async () => {
    const res = await fetch(
      `https://creepy-duck-glasses.cyclic.app/api/student/${id}`
    );
    const data = await res.json();
    setStudent({ ...data.payload });
  };
  useEffect(() => {
    fetchTeacher();
  }, []);
  console.log(student);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-11/12 sm:w-1/2 flex flex-col shadow-lg border p-4">
        <div className="flex w-full h-40">
          <img
            src={student.image}
            alt="Profile Picture"
            className="w-40 h-40 shadow-md rounded-md"
          />
        </div>
        <div className="my-2">
          <h1 className="mt-2 text-xl">
            <span>Name: </span>
            {student.studentName}
          </h1>
          <p className="text-xs text-gray-700">
            <span className="font-semibold">Father`s Name: </span>
            {student.fathersName}
          </p>
          <p className="text-xs text-gray-700">
            <span className="font-semibold">Mother`s Name: </span>
            {student.mothersName}
          </p>
          <p className="text-xs text-gray-700">
            <span className="font-semibold">Phone Number: </span>
            {student.phoneNumber}
          </p>
        </div>
        <hr />
        <div>
          <h3 className="text-sm uppercase font-medium">Academic Info:</h3>
          <p className="text-xs">
            <span className="font-medium">Class: </span>
            {student.className}
          </p>
          <p className="text-xs">
            <span className="font-medium">Year: </span>
            {student.admissionDate}
          </p>
          <p className="text-xs">
            <span className="font-medium">Tution Fees: </span>
            {student.tution_fees}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewStudent;
