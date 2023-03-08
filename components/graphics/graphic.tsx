import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, Filler, TimeScale } from "chart.js";

import Balancer from "react-wrap-balancer";

import "chartjs-adapter-luxon";
import { filterData } from "@/lib/utils";

Chart.register(Filler, TimeScale);

export default function Graphic({
  title,
  xValues,
  yValues,
  lineColor,
  fillColor
}: {
  title: string;
  xValues: number[];
  yValues: number[];
  lineColor: string;
  fillColor: string;
  
}) {
  const [allXValues, setAllXValues] = useState<number[]>([]);
  const [allYValues, setAllYValues] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState([true, false, false, false]);
  const [chartData, setChartData] = useState({
    labels: allXValues,
    datasets: [
      {
        data: allYValues,
        borderColor: lineColor,
        fill: {
          target: "origin",
          above: fillColor,
        },
      },
    ],
    position: "right",
  });

  useEffect(() => {
    setChartData({labels: allXValues,
      datasets: [
        {
          data: allYValues,
          borderColor: lineColor,
          fill: {
            target: "origin",
            above: fillColor,
          },
        },
      ],
      position: "right",
    })
  }, []);

  useEffect(() => {
    setAllXValues(xValues)
    setAllYValues(yValues)
  }, [xValues, yValues]);


  const defaultData = () => {
    setChartData({
      labels: allXValues,
      datasets: [
        {
          data: allYValues,
          borderColor: lineColor,
          fill: {
            target: "origin",
            above: fillColor,
          },
        },
      ],
      position: "right",
    });
    setActiveTab([true, false, false, false]);
  };

  const oneYearData = () => {
    setChartData(filterData(chartData, allXValues, allYValues, 0, 1));
    setActiveTab([false, true, false, false]);
  };

  const threeMonthsData = () => {
    setChartData(filterData(chartData, allXValues, allYValues, 3));
    setActiveTab([false, false, true, false]);
  };

  const oneMonthData = () => {
    setChartData(filterData(chartData, allXValues, allYValues, 1));
    setActiveTab([false, false, false, true]);
  };

  const optionsData: any = {
    scales: {
      y: {
        position: "right",
      },
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "dd MMM",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const buttonClassName =
    "border-white bg-rblue-500 p-1.5 text-sm text-white transition-all hover:border-rblue-600 hover:shadow-lg w-24";

  return (
    <>
      <div className="">
        <div className="mr-2 flex flex-col justify-between gap-4 xl:flex-row">
          <h3 className="mx-6 mb-1 text-xl font-bold sm:mx-1">{title}</h3>

          <div className="flex sm:mx-2 mx-6 lg:mx-0 lg:justify-center">
            <button
              className={`${buttonClassName} rounded-tl-lg rounded-bl-lg border-r hover:border-r-4`}
              style={{
                backgroundColor: activeTab[0]
                  ? "rgb(10 76 140 / 1)"
                  : "rgb(7 103 191 / 1)",
              }}
              onClick={defaultData}
            >
              <Balancer>No Filter</Balancer>
            </button>

            <button
              className={`${buttonClassName} border-x hover:border-x-4`}
              onClick={oneYearData}
              style={{
                backgroundColor: activeTab[1]
                  ? "rgb(10 76 140 / 1)"
                  : "rgb(7 103 191 / 1)",
              }}
            >
              <Balancer>1 year</Balancer>
            </button>

            <button
              className={`${buttonClassName} border-x hover:border-x-4`}
              onClick={threeMonthsData}
              style={{
                backgroundColor: activeTab[2]
                  ? "rgb(10 76 140 / 1)"
                  : "rgb(7 103 191 / 1)",
              }}
            >
              <Balancer>3 months</Balancer>
            </button>

            <button
              className={`${buttonClassName} rounded-tr-lg rounded-br-lg border-x hover:border-x-4`}
              onClick={oneMonthData}
              style={{
                backgroundColor: activeTab[3]
                  ? "rgb(10 76 140 / 1)"
                  : "rgb(7 103 191 / 1)",
              }}
            >
              <Balancer>1 month</Balancer>
            </button>
          </div>
        </div>

        <div className="relative">
          <Line data={chartData} options={optionsData} />
        </div>
      </div>
    </>
  );
}