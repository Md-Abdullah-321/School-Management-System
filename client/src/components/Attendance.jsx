import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../helper/fetchData";
import { parseDate } from "../helper/parseDate";
import { postStudentPresents } from "../helper/postPresents";

function Attendance() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [yearName, setYearName] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [presents, setPresents] = useState([]);
  const isTeacher = useLocation().pathname.split("/").includes("teacher");

  const handleChange = async (e) => {
    const selectedYearName = e.target.value;
    setYearName(selectedYearName);
    setLoading(true);
    const studentData = await fetchData(
      `https://creepy-duck-glasses.cyclic.app/api/student/get/${selectedYearName}`
    );
    setLoading(false);
    if (studentData.payload.length > 0) {
      setStudents(studentData.payload);
    } else {
      setStudents([]);
    }
  };

  const handleDate = (e) => {
    setCurrentDate(e.target.value);
    const { year, month, day } = parseDate(e.target.value);
    const array = [];
    if (!isTeacher) {
      students.map((student) => {
        const presentData = {};
        presentData.id = student._id;
        presentData.year = year;
        presentData.month = month;
        presentData.day = day;
        presentData.status = "Absent";

        array.push(presentData);
      });
    } else {
      teachers.map((teacher) => {
        const presentData = {};
        presentData.id = teacher._id;
        presentData.year = year;
        presentData.month = month;
        presentData.day = day;
        presentData.status = "Absent";

        array.push(presentData);
      });
    }
    setPresents(array);
  };
  const handleCheckbox = (e, id) => {
    setPresents((prev) => {
      prev.forEach((presentData) => {
        if (e.target.checked) {
          if (presentData.id === id) {
            presentData.status = "Present";
          }
        } else {
          if (presentData.id === id) {
            presentData.status = "Absent";
          }
        }
      });
      return prev;
    });

    console.log(presents);
  };

  const handleSubmit = () => {
    if (!isTeacher) {
      presents.map(async (presentData) => {
        const postedPresent = await postStudentPresents(presentData);
        console.log(postedPresent);
      });
    }
  };

  useEffect(() => {
    if (user.role !== "admin" && !isTeacher) {
      navigate("/admin/attendance");
    }
    const fetchTeacherData = async () => {
      setLoading(true);
      const teacherData = await fetchData(
        `https://creepy-duck-glasses.cyclic.app/api/teacher`
      );
      setLoading(false);
      setTeachers(teacherData.payload);
    };

    if (isTeacher) {
      fetchTeacherData();
    }
  }, [isTeacher]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div>
        {isTeacher ? (
          <h3 className="uppercase text-2xl my-3 font-semibold">
            Teacher <span className="text-yellow-500">Attendance</span>
          </h3>
        ) : (
          <h3 className="uppercase text-2xl my-3 font-semibold">
            Student <span className="text-yellow-500">Attendance</span>
          </h3>
        )}
      </div>
      <div className="w-11/12 sm:w-2/3 flex flex-col justify-center bg-yellow-500 gap-y-2 py-5 px-3 rounded-bl-3xl rounded-sm">
        {!isTeacher && (
          <select
            name="className"
            className=" outline-none px-2 py-1 uppercase text-sm border-none bg-white rounded-sm"
            value={yearName}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select Class</option>
            <option value="Play">Play</option>
            <option value="Narsary">Narsary</option>
            <option value="One">One</option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
            <option value="Four">Four</option>
            <option value="Five">Five</option>
          </select>
        )}

        <input
          type="date"
          name="date"
          className="px-2 rounded-sm outline-none"
          onChange={(e) => handleDate(e)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {!isTeacher && !loading && students?.length < 1 && yearName && (
        <h3 className="mt-5 text-2xl capitalize">
          There is no student in class {yearName}
        </h3>
      )}

      <div className="w-11/12 sm:w-2/3 flex flex-col justify-center gap-y-2 mt-5">
        {!isTeacher && students.length > 0 && (
          <div className="w-full flex flex-col border-2 border-yellow-500 p-2 rounded-sm shadow-sm">
            {/* <div>Data & Total Student & Day & ClassName</div> */}
            <div className="">
              <p className="text-xs sm:text-sm text-gray-800">
                Date: {currentDate}
              </p>
              <p className="text-xs sm:text-sm text-gray-800">
                Class: {yearName}
              </p>
              <p className="text-sm sm:text-md text-gray-900">
                Total Students: {students.length}
              </p>
            </div>
            <div className="w-full mt-2">
              {students.map((stu, index) => {
                return (
                  <div
                    key={index}
                    className={
                      index % 2 !== 0
                        ? "flex justify-between items-center py-1 px-2 rounded-sm"
                        : "flex justify-between items-center bg-yellow-200 py-1 px-2 rounded-sm"
                    }
                  >
                    <h4 className=" capitalize text-gray-800 font-medium">
                      {stu.studentName}
                    </h4>
                    <input
                      type="checkbox"
                      name="checkbox"
                      className="w-4 h-4"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!currentDate && <h4>Please Select a date</h4>}

        {isTeacher && teachers.length > 0 && currentDate && (
          <div className="w-full flex flex-col border-2 border-yellow-500 p-2 rounded-sm shadow-sm mt-2">
            <p className="text-xs sm:text-sm mb-2 text-gray-800">
              Date: {currentDate}
            </p>
            {teachers?.map((teacher, index) => {
              return (
                <div
                  key={index}
                  className={
                    index % 2 !== 0
                      ? "flex justify-between items-center py-1 px-2 rounded-sm"
                      : "flex justify-between items-center bg-yellow-200 py-1 px-2 rounded-sm"
                  }
                >
                  <h4 className=" capitalize text-gray-800">
                    {teacher.firstName + " " + teacher.lastName}
                  </h4>
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="w-4 h-4"
                    onChange={(e) => handleCheckbox(e, teacher._id)}
                  />
                </div>
              );
            })}
          </div>
        )}

        {currentDate && (
          <button
            className="bg-yellow-500 rounded-sm hover:shadow-md uppercase text-sm font-medium p-1"
            onClick={handleSubmit}
          >
            Give Attendance
          </button>
        )}
      </div>
    </div>
  );
}

export default Attendance;
