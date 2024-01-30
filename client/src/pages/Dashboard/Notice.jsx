import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layout/Sidebar";

function Notice() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.firstName) {
      navigate("/admin/login");
    }
  }, []);
  return (
    <div className="flex flex-col sm:flex-row w-full">
      <Sidebar />
      <div className="flex w-full min-h-screen flex-col p-5">
        <div>PDF</div>
      </div>
    </div>
  );
}

export default Notice;
