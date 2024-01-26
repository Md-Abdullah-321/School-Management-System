import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StudentCart from "../../components/StudentCart";
import Sidebar from "../../layout/Sidebar";

function Classes() {
  const [students, setStudents] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchStudents = async () => {
    const res = await fetch(
      "https://creepy-duck-glasses.cyclic.app/api/student"
    );

    const data = await res.json();
    const organizedStudentInfo = {
      Play: [],
      Narsary: [],
      One: [],
      Two: [],
      Three: [],
      Four: [],
      Five: [],
    };

    data.payload.forEach((singleStudent) => {
      switch (singleStudent.className) {
        case "Play":
          organizedStudentInfo.Play.push(singleStudent);
          break;
        case "Narsary":
          organizedStudentInfo.Narsary.push(singleStudent);
          break;
        case "One":
          organizedStudentInfo.One.push(singleStudent);
          break;
        case "Two":
          organizedStudentInfo.Two.push(singleStudent);
          break;
        case "Three":
          organizedStudentInfo.Three.push(singleStudent);
          break;
        case "Four":
          organizedStudentInfo.Four.push(singleStudent);
          break;
        case "Five":
          organizedStudentInfo.Five.push(singleStudent);
          break;
      }
    });
    setStudents({ ...organizedStudentInfo });
  };

  const handleClick = () => {
    navigate("/admin/student/create");
  };
  useEffect(() => {
    if (!user.firstName) {
      navigate("/admin/login");
    }
    fetchStudents();
  }, []);
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="p-4 w-full">
        <h1 className="text-center text-3xl uppercase font-semibold">
          Our <span className="text-amber-500">Students</span>
        </h1>
        {Object.keys(students).map((year) => {
          return (
            <div
              key={year}
              className={
                year.length > 0 &&
                "w-full mt-2 flex flex-wrap justify-between items-center"
              }
            >
              {students[year]?.map((stu) => (
                <StudentCart
                  key={stu._id}
                  id={stu._id}
                  name={stu.studentName}
                  phoneNumber={stu.phoneNumber}
                  className={stu.className}
                  picture={stu?.image}
                />
              ))}
            </div>
          );
        })}
        {user.role === "admin" && (
          <div className="w-full flex justify-center items-center mt-5">
            <button
              className="bg-yellow-500 py-1 px-2 w-52 rounded-sm cursor-pointer font-semibold text-sm uppercase hover:shadow-md"
              onClick={handleClick}
            >
              Create New Student
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Classes;
