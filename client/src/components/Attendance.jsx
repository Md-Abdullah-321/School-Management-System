import { useLocation } from "react-router-dom";

function Attendance() {
  const isTeacher = useLocation().pathname.split("/").includes("teacher");
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div>
        {isTeacher ? (
          <h3 className="uppercase">Teacher Attendance</h3>
        ) : (
          <h3 className="uppercase">Student Attendance</h3>
        )}
      </div>
    </div>
  );
}

export default Attendance;
