import React, { useRef, useEffect, useState, useContext } from "react";
import { useThemeProvider } from "../utils/ThemeContext";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { chartColors } from "./ChartjsConfig";
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-moment";
import { CategoryScale } from "chart.js";
import { Modal } from "@mui/material";

// Import utilities
import { tailwindConfig, formatValue } from "../utils/Utils";
import BarChart02 from "./BarChart02";
import FCE1BarChart from "./FCE1BarChart";
import { AccountContext } from "../context/context";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend
);

function GapChart({ data, width, height, shift }) {
  const [Chartsdata, setChartsdata] = useState([5, 7, 8]);
  const [Chartsdata1, setChartsdata1] = useState([8, 5, 4]);
  const [chartDataEntry4, setChartData4] = useState();
  const [chartDataEntry, setChartData] = useState();
  const [chartDataEntry1, setChartData1] = useState();
  const [chartDataEntry2, setChartData2] = useState();
  const { period, setPeriod, data: EP } = useContext(AccountContext);

  useEffect(() => {
    GapData();
    GapData1();
    GapData2();
    GapData3();
  }, [EP]);
  const [modal, setModal] = useState(null);
  const get135Labels = () => {
    let arr = [];
    for (let index = 0; index < 100; index++) {
      if (index * 5 != 140) {
        arr.push(index * 5);
      } else {
        console.log(arr);
        return arr;
      }
    }
  };

  const GapData = () => {
    if (period == "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr = [];
      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(2) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(2) <= plus5
        ) {
          arr.push(EP?.pacing?.f_SSPGapTimeAct?.toFixed(2));
        } else {
          arr.push(0);
        }
      }

      setChartData(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      const start = 0;
      const end = 140;
      let arr = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let total = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(2) <= plus5
          ) {
            accumulator = accumulator + currentValue.f_SSPGapTimeAct;
          }
          return accumulator;
        }, 0);
        arr.push(total.toFixed(1));
      }
      console.log(arr);
      setChartData(arr);
    }
  };

  const GapData1 = () => {
    if (period == "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr = [];
      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(2) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(2) <= plus5
        ) {
          arr.push(EP?.pacing?.f_R1GapTimeAct?.toFixed(2));
        } else {
          arr.push(0);
        }
      }

      setChartData1(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      const start = 0;
      const end = 140;
      let arr = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let total = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(2) <= plus5
          ) {
            accumulator = accumulator + currentValue.f_R1GapTimeAct;
          }
          return accumulator;
        }, 0);
        arr.push(total.toFixed(1));
      }
      console.log(arr);
      setChartData1(arr);
    }
  };

  const GapData3 = () => {
    if (period == "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr = [];
      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(2) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(2) <= plus5
        ) {
          arr.push(EP?.pacing?.f_F1GapTimeAct?.toFixed(2));
        } else {
          arr.push(0);
        }
      }

      setChartData4(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      const start = 0;
      const end = 140;
      let arr = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let total = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(2) <= plus5
          ) {
            accumulator = accumulator + currentValue.f_F1GapTimeAct;
          }
          return accumulator;
        }, 0);
        arr.push(total.toFixed(1));
      }
      console.log(arr);
      setChartData4(arr);
    }
  };

  const GapData2 = () => {
    if (period == "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr = [];
      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(2) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(2) <= plus5
        ) {
          arr.push(EP?.pacing?.f_R2GapTimeAct?.toFixed(2));
        } else {
          arr.push(0);
        }
      }

      setChartData2(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      const start = 0;
      const end = 140;
      let arr = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let total = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(2) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(2) <= plus5
          ) {
            accumulator = accumulator + currentValue.f_R2GapTimeAct;
          }
          return accumulator;
        }, 0);
        arr.push(total.toFixed(1));
      }
      console.log(arr);
      setChartData2(arr);
    }
  };

  // arr.push(data?.Excel?.f_SSPGapTimeAct?.toFixed(2));
  // arr.push(data?.Excel?.f_R1GapTimeAct?.toFixed(2));
  // arr.push(data?.Excel?.f_R2GapTimeAct?.toFixed(2));
  // arr.push(data?.Excel?.f_F1GapTimeAct?.toFixed(2));

  const chartData = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: chartDataEntry,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Light blue bars

      // Blue bars
    ],
  };

  const chartData1 = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: chartDataEntry1,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Light blue bars

      // Blue bars
    ],
  };

  const chartData2 = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: chartDataEntry2,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Light blue bars

      // Blue bars
    ],
  };

  const chartData3 = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: chartDataEntry4,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Light blue bars

      // Blue bars
    ],
  };

  const [chart, setChart] = useState(null);

  const [Shift, setShift] = useState("Shift");
  const canvas = useRef(null);
  const legend = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const {
    textColor,
    gridColor,
    tooltipBodyColor,
    tooltipBgColor,
    tooltipBorderColor,
  } = chartColors;

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const newChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        onClick: (evt, element) => {
          if (element.length > 0) {
            var ind = element[0].index;
            if (ind == 0) {
              setModal(0);
              setOpen(true);
            } else if (ind == 1) {
              setModal(1);
              setOpen(true);
            } else if (ind == 2) {
              setModal(2);
              setOpen(true);
            } else if (ind == 3) {
              setModal(3);
              setOpen(true);
            }
          }
        },
        scales: {
          y: {
            border: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 5,

              color: darkMode ? textColor.dark : textColor.light,
            },
            grid: {
              color: darkMode ? gridColor.dark : gridColor.light,
            },
          },
          x: {
            border: {
              display: false,
            },
            ticks: {
              font: 8,

              color: darkMode ? textColor.dark : textColor.light,
            },
          },
        },
        plugins: {
          datalabels: {
            anchor: "end",
            align: "top",

            font: {
              weight: "bold",
              size: 16,
            },
          },
          tooltip: {
            enabled: true,
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) =>
                `${context.label.replaceAll(",", " ")}:  ${context.parsed.y}, `,
            },
            bodyColor: darkMode
              ? tooltipBodyColor.dark
              : tooltipBodyColor.light,
            backgroundColor: darkMode
              ? tooltipBgColor.dark
              : tooltipBgColor.light,
            borderColor: darkMode
              ? tooltipBorderColor.dark
              : tooltipBorderColor.light,
          },

          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [ChartDataLabels],
    });

    setChart(newChart);
    return () => newChart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!chart) return;

    if (darkMode) {
      chart.options.scales.x.ticks.color = textColor.dark;
      chart.options.scales.y.ticks.color = textColor.dark;
      chart.options.scales.y.grid.color = gridColor.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.scales.x.ticks.color = textColor.light;
      chart.options.scales.y.ticks.color = textColor.light;
      chart.options.scales.y.grid.color = gridColor.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update("none");
  }, [currentTheme]);

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute  bg-white outline-none top-[5%] left-[50%] -translate-x-[50%] flex">
          {modal == 0 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  The Number of SSP GAP ACT
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <FCE1BarChart data={chartData} width={900} height={548} />
            </div>
          )}
          {modal == 1 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R1 GAP TIME ACT
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <FCE1BarChart data={chartData1} width={900} height={548} />
            </div>
          )}
          {modal == 2 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R2 GAP TIME ACT
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <FCE1BarChart data={chartData2} width={900} height={548} />
            </div>
          )}
          {modal == 3 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  FM GAP TIME ACT
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <FCE1BarChart data={chartData3} width={900} height={548} />
            </div>
          )}
        </div>
      </Modal>
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default GapChart;
