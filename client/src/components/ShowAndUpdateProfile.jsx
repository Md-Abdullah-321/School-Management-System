import { useSelector } from "react-redux";
import Sidebar from "../layout/Sidebar";

function ShowAndUpdateProfile() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="flex flex-col sm:flex-row w-full h-screen">
      <Sidebar />
      <div className="flex justify-center items-center w-full h-full p-2">
        <div className="w-full sm:w-2/3 bg-slate-200 opacity-90 h-1/3 p-2 shadow-lg rounded-md">
          <div className="border-b-2 border-white py-2 ">
            <img src={user.picture} alt="User Photo" />
            <h3 className="text-lg">{user.firstName + " " + user.lastName}</h3>

            <div className="text-xs lowercase text-gray-600">
              <p>
                <span className="capitalize font-semibold">PhoneNumber: </span>
                {user.phoneNumber}
              </p>
              <p>
                <span className="capitalize font-semibold">Email: </span>
                {user.email}
              </p>
            </div>
          </div>

          {/* <div className="text-xs">
            <p>
              <span className="">Address: </span>
              City: {user.address.city}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ShowAndUpdateProfile;
