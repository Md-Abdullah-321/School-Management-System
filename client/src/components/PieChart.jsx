/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

ChartJS.register();
function PieChart({ chartData }) {
  return <Pie data={chartData} />;
}

export default PieChart;
