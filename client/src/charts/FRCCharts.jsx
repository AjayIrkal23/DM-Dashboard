import React, { useRef, useEffect, useState } from "react";
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

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend
);

function FRCCharts({ data, width, height, shift }) {
  const [Chartsdata, setChartsdata] = useState([5, 7, 8]);
  const [Chartsdata1, setChartsdata1] = useState([8, 5, 4]);
  const [modal, setModal] = useState(null);
  const get135Labels = () => {
    let arr = [];
    for (let index = 1; index < 100; index++) {
      if (index * 5 != 135) {
        arr.push(index * 5);
      } else {
        console.log(arr);
        return arr;
      }
    }
  };

  const chartData = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: get135Labels(),
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
        data: get135Labels(),
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
        data: get135Labels(),
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
        data: get135Labels(),
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Light blue bars

      // Blue bars
    ],
  };

  const chartData4 = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: get135Labels(),
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
            formatter: Math.round,
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

export default FRCCharts;
