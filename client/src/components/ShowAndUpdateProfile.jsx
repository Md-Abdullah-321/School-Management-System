import { useSelector } from "react-redux";
import Sidebar from "../layout/Sidebar";

function ShowAndUpdateProfile() {
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/teacher/sign-out",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      alert(data.messege);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row w-full h-screen">
      <Sidebar />
      <div className="flex justify-center items-center w-full h-full p-2">
        <div className="w-full sm:w-2/3 bg-slate-100 opacity-90 p-2 shadow-lg rounded-md">
          <div className="border-b-2 border-white py-2 w-full h-full">
            <div className="flex justify-between items-start">
              <img
                src={user.picture}
                alt="User Photo"
                className="w-36 h-36 rounded-md shadow-sm"
              />
              <button
                onClick={handleLogout}
                className="bg-green-500 px-1 py-0.5 text-xs font-medium uppercase"
              >
                Logout
              </button>
            </div>
            <h3 className="text-lg mt-3 font-medium">
              {user.firstName + " " + user.lastName}
            </h3>

            <div className="text-xs lowercase text-gray-600">
              <p>
                <span className="capitalize font-semibold">PhoneNumber: </span>
                {user.phoneNumber}
              </p>
              <p>
                <span className="capitalize font-semibold">Email: </span>
                {user.email}
              </p>
              <p className="mt-1">
                {user.subjects.map((sub, index) => (
                  <span
                    className=" capitalize bg-gray-400 mr-1 p-0.5 text-white font-semibold rounded-lg"
                    key={index}
                  >
                    {sub}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="text-xs">
            <div>
              <p className="font-medium">Address: </p>
              <div className="ml-5">
                <p>
                  <span className="font-medium">Street:</span>{" "}
                  {user?.address?.street}
                </p>
                <p>
                  <span className="font-medium">City:</span>{" "}
                  {user?.address?.city}
                </p>

                <p>
                  <span className="font-medium">State:</span>{" "}
                  {user?.address?.state}
                </p>
                <p>
                  <span className="font-medium">Zip:</span> {user?.address?.zip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowAndUpdateProfile;
