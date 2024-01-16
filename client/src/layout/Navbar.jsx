import { useEffect } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/home"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data:", data);

      // Handle the fetched data as needed
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full h-16 bg-slate-300 flex justify-around items-center">
      <div></div>
      <div>
        <nav className="flex gap-4">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/about">ABOUT</NavLink>
          <NavLink to="department">DEPARTMENT</NavLink>
          <NavLink to="gallery">GALLERY</NavLink>
          <NavLink to="contact">CONTACT US</NavLink>
        </nav>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar;
