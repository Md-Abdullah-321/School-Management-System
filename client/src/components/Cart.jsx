import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function Cart({ id, name, email, phoneNumber, picture }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/admin/teacher/${id}`);
  };
  return (
    <div className="bg-green-500 w-48 h-60 shadow-lg rounded-tr-3xl rounded-bl-3xl">
      <div className="w-full h-4/6 bg-white flex justify-center items-center">
        <img
          src={picture}
          alt="Profile Picture"
          className="w-20 h-20 border border-yellow-500 shadow-md rounded-full"
        />
      </div>
      <div className="px-1">
        <p className="text-sm">
          <span className="font-semibold">Name: </span>
          {name}
        </p>
        <p className="text-xs text-gray-800">
          <span className="text-md font-semibold">Email: </span>
          {email}
        </p>
        <p className="text-xs text-gray-800">
          <span className="font-semibold">Phone: </span>
          {phoneNumber}
        </p>
      </div>
      <button
        className="text-xs cursor-pointer uppercase bg-yellow-500 p-1.5 rounded-bl-3xl font-semibold hover:shadow-lg"
        onClick={() => handleClick(id)}
      >
        View Details
      </button>
    </div>
  );
}

export default Cart;
