import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./chart.css";
ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      labels: {
        color: "#ffff",
      },
    },
  },
};

const DoughnutChart = ({ data, colors }) => {
  const cahrtData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: colors,
        borderColor: "#ffff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart_cont">
      <div className="chart_box">
        <Doughnut data={cahrtData} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
