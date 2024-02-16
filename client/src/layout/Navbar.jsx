import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setHomeInfo } from "../features/homeSlice";

function Navbar() {
  const dispatch = useDispatch();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [toggleNavbar, setToggleNavbar] = useState(window.innerWidth > 650);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      if (window.innerWidth > 650) {
        setToggleNavbar(true);
      } else {
        setToggleNavbar(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/site"
      );

      const data = await response.json();

      if (data.success) {
        const { siteInfo, location, gallery, notice, utility, reserve } =
          data.payload["0"];

        dispatch(
          setHomeInfo({ siteInfo, location, gallery, notice, utility, reserve })
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleToggleMenu = () => {
    setToggleNavbar(!toggleNavbar);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { logo } = useSelector((state) => state?.sitesettingsinfo?.siteInfo);

  return (
    <div className="w-full min-h-16 sm:h-20 flex md:justify-center md:items-center p-5">
      {window.innerWidth < 650 && (
        <div className="w-1/6">
          <GiHamburgerMenu
            className="cursor-pointer w-6 h-6"
            onClick={handleToggleMenu}
          />
        </div>
      )}
      <div className="w-full flex sm:justify-center md:justify-around items-center">
        {screenSize > 767 && (
          <div className="sm:w-1/6 flex justify-center items-center">
            {logo && (
              <img
                className="w-16 h-16 shadow-md rounded-full"
                src={logo}
                alt="Logo Loading..."
              />
            )}
          </div>
        )}

        {toggleNavbar && (
          <div className="w-full sm:w-5/6 md:w-4/6 lg:w-3/6">
            <nav className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-center justify-center">
              <NavLink
                className="font-semibold text-end w-full sm:w-auto sm:text-center 
                bg-yellow-500
                sm:bg-white
                hover:bg-yellow-400 sm:hover:bg-white sm:hover:text-yellow-500 px-2 sm:px-0 rounded-sm sm:rounded-none"
                to="/"
              >
                HOME
              </NavLink>
              <NavLink
                className="font-semibold text-end w-full sm:w-auto sm:text-center hover:bg-yellow-200 sm:hover:bg-white sm:hover:text-yellow-500 px-2 sm:px-0 rounded-sm sm:rounded-none"
                to="/about"
              >
                ABOUT
              </NavLink>
              <NavLink
                className="font-semibold text-end w-full sm:w-auto sm:text-center hover:bg-yellow-200 sm:hover:bg-white sm:hover:text-yellow-500 px-2 sm:px-0 rounded-sm sm:rounded-none"
                to="department"
              >
                DEPARTMENT
              </NavLink>
              <NavLink
                className="font-semibold text-end w-full sm:w-auto sm:text-center hover:bg-yellow-200 sm:hover:bg-white sm:hover:text-yellow-500 px-2 sm:px-0 rounded-sm sm:rounded-none"
                to="gallery"
              >
                GALLERY
              </NavLink>
              <NavLink
                className="font-semibold text-end w-full sm:w-auto sm:text-center hover:bg-yellow-200 sm:hover:bg-white sm:hover:text-yellow-500 px-2 sm:px-0 rounded-sm sm:rounded-none"
                to="contact"
              >
                CONTACT
              </NavLink>
            </nav>
          </div>
        )}
        {/* {screenSize > 767 && <div className="sm:w-1/6"></div>} */}
      </div>
    </div>
  );
}

export default Navbar;
