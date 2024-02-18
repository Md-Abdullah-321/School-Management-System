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
  return (
    <div className="flex flex-col sm:flex-row w-full sm:h-screen">
      <Sidebar />
      <div className="p-5 flex flex-col sm:flex-row justify-between items-center w-full sm:h-screen">
        <div className="w-1/2">
          <div className="w-11/12 h-80 bg-yellow-500 p-2 rounded-md flex justify-center items-center">
            <img src={Teaching} className="w-full h-full opacity-90" />
            <button className="fixed uppercase bg-green-500 px-3 py-1 font-medium cursor-pointer rounded-sm hover:shadow-md">
              Teacher Attendance
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <div className="w-11/12 h-80 bg-green-500 p-2 rounded-md flex justify-center items-center">
            <img src={Studying} className="w-full h-full opacity-90" />
            <button className="fixed uppercase bg-yellow-500 px-3 py-1 font-medium cursor-pointer rounded-sm hover:shadow-md">
              Student Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeesAndPayments;
