import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeProvider } from "../utils/ThemeContext";
import { Modal } from "@mui/material";
import { chartColors } from "./ChartjsConfig";
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";
import ChartAnnotationsPlugin from "chartjs-plugin-annotation";

// Import utilities
import { formatValue } from "../utils/Utils";
import axios from "axios";
import toast from "react-hot-toast";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  ChartAnnotationsPlugin
);

function MainTrend({ data, width, height, title }) {
  const date = new Date(Date.now()).toDateString();
  const [chart, setChart] = useState(null);
  console.log(chart);
  const [reason, setReason] = useState(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const canvas = useRef(null);
  const [excelWrite, setExcelWrite] = useState(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === "dark";
  const { tooltipBodyColor, tooltipBgColor, tooltipBorderColor, chartAreaBg } =
    chartColors;

  console.log(reason);

  const handleClose = () => {
    setOpen(false);
    setExcelWrite(null);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setExcelWrite(null);
    setReason(null);
  };

  const plugin = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#99ffff";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const max = {
    type: "line",
    borderColor: "red",
    borderWidth: 1,
    click: function ({ chart, element }) {
      console.log("Line annotation clicked");
    },
    label: {
      backgroundColor: "red",
      content: `UCL`,
      display: true,
    },
    scaleID: "y",
    value: data.mean + data.variance * 3,
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.download = `${data?.name} ${date}-chart.png`;
    link.href = chart?.toBase64Image();
    link.click();
  };

  const mean = {
    type: "line",
    borderColor: "gray",
    borderWidth: 1,
    click: function ({ chart, element }) {
      console.log(chart, element);
    },
    label: {
      backgroundColor: "gray",
      content: "Mean",
      display: true,
    },
    scaleID: "y",
    value: data.mean,
  };

  const min = {
    type: "line",
    borderColor: "red",
    borderWidth: 1,
    click: function ({ chart, element }) {
      console.log("Line annotation clicked");
    },
    label: {
      backgroundColor: "red",
      content: "LCL",
      display: true,
    },
    scaleID: "y",
    value: data.mean - data.variance * 3,
  };

  let arr1 = [];
  const down_points = data?.datasets[0].data.forEach((item, i) => {
    if (item <= min?.value) {
      arr1.push({
        type: "point",
        borderColor: "red",
        borderWidth: 1,
        label: {
          backgroundColor: "red",

          display: true,
        },
        scaleID: "y",
        xValue: i,
        yValue: item,
      });
    }
  });

  let arr = [];
  const up_points = data?.datasets[0].data?.forEach((item, i) => {
    if (item >= max?.value) {
      arr.push({
        type: "point",
        borderColor: "red",
        borderWidth: 1,

        label: {
          backgroundColor: "red",

          display: true,
        },
        scaleID: "y",
        xValue: i,
        yValue: item,
      });
    }
  });

  useEffect(() => {
    if (
      excelWrite?.split(",")[3] <= min?.value ||
      excelWrite?.split(",")[3] >= max?.value
    ) {
      console.log(excelWrite?.split(",")[3]);
      setOpen(true);
    }
  }, [excelWrite]);

  const onConfirm = () => {
    if (reason || excelWrite) {
      toast.loading("Data is Being Entered");
      axios
        .post("http://localhost:8000/api/app3", {
          month: excelWrite.split(",")[0],
          date: excelWrite.split(",")[1],
          item: excelWrite.split(",")[2],
          reason: reason,
        })
        .then((res) => {
          toast.dismiss();
          toast.success("Data Entry Success !");
          setOpen2(false);
          setReason(null);
          setExcelWrite(null);
        });
    }
  };

  useEffect(() => {
    const ctx = canvas.current;
    // eslint-disable-next-line no-unused-vars
    const newChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        onClick: (e, activeEls) => {
          let datasetIndex = activeEls[0].datasetIndex;
          let dataIndex = activeEls[0].index;
          let datasetLabel = e.chart.data.datasets[datasetIndex].label;
          let value = e.chart.data.datasets[datasetIndex].data[dataIndex];
          let label = e.chart.data.labels[dataIndex];
          setExcelWrite(`${label},${datasetLabel},${value}`);
        },
        chartArea: {
          backgroundColor: darkMode ? chartAreaBg.dark : chartAreaBg.light,
        },
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            display: true,
            beginAtZero: true,
          },
          x: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: () => false, // Disable tooltip title
              label: (context) =>
                `${context.dataset.label}:  ${context.parsed.y}, Time: ${context.label}`,
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
          annotation: {
            annotations: {
              max,
              mean,
              min,
              ...arr1,
              ...arr,
            },
          },
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    setChart(newChart);
    return () => newChart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, data?.labels]);

  useEffect(() => {
    if (!chart) return;
    if (darkMode) {
      chart.options.chartArea.backgroundColor = chartAreaBg.dark;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.dark;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.dark;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.dark;
    } else {
      chart.options.chartArea.backgroundColor = chartAreaBg.light;
      chart.options.plugins.tooltip.bodyColor = tooltipBodyColor.light;
      chart.options.plugins.tooltip.backgroundColor = tooltipBgColor.light;
      chart.options.plugins.tooltip.borderColor = tooltipBorderColor.light;
    }
    chart.update("none");
  }, [currentTheme]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute  bg-white outline-none top-[10%] left-[50%] -translate-x-[50%] flex px-12 py-4">
          <div>
            <p className="text-sm text-gray-700 font-semibold italic">
              Are You Sure You Want To Make An Entry In Abnormality Sheet ?
            </p>
            <div className="flex my-2 gap-4 justify-center">
              <button
                className="bg-red-500 text-white px-6 py-1.5 shadow-md rounded-md"
                onClick={() => handleClose()}
              >
                No
              </button>
              <button
                className="bg-green-500 text-white px-6 py-1.5 shadow-md rounded-md"
                onClick={() => {
                  setOpen(false);
                  setOpen2(true);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute  bg-white outline-none top-[10%] left-[50%] -translate-x-[50%] flex px-12 py-4">
          <div>
            <p className="text-sm text-gray-700 font-semibold italic">
              Enter The Reason For Abnormality UCL
            </p>
            <div className="flex flex-col my-2 gap-4 justify-center items-center">
              <textarea
                type="text"
                rows={6}
                onChange={(e) => {
                  setReason(e.target.value);
                }}
                placeholder="Enter The Reason"
                className="px-4 py-1.5 border rounded-md bg-white shadow-md outline-none placeholder:text-sm text-sm"
              />

              <button
                className="bg-green-500 text-white px-6 py-1.5 shadow-md rounded-md"
                onClick={() => onConfirm()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <canvas ref={canvas} width={width} height={height}></canvas>
    </>
  );
}

export default MainTrend;
