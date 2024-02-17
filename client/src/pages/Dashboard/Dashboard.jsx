import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Messages from "../../components/Messages";
import PieChart from "../../components/PieChart";
import { setHomeInfo } from "../../features/homeSlice";
import { createStudentArry } from "../../helper/createStudentArray";
import { getDetails } from "../../helper/getDetails";
import Sidebar from "../../layout/Sidebar";

function Dashboard() {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [basicInfo, setBasicInfo] = useState({
    DueFees: 0,
    reserve: 0,
    TotalExpense: 0,
    DuePayments: 0,
    Profit: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { utility, reserve } = useSelector((state) => state.sitesettingsinfo);

  let utility_bills = 0;
  utility.forEach((util) => {
    if (util.paid === false) {
      utility_bills += util.amount;
    }
  });
  const fetchStudentData = async () => {
    const { students, DueFees, DuePayments } = await getDetails();

    setBasicInfo({
      DueFees,
      reserve,
      DuePayments,
      TotalExpense: DuePayments + utility_bills,
      Profit: DueFees + reserve - (DuePayments + utility_bills),
    });
    const studentArray = [0, 0, 0, 0, 0, 0, 0];

    createStudentArry(students, studentArray);
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
          setHomeInfo({
            siteInfo,
            location,
            gallery,
            notice,
            utility,
            reserve,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (!user.firstName) {
      navigate("/admin/login");
    }
    fetchData();
    fetchStudentData();
  }, []);
  return (
    <div className="flex flex-col sm:flex-row w-full">
      <Sidebar />

      {/* Dashboard content  */}
      <div className="p-4 w-full sm:h-screen">
        {/* chart and small info  */}
        <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 items-center sm:h-1/2">
          <div className="w-full p-4 sm:w-4/12 border flex justify-center items-center sm:h-full rounded-md">
            <PieChart chartData={chartData} />
          </div>
          <div className="flex flex-col w-full p-2 sm:p-0 sm:w-7/12 gap-2 sm:gap-4 border h-full justify-center items-center rounded-md">
            <div className="w-full flex flex-col sm:flex-row justify-around items-center">
              {/* Due and Recived fees  */}
              <div className="w-full sm:w-1/3 flex justify-between items-center shadow-md">
                <div className="bg-red-500 w-1/2 h-full text-center p-2 text-lg font-semibold">
                  {basicInfo.DueFees}
                </div>
                <div className="text-center p-2 w-1/2 font-semibold text-xs uppercase">
                  Due Fees
                </div>
              </div>
              <div className="w-full sm:w-1/3 flex justify-between items-center shadow-md">
                <div className="bg-green-500 w-1/2 h-full text-center p-2 text-lg font-semibold">
                  {basicInfo.reserve}
                </div>
                <div className="text-center p-2 w-1/2 font-semibold text-xs uppercase">
                  Reserve Fees
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-around items-center">
              {/* Total Expenses and Due Payments  */}
              <div className="w-full sm:w-1/3 flex justify-between items-center shadow-md">
                <div className="bg-yellow-500 w-1/2 h-full text-center p-2 text-lg font-semibold">
                  {basicInfo.TotalExpense}
                </div>
                <div className="text-center p-2 w-1/2 font-semibold text-xs uppercase">
                  Total Expense
                </div>
              </div>
              <div className="w-full sm:w-1/3 flex justify-between items-center shadow-md">
                <div className="bg-blue-500 w-1/2 h-full text-center p-2 text-lg font-semibold">
                  {basicInfo.DuePayments}
                </div>
                <div className="text-center p-2 w-1/2 font-semibold text-xs uppercase">
                  Due Payments
                </div>
              </div>
            </div>
            <div className="w-full flex justify-around">
              {/* Profit  */}
              <div className="w-full sm:w-2/3 flex  justify-between items-center shadow-md">
                <div className="bg-purple-500 w-1/2 h-full text-center p-2 text-lg font-semibold">
                  {basicInfo.Profit}
                </div>
                <div className="text-center p-2 w-1/2 font-semibold text-lg uppercase">
                  Profits
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* expense and extra info  */}
        <div className="flex h-1/2 flex-col sm:flex-row justify-between items-center mt-5">
          <div className="w-full sm:w-4/12"></div>
          <div className="w-full sm:w-7/12 h-full">
            <Messages />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
