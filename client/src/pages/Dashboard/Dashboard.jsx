import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PieChart from "../../components/PieChart";
import { createStudentArry } from "../../helper/createStudentArray";
import Sidebar from "../../layout/Sidebar";

function Dashboard() {
  const [chartData, setChartData] = useState({ datasets: [] });
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const fetchStudentData = async () => {
    const res = await fetch(
      "https://creepy-duck-glasses.cyclic.app/api/student"
    );
    const studentArray = [0, 0, 0, 0, 0, 0, 0];

    const data = await res.json();
    createStudentArry(data, studentArray);
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

  useEffect(() => {
    if (!user.firstName) {
      navigate("/admin/login");
    }
    fetchStudentData();
  }, []);
  return (
    <div className="flex w-full">
      <Sidebar />

      {/* Dashboard content  */}
      <div className="p-5 w-full h-screen">
        {/* chart and small info  */}
        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-center sm:h-1/2">
          <div className="sm:w-4/12 border flex justify-center items-center h-full">
            <PieChart chartData={chartData} />
          </div>
          <div className="flex flex-col sm:w-7/12 gap-4 border h-full justify-center items-center">
            <div className="w-full flex justify-around">
              {/* Due and Recived fees  */}
              <div className="w-1/3 bg-slate-400">Due Fees</div>
              <div className="w-1/3 bg-slate-400">Received Fees</div>
            </div>
            <div className="w-full flex justify-around">
              {/* Total Expenses and Due Payments  */}
              <div className="w-1/3 bg-slate-400">Total Expense</div>
              <div className="w-1/3 bg-slate-400">Due Payments</div>
            </div>
            <div className="w-full flex justify-around">
              {/* Profit  */}
              <div className="w-2/3 bg-slate-400">Profit</div>
            </div>
          </div>
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
