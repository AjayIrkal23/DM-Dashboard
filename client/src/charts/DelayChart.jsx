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

function DelayChart({ data, width, height, shift }) {
  const [chartDataEntry3, setChartData3] = useState();
  const [chartDataEntry4, setChartData4] = useState();
  const [chartDataEntry, setChartData] = useState();
  const [chartDataEntry1, setChartData1] = useState();
  const [chartDataEntry2, setChartData2] = useState();
  const { period, setPeriod, data: EP } = useContext(AccountContext);

  useEffect(() => {
    DelayData1();
    DelayData();
    DelayData2();
    DelayData3();
    DelayData4();
  }, [EP]);

  function DelayData() {
    let arr = [];
    if (period == "Last Coil" || period.customp) {
      arr.push(EP?.Excel?.f_SSPR1TravelTimeDelay?.toFixed(2));
      arr.push(EP?.pacing?.f_FCE1SSPTravelTimeDelay?.toFixed(2));
      arr.push(EP?.Excel?.f_SSPProcessTimeDelay?.toFixed(2));

      setChartData3(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let arr = [];
      let total1 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_SSPR1TravelTimeDelay,
          0
        );
      let total2 =
        EP?.pacing?.length > 1 &&
        EP?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_FCE1SSPTravelTimeDelay,
          0
        );
      let total3 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_SSPProcessTimeDelay,
          0
        );

      arr.push(total1?.toFixed(2));
      arr.push(total2?.toFixed(2));
      arr.push(total3?.toFixed(2));

      setChartData3(arr);
    } else {
      return "--";
    }
  }

  function DelayData4() {
    let arr = [];
    if (period == "Last Coil" || period.customp) {
      arr.push(EP?.Excel?.i_FMEntryOpInhibit?.toFixed(2));
      arr.push(EP?.Excel?.f_FEntF1TravelTimeDelay?.toFixed(2));

      setChartData4(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let arr = [];
      let total1 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.i_FMEntryOpInhibit,
          0
        );
      let total2 =
        EP?.pacing?.length > 1 &&
        EP?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_FEntF1TravelTimeDelay,
          0
        );

      arr.push(total1?.toFixed(2));
      arr.push(total2?.toFixed(2));

      setChartData4(arr);
    } else {
      return "--";
    }
  }

  function DelayData3() {
    let arr = [];
    if (period == "Last Coil" || period.customp) {
      if (EP?.Excel?.i_FceNum == 1) {
        arr.push(EP?.Excel?.f_FCDTravelTmeDelay?.toFixed(2));
      } else {
        arr.push(0);
      }
      if (EP?.Excel?.i_FceNum == 2) {
        arr.push(EP?.Excel?.f_FCDTravelTmeDelay?.toFixed(2));
      } else {
        arr.push(0);
      }
      if (EP?.Excel?.i_FceNum == 3) {
        arr.push(EP?.Excel?.f_FCDTravelTmeDelay?.toFixed(2));
      } else {
        arr.push(0);
      }

      setChartData2(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let arr = [];
      let total1 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce((accumulator, currentValue) => {
          if (currentValue.i_FceNum == 1) {
            accumulator = accumulator + currentValue.f_FCDTravelTmeDelay;
          }
          console.log(accumulator);
          return accumulator;
        }, 0);
      let total2 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce((accumulator, currentValue) => {
          if (currentValue.i_FceNum == 2) {
            accumulator = accumulator + currentValue.f_FCDTravelTmeDelay;
          }
          console.log(accumulator);
          return accumulator;
        }, 0);
      let total3 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce((accumulator, currentValue) => {
          if (currentValue.i_FceNum == 3) {
            accumulator = accumulator + currentValue.f_FCDTravelTmeDelay;
          }
          console.log(accumulator);
          return accumulator;
        }, 0);

      console.log(total1, total2, total3);
      arr.push(total1.toFixed(2));
      arr.push(total2.toFixed(2));
      arr.push(total3.toFixed(2));

      setChartData2(arr);
    } else {
      return "--";
    }
  }

  function DelayData1() {
    let arr = [];
    if (period == "Last Coil" || period.customp) {
      if (EP?.Excel?.i_FceNum == 1) {
        arr.push(EP?.Excel?.f_L2L1ExtRdyTimeDiff?.toFixed(2));
      } else {
        arr.push(0);
      }
      if (EP?.Excel?.i_FceNum == 2) {
        arr.push(EP?.Excel?.f_L2L1ExtRdyTimeDiff?.toFixed(2));
      } else {
        arr.push(0);
      }
      if (EP?.Excel?.i_FceNum == 3) {
        arr.push(EP?.Excel?.f_L2L1ExtRdyTimeDiff?.toFixed(2));
      } else {
        arr.push(0);
      }

      setChartData(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let arr = [];
      let total1 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce((accumulator, currentValue) => {
          if (currentValue.i_FceNum == 1) {
            accumulator = accumulator + currentValue.f_L2L1ExtRdyTimeDiff;
          }
          console.log(accumulator);
          return accumulator;
        }, 0);
      let total2 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce((accumulator, currentValue) => {
          if (currentValue.i_FceNum == 2) {
            accumulator = accumulator + currentValue.f_L2L1ExtRdyTimeDiff;
          }
          console.log(accumulator);
          return accumulator;
        }, 0);
      let total3 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce((accumulator, currentValue) => {
          if (currentValue.i_FceNum == 3) {
            accumulator = accumulator + currentValue.f_L2L1ExtRdyTimeDiff;
          }
          console.log(accumulator);
          return accumulator;
        }, 0);

      console.log(total1, total2, total3);
      arr.push(total1.toFixed(2));
      arr.push(total2.toFixed(2));
      arr.push(total3.toFixed(2));

      setChartData(arr);
    } else {
      return "--";
    }
  }

  function DelayData2() {
    let arr = [];
    if (period == "Last Coil" || period.customp) {
      if (EP?.Excel?.i_FceNum == 1) {
        arr.push(EP?.Excel?.f_ExtractCycleTimeDiff?.toFixed(2));
      } else {
        arr.push(0);
      }
      if (EP?.Excel?.i_FceNum == 2) {
        arr.push(EP?.Excel?.f_ExtractCycleTimeDiff?.toFixed(2));
      } else {
        arr.push(0);
      }
      if (EP?.Excel?.i_FceNum == 3) {
        arr.push(EP?.Excel?.f_ExtractCycleTimeDiff?.toFixed(2));
      } else {
        arr.push(0);
      }

      setChartData1(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let arr = [];
      let total1 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce((accumulator, currentValue) => {
          if (currentValue.i_FceNum == 1) {
            accumulator = accumulator + currentValue.f_ExtractCycleTimeDiff;
          }
          console.log(accumulator);
          return accumulator;
        }, 0);
      let total2 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce((accumulator, currentValue) => {
          if (currentValue.i_FceNum == 2) {
            accumulator = accumulator + currentValue.f_ExtractCycleTimeDiff;
          }
          console.log(accumulator);
          return accumulator;
        }, 0);
      let total3 =
        EP?.Excel?.length > 1 &&
        EP?.Excel?.reduce((accumulator, currentValue) => {
          if (currentValue.i_FceNum == 3) {
            accumulator = accumulator + currentValue.f_ExtractCycleTimeDiff;
          }
          console.log(accumulator);
          return accumulator;
        }, 0);

      console.log(total1, total2, total3);
      arr.push(total1.toFixed(2));
      arr.push(total2.toFixed(2));
      arr.push(total3.toFixed(2));

      setChartData1(arr);
    } else {
      return "--";
    }
  }

  const [modal, setModal] = useState(null);
  const chartData = {
    labels: [
      ["FCE1 ", "Discharge", "Delay"],
      ["FCE2 ", "Discharge", "Delay"],
      ["FCE3 ", "Discharge", "Delay"],
    ],
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
    labels: [
      ["FCE1 ", "Extractor", "Delay"],
      ["FCE2 ", "Extractor", "Delay"],
      ["FCE3 ", "Extractor", "Delay"],
    ],
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
    labels: [
      ["FCE1 ", "Slip", "Delay"],
      ["FCE2 ", "Slip", "Delay"],
      ["FCE3 ", "Slip", "Delay"],
    ],
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
    labels: [
      ["FCESSP ", "Travel", "Delay"],
      ["SSP ", "Process", "Delay"],
      ["SSP ", "R1", "Travel", "Delay"],
    ],
    datasets: [
      // Light blue bars
      {
        data: chartDataEntry3,
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Light blue bars

      // Blue bars
    ],
  };

  const chartData6 = {
    labels: [
      ["Manual", "Auto", "Rock", "Count"],
      ["Manual", "Auto", "Rock", "Time"],
      ["2 - 5 ", "Mins", "Delay"],
      [">5 ", "Mins", "Delay"],
    ],
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
            } else if (ind == 7) {
              setModal(7);
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
                  FCE Discharge Visualization
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
                  FCE Extractor Visualization
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
                  FCE Slip Visualization
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
                  R1 Travel Visualization
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <FCE1BarChart data={chartData3} width={900} height={548} />
            </div>
          )}
          {modal == 7 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  FME Travel Visualization
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <FCE1BarChart data={chartData6} width={900} height={548} />
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

export default DelayChart;
