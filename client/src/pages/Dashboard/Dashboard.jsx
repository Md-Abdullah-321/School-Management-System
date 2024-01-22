import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PieChart from "../../components/PieChart";
import Sidebar from "../../layout/Sidebar";

function Dashboard() {
  const [chartData, setChartData] = useState({ datasets: [] });
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.firstName) {
      navigate("/admin/login");
    }

    const fetchStudentData = async () => {
      const res = await fetch(
        "https://creepy-duck-glasses.cyclic.app/api/student"
      );
      const studentArray = [0, 0, 0, 0, 0, 0, 0];

      const data = await res.json();
      data.payload.forEach((student) => {
        switch (student.className) {
          case "Play":
            studentArray[0] = studentArray[0] + 1;
            break;
          case "Narsary":
            studentArray[1] = studentArray[1] + 1;
            break;
          case "One":
            studentArray[2] = studentArray[2] + 1;
            break;
          case "Two":
            studentArray[3] = studentArray[3] + 1;
            break;
          case "Three":
            studentArray[4] = studentArray[4] + 1;
            break;
          case "Four":
            studentArray[5] = studentArray[5] + 1;
            break;
          case "Five":
            studentArray[6] = studentArray[6] + 1;
            break;
          default:
            return studentArray;
        }
      });
      setChartData({
        labels: ["Play", "Narsary", "One", "Two", "Three", "Four", "Five"],
        datasets: [
          {
            label: "My First Dataset",
            data: studentArray,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderColor: [],
            borderWidth: 1,
          },
        ],
      });
    };

    fetchStudentData();
  }, []);
  return (
    <div className="flex w-full">
      <Sidebar />

      {/* Dashboard content  */}
      <div className="p-5 w-full">
        {/* chart and small info  */}
        <div className="w-full flex justify-between items-center">
          <div className="w-4/12 h-1/2">
            <PieChart chartData={chartData} />
          </div>
          <div></div>
        </div>

        {/* expense and extra info  */}
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
