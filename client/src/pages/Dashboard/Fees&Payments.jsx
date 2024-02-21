import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Studying from "../../../public/studying.svg";
import Teaching from "../../../public/teaching.svg";
import Sidebar from "../../layout/Sidebar";

function FeesAndPayments() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.firstName) {
      navigate("/admin/login");
    }
  }, []);

  const handleClick = (option) => {
    if (option === "teacher") {
      navigate("/admin/teacher/attendance");
    } else {
      navigate("/admin/student/attendance");
    }
  };
  return (
    <div className="flex flex-col sm:flex-row w-full sm:h-screen">
      <Sidebar />
      <div className="p-5 flex flex-col sm:flex-row justify-between items-center w-full h-screen gap-5">
        <div
          className="w-full sm:w-1/2 h-1/2"
          style={{
            backgroundImage: `url(${Teaching})`,
            backgroundSize: "cover",
          }}
        >
          <div className=" bg-yellow-500 p-2 rounded-md flex justify-center items-center opacity-85 w-full h-full">
            <button
              className="uppercase bg-green-500 px-3 py-1 font-medium cursor-pointer rounded-sm hover:shadow-md"
              onClick={() => handleClick("teacher")}
            >
              Teacher Attendance
            </button>
          </div>
        </div>
        <div
          className="w-full sm:w-1/2 h-1/2"
          style={{
            backgroundImage: `url(${Studying})`,
            backgroundSize: "cover",
          }}
        >
          <div className="w-full h-full bg-green-500 p-2 rounded-md flex justify-center items-center opacity-85">
            <button
              className="uppercase bg-yellow-500 px-3 py-1 font-medium cursor-pointer rounded-sm hover:shadow-md"
              onClick={handleClick}
            >
              Student Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeesAndPayments;
