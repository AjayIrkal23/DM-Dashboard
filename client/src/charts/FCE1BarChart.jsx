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

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  TimeScale,
  CategoryScale,
  Tooltip,
  Legend
);

function FCE1BarChart({ data, width, height, shift }) {
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
        scales: {
          y: {
            border: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 4,

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
      <div className="px-5 py-3"></div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default FCE1BarChart;
