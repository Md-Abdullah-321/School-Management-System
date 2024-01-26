import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function StudentCart({ id, name, phoneNumber, className, picture }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/admin/student/${id}`);
  };
  return (
    <div className="bg-amber-500 w-56 sm:w-48 h-60 shadow-lg rounded-sm rounded-bl-3xl">
      <div className="w-full h-4/6 bg-white flex justify-center items-center">
        <img
          src={picture}
          alt="Profile Picture"
          className="w-20 h-20 border border-green-500 shadow-md rounded-full object-cover self-center"
        />
      </div>
      <div className="px-1">
        <p className="text-sm uppercase font-medium text-gray-800">
          <span className="">Name: </span>
          {name}
        </p>
        <p className="text-xs text-gray-800">
          <span className="text-md font-semibold">Phone: </span>
          {phoneNumber}
        </p>
        <p className="text-xs text-gray-800">
          <span className="font-semibold">Class: </span>
          {className}
        </p>
      </div>
      <button
        className="text-xs cursor-pointer uppercase bg-green-500 p-1.5 rounded-bl-3xl font-semibold hover:shadow-lg"
        onClick={() => handleClick(id)}
      >
        View Details
      </button>
    </div>
  );
}

export default StudentCart;
