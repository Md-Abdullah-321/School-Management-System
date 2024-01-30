import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddNewMemory from "../../components/UpdateGallery";
import UpdateLocationInfo from "../../components/UpdateLocationInfo";
import UpdateSiteInfo from "../../components/UpdateSiteInfo";
import Sidebar from "../../layout/Sidebar";

function Settings() {
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
      <div className="sm:p-5 w-full flex flex-col justify-start items-center mt-5">
        <UpdateSiteInfo />
        <UpdateLocationInfo />
        <AddNewMemory />
      </div>
    </div>
  );
}

export default Settings;
