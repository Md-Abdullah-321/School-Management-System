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
    <div className="flex flex-col sm:flex-row w-full">
      <Sidebar />
      <div className="w-full py-5">
        <h1 className="text-center text-3xl uppercase font-semibold">
          Our <span className="text-amber-500">Students</span>
        </h1>
        {user.role === "admin" && (
          <div className="w-full flex justify-center items-center mt-5">
            <button
              className="bg-yellow-500 py-1 px-2 rounded-sm cursor-pointer font-semibold text-md sm:text-lg uppercase hover:shadow-md"
              onClick={handleClick}
            >
              Create New Student
            </button>
          </div>
        )}
        {Object.keys(students).map((year) => {
          return (
            <div key={year}>
              <h3 className="bg-green-500 w-20 text-center mt-3 mb-1 uppercase text-sm font-medium text-white shadow-md rounded-sm">
                {students[year].length > 0 && year}
              </h3>
              <div
                className={
                  students[year].length > 0 &&
                  "w-full flex flex-wrap gap-4 items-center justify-center sm:justify-start"
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Classes;
