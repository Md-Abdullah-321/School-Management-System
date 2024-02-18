import { useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import {
  FaBookReader,
  FaChalkboardTeacher,
  FaCheckCircle,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoInformationCircleOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

function Sidebar() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const location = useLocation();

  const handleToggleBar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const user = useSelector((state) => state.user);
  const highet = toggleSidebar
    ? "flex flex-col h-screen border-r-2 border-gray-100 shadow-md p-2 justify-between mr-5"
    : "flex flex-col  h-16 w-16 p-2 justify-between";
  const className =
    "flex justify-between items-center hover:bg-yellow-400 py-1 px-2";
  const activeClassName =
    "flex justify-between items-center bg-yellow-500 hover:bg-yellow-400 py-1 px-2";
  return (
    <div className={highet}>
      <div className="relative left-3 top-3 cursor-pointer w-10 h-10">
        <GiHamburgerMenu className="text-2xl" onClick={handleToggleBar} />
      </div>
      {toggleSidebar && (
        <div className="p-4 flex flex-col gap-y-2 w-full h-full justify-between">
          <div className="w-full flex flex-col gap-y-2">
            <NavLink
              to="/admin"
              className={
                location.pathname === "/admin" ? activeClassName : className
              }
            >
              <h3>Dashboard</h3>
              <MdOutlineDashboardCustomize className="w-4 h-4 font-light" />
            </NavLink>
            <NavLink
              to="/admin/teacher"
              className={
                location.pathname === "/admin/teacher"
                  ? activeClassName
                  : className
              }
            >
              <h3>Teachers</h3>
              <FaChalkboardTeacher className="w-4 h-4 font-light" />
            </NavLink>
            <NavLink
              to="/admin/classes"
              className={
                location.pathname === "/admin/classes"
                  ? activeClassName
                  : className
              }
            >
              <h3>Students</h3>
              <FaBookReader className="w-4 h-4 font-light" />
            </NavLink>
            <NavLink
              to="/admin/notice"
              className={
                location.pathname === "/admin/notice"
                  ? activeClassName
                  : className
              }
            >
              <h3>Notice</h3>
              <IoInformationCircleOutline className="w-4 h-4 font-light" />
            </NavLink>
            <NavLink
              to="/admin/attendance"
              className={
                location.pathname === "/admin/attendance"
                  ? activeClassName
                  : className
              }
            >
              <h3>Attendance</h3>
              <FaCheckCircle className="w-4 h-4" />
            </NavLink>
            <NavLink
              to="/admin/messages"
              className={
                location.pathname === "/admin/messages"
                  ? activeClassName
                  : className
              }
            >
              <h3>Messages</h3>
              <BiMessageDetail className="w-4 h-4 font-light" />
            </NavLink>
            <NavLink
              to="/admin/settings"
              className={
                location.pathname === "/admin/settings"
                  ? activeClassName
                  : className
              }
            >
              <h3>Settings</h3>
              <IoSettingsOutline className="w-4 h-4" />
            </NavLink>
          </div>

          {/* User profile  */}
          <div className="flex justify-between items-center bg-gray-100 p-2 gap-2">
            <div className="w-10 h-10">
              <img
                src={user.picture}
                className="w-full h-full rounded-full"
                alt="user image"
              />
            </div>
            <div>
              <h2 className="text-md font-semibold">
                {user.firstName + " " + user.lastName}
              </h2>
              <p className="text-xs text-gray-700">{user.email}</p>
            </div>
            <NavLink className="cursor-pointer" to="/admin/profile">
              <RiArrowRightSLine className="w-6 h-6 bg-gray-200 rounded-full" />
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
