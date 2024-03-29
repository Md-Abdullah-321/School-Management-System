import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Cart from "../../components/Cart";
import Sidebar from "../../layout/Sidebar";

function Teachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const user = useSelector((state) => state.user);

  const isDashboard = useLocation().pathname.split("/").includes("admin");

  const fetchTeacherData = async () => {
    const res = await fetch(
      "https://creepy-duck-glasses.cyclic.app/api/teacher"
    );

    const data = await res.json();
    setTeachers([...data.payload]);
  };

  const handleClick = () => {
    navigate("/admin/teacher/create");
  };
  useEffect(() => {
    if (!user.firstName && isDashboard) {
      navigate("/admin/login");
    }

    fetchTeacherData();
  }, []);

  return (
    <div className="flex w-full flex-col sm:flex-row h-screen  bg-white">
      {isDashboard && <Sidebar />}
      <div className="p-4 w-full flex flex-col justify-around items-center">
        <h1 className="text-center text-xl sm:text-3xl uppercase font-semibold">
          Our <span className="text-yellow-500">Honorable</span> Teachers
        </h1>

        {user.role === "admin" && (
          <div className="w-full flex justify-center items-center mt-5 md:mt-0">
            <button
              className="bg-yellow-500 py-1 px-2 rounded-sm cursor-pointer font-semibold text-md sm:text-xl uppercase hover:shadow-md"
              onClick={handleClick}
            >
              Create New Teacher
            </button>
          </div>
        )}
        <div className="flex w-full justify-around items-center flex-wrap mt-5 gap-4">
          {teachers?.map((teacher) => {
            return (
              <Cart
                key={teacher._id}
                name={teacher.firstName + " " + teacher.lastName}
                email={teacher.email}
                phoneNumber={teacher.phoneNumber}
                picture={teacher.picture}
                id={teacher._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Teachers;
