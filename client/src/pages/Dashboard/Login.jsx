import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const init = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState({ ...init });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email && formData.password) {
      try {
        const res = await fetch(
          "https://creepy-duck-glasses.cyclic.app/api/teacher/sign-in",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await res.json();
        if (data.success) {
          setFormData({ ...init });
          //   navigate("/admin");
          console.log(data);
        }
        alert(data.messege);
      } catch (error) {
        console.log(error);
        alert("Could not Login");
      }
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 p-5 bg-white shadow-lg">
        <h1 className="text-3xl font-semibold text-center uppercase my-5">
          Log as Admin
        </h1>

        <form
          method="post"
          className="flex flex-col gap-1"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            placeholder="Email"
            className="p-1 font-semibold outline-none bg-gray-100 rounded-sm shadow-md"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            placeholder="Password"
            className="p-1 font-semibold outline-none bg-gray-100 rounded-sm shadow-md"
          />

          <button className="text-md uppercase bg-yellow-500 mt-1 p-1 rounded-sm shadow-md cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
