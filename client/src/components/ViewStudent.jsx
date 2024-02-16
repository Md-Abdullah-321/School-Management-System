import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function ViewStudent() {
  const id = useParams().id;
  const [student, setStudent] = useState({});
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handlePayFees = () => {
    navigate(`/admin/student/pay/${id}`);
  };

  const fetchStudent = async () => {
    const res = await fetch(
      `https://creepy-duck-glasses.cyclic.app/api/student/${id}`
    );
    const data = await res.json();
    setStudent({ ...data.payload });
  };
  useEffect(() => {
    fetchStudent();
  }, []);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 sm:w-1/2 flex flex-col shadow-sm border p-4">
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

      <div className="mt-3">
        {user.role === "admin" && (
          <button
            className="text-xl uppercase bg-yellow-500 px-3 py-1 rounded-sm font-medium"
            onClick={handlePayFees}
          >
            Pay Tution Fee
          </button>
        )}
      </div>
      <div className="w-11/12 sm:w-1/2 mt-3">
        <h3 className="uppercase font-medium">Tution Fees:</h3>
        <div className="flex  flex-wrap justify-between items-center gap-x-2">
          {student?.feesHistory?.map((fees) => {
            return (
              <div
                key={fees._id}
                className="w-[49%] shadow-sm border mt-1 flex items-end justify-between"
              >
                <div className="w-1/2 p-2 text-center font-medium text-lg">
                  {fees.month.slice(0, 3)} - {fees.year}
                </div>
                <div className="bg-yellow-500 w-1/2 p-2 text-center font-semibold text-lg">
                  {student.tution_fees}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewStudent;
