import { React, useState, useEffect } from "react";
import styles from "./chart.module.css";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";

function Chart({ info, country }) {
  const [dailyStats, setDailyStats] = useState([]);
  console.log("stats:", info, "country:", country);

  useEffect(() => {
    const getDailyData = async () => {
      setDailyStats(await fetchDailyData());
      console.log("😀", dailyStats);
    };
    getDailyData();
  }, []);

  const countryData = [
    info?.confirmed?.value,
    info?.recovered?.value,
    info?.deaths?.value
  ];

  const lineChart = dailyStats.length && (
    <Line
      data={{
        labels: dailyStats.map(({ date }) => date),
        datasets: [
          {
            data: dailyStats.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true
          },
          {
            data: dailyStats.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true
          }
        ]
      }}
    />
  );

  const data = {
    labels: ["confirmed", "recovered", "deaths"],
    datasets: [
      {
        data: countryData,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 99, 132, 0.2)"
        ],
        borderColor: ["rgba(0,0,255)", "rgba(0,255,0)", "rgba(255,0,0)"],
        borderWidth: 1
      }
    ]
  };

  const options = {
    title: { display: true, text: country },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  const barChart = <Bar data={data} options={options} />;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
}

export default Chart;
