import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setHomeInfo } from "../features/homeSlice";

function Navbar() {
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/home"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const { name, logo, backgroundImage } = data.payload["0"];
      dispatch(setHomeInfo({ name, logo, backgroundImage }));
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const Logo = useSelector((state) => state.home.logo);
  return (
    <div className="w-full md:h-20 flex justify-around items-center">
      <div>
        <img
          className="w-16 h-16 shadow-md rounded-full"
          src={Logo}
          alt="Logo Loading..."
        />
      </div>
      <div>
        <nav className="flex flex-col md:flex-row gap-4">
          <NavLink className="font-semibold hover:text-yellow-500" to="/">
            HOME
          </NavLink>
          <NavLink className="font-semibold hover:text-yellow-500" to="/about">
            ABOUT
          </NavLink>
          <NavLink
            className="font-semibold hover:text-yellow-500"
            to="department"
          >
            DEPARTMENT
          </NavLink>
          <NavLink className="font-semibold hover:text-yellow-500" to="gallery">
            GALLERY
          </NavLink>
          <NavLink className="font-semibold hover:text-yellow-500" to="contact">
            CONTACT US
          </NavLink>
        </nav>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar;
