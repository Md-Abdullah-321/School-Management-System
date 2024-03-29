import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import ViewStudentAttendence from "./ViewStudentAttendence";
import ViewStudentStatement from "./ViewStudentStatement";

function ViewStudent() {
  const id = useParams().id;
  const [student, setStudent] = useState({});
  const [modal, setModal] = useState(false);
  const [toggleTutionFeesAndAttendence, setToggleTutionFeesAndAttendence] =
    useState(true);
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

  const handleClick = (option) => {
    if (option === "attendence") {
      setToggleTutionFeesAndAttendence(true);
    } else {
      setToggleTutionFeesAndAttendence(false);
    }
  };
  useEffect(() => {
    fetchStudent();
  }, []);
  return (
    <div className="w-full flex flex-col justify-center items-center my-10">
      <div className="w-11/12 sm:w-1/2 flex flex-col shadow-sm border p-4">
        <div className="flex justify-between items-start w-full">
          <img
            src={student.image}
            alt="Profile Picture"
            className="w-40 h-40 shadow-md rounded-md"
          />

          {user.role === "admin" && (
            <button
              className="bg-red-500 py-0.5 px-1 rounded-md hover:shadow-xl text-sm uppercase font-medium text-white"
              onClick={() => setModal(true)}
            >
              Delete
            </button>
          )}
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

      {modal && (
        <DeleteModal name={student.studentName} setModal={setModal} id={id} />
      )}

      <div className="w-11/12 sm:w-1/2 shadow-sm border p-4 mt-5 mx-auto">
        <div className="w-full flex justify-around text-center">
          <div
            onClick={() => handleClick("attendence")}
            className={
              toggleTutionFeesAndAttendence
                ? "w-1/2 bg-gray-300 p-2 shadow-sm hover:bg-gray-200"
                : "w-1/2 p-2 cursor-pointer"
            }
          >
            Attendence
          </div>
          <div
            onClick={() => handleClick("tution_fees")}
            className={
              !toggleTutionFeesAndAttendence
                ? "w-1/2 bg-gray-300 p-2 shadow-sm hover:bg-gray-200"
                : "w-1/2 p-2 cursor-pointer"
            }
          >
            Tution Fees
          </div>
        </div>

        {toggleTutionFeesAndAttendence && (
          <ViewStudentAttendence student={student} />
        )}

        {!toggleTutionFeesAndAttendence && (
          <ViewStudentStatement
            user={user}
            handlePayFees={handlePayFees}
            student={student}
          />
        )}
      </div>
    </div>
  );
}

export default ViewStudent;
