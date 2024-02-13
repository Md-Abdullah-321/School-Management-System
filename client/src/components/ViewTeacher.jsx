import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DeleteTeacherMoadal from "./DeleteTeacherModal";

function ViewTeacher() {
  const id = useParams().id;
  const [teacher, setTeacher] = useState({});
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchTeacher = async () => {
    const res = await fetch(
      `https://creepy-duck-glasses.cyclic.app/api/teacher/${id}`
    );

    const data = await res.json();
    setTeacher({ ...data.payload });
  };

  const handleNavigate = () => {
    navigate(`/admin/student/pay/${id}`);
  };
  useEffect(() => {
    fetchTeacher();
  }, []);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-11/12 sm:w-1/2 flex flex-col shadow-sm border p-4">
        <div className="flex w-full h-40 justify-between items-start">
          <img
            src={teacher.picture}
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
        <div>
          <h1 className="mt-2">{teacher.firstName + " " + teacher.lastName}</h1>
          <p className="text-xs text-gray-700">{teacher.phoneNumber}</p>
          <p className="text-xs text-gray-700">{teacher.email}</p>
        </div>
        <div className="flex gap-x-2 items-center">
          <span className="text-xs text-gray-800">Lecturer of : </span>
          {teacher.subjects?.map((sub, index) => {
            return (
              <span
                key={index}
                className="text-xs bg-gray-200 p-0.5 rounded-lg text-gray-700"
              >
                {sub}
              </span>
            );
          })}
        </div>

        <div className="mt-5 flex justify-between items-center border text-sm ">
          <p className="text-center w-1/2 border-r p-2">Permanent address: </p>
          <ul className="w-1/2 p-2">
            <li>
              <span className="font-semibold mr-2">Street: </span>
              {teacher?.address?.street}
            </li>
            <li>
              <span className="font-semibold mr-2">City: </span>
              {teacher?.address?.city}
            </li>
            <li>
              {" "}
              <span className="font-semibold mr-2">State: </span>
              {teacher?.address?.state}
            </li>
            <li>
              {" "}
              <span className="font-semibold mr-2">State: </span>
              {teacher?.address?.zip}
            </li>
          </ul>
        </div>
      </div>

      {modal && (
        <DeleteTeacherMoadal
          name={teacher.firstName + " " + teacher.lastName}
          setModal={setModal}
          id={id}
        />
      )}

      <div className="mt-3" onClick={handleNavigate}>
        {user.role === "admin" && (
          <button className="text-xl uppercase bg-yellow-500 px-3 py-1 rounded-sm font-medium">
            Pay Salary
          </button>
        )}
      </div>

      {!teacher.firstName && (
        <div className="w-full">
          <div className="fixed left-0 right-0 top-0 bottom-0 bg-white"></div>
          <div className="fixed text-center font-medium uppercase text-2xl">
            Teacher Not Found with this Id
          </div>
        </div>
      )}

      <div className="w-11/12 sm:w-1/2 flex mt-5 flex-wrap justify-between items-center gap-x-2">
        {teacher?.paymentHistory?.map((salary) => {
          const salaryStyle = salary.paid
            ? "bg-green-500 w-1/2 p-2 text-center font-semibold text-lg"
            : "bg-red-500 w-1/2 p-2 text-center font-semibold text-lg";
          return (
            <div
              key={salary._id}
              className="w-[49%] shadow-sm border p-2 mt-1 flex items-end justify-between"
            >
              <div className="w-1/2 p-2 text-center font-medium text-lg">
                {salary.month.slice(0, 3)} - {salary.year}
              </div>
              <div className={salaryStyle}>{teacher.salary}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewTeacher;
