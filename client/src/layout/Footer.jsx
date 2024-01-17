import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="w-full h-40 bg-yellow-500 p-5 flex flex-col justify-center items-center">
      <nav className="flex justify-center gap-4">
        <NavLink
          className="font-semibold hover:text-white text-sm sm:text-lg"
          to="/"
        >
          HOME
        </NavLink>
        <NavLink
          className="font-semibold hover:text-white text-sm sm:text-lg"
          to="/about"
        >
          ABOUT
        </NavLink>
        <NavLink
          className="font-semibold hover:text-white text-sm sm:text-lg"
          to="department"
        >
          DEPARTMENT
        </NavLink>
        <NavLink
          className="font-semibold hover:text-white text-sm sm:text-lg"
          to="gallery"
        >
          GALLERY
        </NavLink>
        <NavLink
          className="font-semibold hover:text-white text-sm sm:text-lg"
          to="contact"
        >
          CONTACT US
        </NavLink>
      </nav>
      {/* icons */}
      <div className="flex justify-center items-center gap-5 p-2">
        <NavLink>
          <FaFacebook className="w-8 h-8 bg-white p-1 rounded-full" />
        </NavLink>
        <NavLink>
          <AiFillTwitterCircle className="w-8 h-8 bg-white p-1 rounded-full" />
        </NavLink>
        <NavLink>
          <FaLinkedinIn className="w-8 h-8 bg-white p-1 rounded-full" />
        </NavLink>
      </div>
      <p className="text-center">
        © {new Date().getFullYear()} Md Abdullah, Inc. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
