import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cart from "../../components/Cart";
import Sidebar from "../../layout/Sidebar";

function Teachers() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const user = useSelector((state) => state.user);

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
    if (!user.firstName) {
      navigate("/admin/login");
    }

    fetchTeacherData();
  }, []);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="p-4 w-full flex flex-col justify-around items-center">
        <h1 className="text-center text-xl sm:text-3xl uppercase">
          Our Honorable Teachers
        </h1>

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

        <div className="w-full flex justify-center items-center mt-5">
          <button
            className="bg-yellow-500 py-1 px-2 w-52 rounded-sm cursor-pointer font-semibold text-sm uppercase hover:shadow-md"
            onClick={handleClick}
          >
            Create New Teacher
          </button>
        </div>
      </div>
    </div>
  );
}

export default Teachers;
