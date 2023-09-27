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
import ProcessStacked from "./ProcessChartstacked";
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

function ProcessChart({ data, width, height, shift }) {
  const [Chartsdata, setChartsdata] = useState([5, 7, 8]);
  const [Chartsdata1, setChartsdata1] = useState([8, 5, 4]);

  const [fourMin, setFour] = useState();
  const [threeMin, setThree] = useState();
  const [twoMin, setTwo] = useState();
  const [oneMin, setOne] = useState();

  const [fourMin1, setFour1] = useState();
  const [threeMin1, setThree1] = useState();
  const [twoMin1, setTwo1] = useState();
  const [oneMin1, setOne1] = useState();

  const [fourMin2, setFour2] = useState();
  const [threeMin2, setThree2] = useState();
  const [twoMin2, setTwo2] = useState();
  const [oneMin2, setOne2] = useState();

  const [fourMin4, setFour4] = useState();
  const [threeMin4, setThree4] = useState();
  const [twoMin4, setTwo4] = useState();
  const [oneMin4, setOne4] = useState();
  const { period, setPeriod, data: EP } = useContext(AccountContext);

  useEffect(() => {
    GapData();
    GapData1();
    GapData2();
    GapData4();
  }, [EP]);
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

  const GapData = () => {
    if (period == "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          if (EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1) <= 0) {
            arr1.push(EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1));
          } else {
            arr1.push(0);
          }
          if (
            EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1) > 1 &&
            EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1) <= 5
          ) {
            arr2.push(EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1));
          } else {
            arr2.push(0);
          }
          if (
            EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1) > 5 &&
            EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1) <= 10
          ) {
            arr3.push(EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1));
          } else {
            arr3.push(0);
          }
          if (
            EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1) > 11 &&
            EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1) <= 999
          ) {
            arr4.push(EP?.pacing?.f_SSPProcessTimeDelay?.toFixed(1));
          } else {
            arr4.push(0);
          }
        }
      }

      setOne(arr1);
      setTwo(arr2);
      setThree(arr3);
      setFour(arr4);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let total = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            accumulator = accumulator + currentValue.f_SSPProcessTimeDelay;
          }
          return accumulator;
        }, 0);
        if (total <= 0) {
          arr1.push(total?.toFixed(1));
        } else {
          arr1.push(0);
        }
        if (total?.toFixed(2) > 1 && total?.toFixed(2) <= 5) {
          arr2.push(total?.toFixed(1));
        } else {
          arr2.push(0);
        }
        if (total?.toFixed(2) > 5 && total?.toFixed(2) <= 10) {
          arr3.push(total?.toFixed(1));
        } else {
          arr3.push(0);
        }
        if (total?.toFixed(2) > 11 && total?.toFixed(2) <= 999) {
          arr4.push(total?.toFixed(1));
        } else {
          arr4.push(0);
        }
      }

      setOne(arr1);
      setTwo(arr2);
      setThree(arr3);
      setFour(arr4);
    }
  };

  const GapData4 = () => {
    if (period == "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          if (
            (
              EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
            ).toFixed(1) <= 0
          ) {
            arr1.push(
              (
                EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
              )?.toFixed(1)
            );
          } else {
            arr1.push(0);
          }
          if (
            (
              EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
            )?.toFixed(1) > 1 &&
            (
              EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
            ).toFixed(1) <= 5
          ) {
            arr2.push(
              (
                EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
              )?.toFixed(1)
            );
          } else {
            arr2.push(0);
          }
          if (
            (
              EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
            ).toFixed(1) > 5 &&
            (
              EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
            ).toFixed(1) <= 10
          ) {
            arr3.push(
              (
                EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
              )?.toFixed(1)
            );
          } else {
            arr3.push(0);
          }
          if (
            (
              EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
            ).toFixed(1) > 11 &&
            (
              EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
            ).toFixed(1) <= 999
          ) {
            arr4.push(
              (
                EP?.pacing?.f_FMProcessTimePred - EP?.pacing?.f_FMProcessTimeAct
              )?.toFixed(1)
            );
          } else {
            arr4.push(0);
          }
        }
      }

      setOne4(arr1);
      setTwo4(arr2);
      setThree4(arr3);
      setFour4(arr4);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let total = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            accumulator =
              accumulator +
              (currentValue.f_FMProcessTimePred -
                currentValue.f_FMProcessTimeAct);
          }
          return accumulator;
        }, 0);
        if (total <= 0) {
          arr1.push(total?.toFixed(1));
        } else {
          arr1.push(0);
        }
        if (total?.toFixed(2) > 1 && total?.toFixed(2) <= 5) {
          arr2.push(total?.toFixed(1));
        } else {
          arr2.push(0);
        }
        if (total?.toFixed(2) > 5 && total?.toFixed(2) <= 10) {
          arr3.push(total?.toFixed(1));
        } else {
          arr3.push(0);
        }
        if (total?.toFixed(2) > 11 && total?.toFixed(2) <= 999) {
          arr4.push(total?.toFixed(1));
        } else {
          arr4.push(0);
        }
      }

      setOne4(arr1);
      setTwo4(arr2);
      setThree4(arr3);
      setFour4(arr4);
    }
  };

  const GapData2 = () => {
    if (period == "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.Excel?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.Excel?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          if (EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1) <= 0) {
            arr1.push(EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1));
          } else {
            arr1.push(0);
          }
          if (
            EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1) > 1 &&
            EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1) <= 5
          ) {
            arr2.push(EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1));
          } else {
            arr2.push(0);
          }
          if (
            EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1) > 5 &&
            EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1) <= 10
          ) {
            arr3.push(EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1));
          } else {
            arr3.push(0);
          }
          if (
            EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1) > 11 &&
            EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1) <= 999
          ) {
            arr4.push(EP?.Excel?.f_R2ProcessTimeDelay?.toFixed(1));
          } else {
            arr4.push(0);
          }
        }
      }

      setOne2(arr1);
      setTwo2(arr2);
      setThree2(arr3);
      setFour2(arr4);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let total = EP?.Excel?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            accumulator = accumulator + currentValue.f_R2ProcessTimeDelay;
          }
          return accumulator;
        }, 0);
        if (total <= 0) {
          arr1.push(total?.toFixed(1));
        } else {
          arr1.push(0);
        }
        if (total?.toFixed(2) > 1 && total?.toFixed(2) <= 5) {
          arr2.push(total?.toFixed(1));
        } else {
          arr2.push(0);
        }
        if (total?.toFixed(2) > 5 && total?.toFixed(2) <= 10) {
          arr3.push(total?.toFixed(1));
        } else {
          arr3.push(0);
        }
        if (total?.toFixed(2) > 11 && total?.toFixed(2) <= 999) {
          arr4.push(total?.toFixed(1));
        } else {
          arr4.push(0);
        }
      }

      setOne2(arr1);
      setTwo2(arr2);
      setThree2(arr3);
      setFour2(arr4);
    }
  };

  const GapData1 = () => {
    if (period == "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.Excel?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.Excel?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          if (EP?.Excel?.f_SSPGapTimeAct?.toFixed(1) <= 0) {
            arr1.push(EP?.Excel?.f_R1ProcessTimeDelay?.toFixed(1));
          } else {
            arr1.push(0);
          }
          if (
            EP?.Excel?.f_R1ProcessTimeDelay?.toFixed(1) > 1 &&
            EP?.Excel?.f_R1ProcessTimeDelay?.toFixed(1) <= 5
          ) {
            arr2.push(EP?.Excel?.f_R1ProcessTimeDelay?.toFixed(1));
          } else {
            arr2.push(0);
          }
          if (
            EP?.Excel?.f_R1ProcessTimeDelay?.toFixed(1) > 5 &&
            EP?.Excel?.f_R1ProcessTimeDelay?.toFixed(1) <= 10
          ) {
            arr3.push(EP?.Excel?.f_R1ProcessTimeDelay?.toFixed(1));
          } else {
            arr3.push(0);
          }
          if (
            EP?.Excel?.f_R1ProcessTimeDelay?.toFixed(1) > 11 &&
            EP?.Excel?.f_R1ProcessTimeDelay?.toFixed(1) <= 999
          ) {
            arr4.push(EP?.Excel?.f_R1ProcessTimeDelay?.toFixed(1));
          } else {
            arr4.push(0);
          }
        }
      }

      setOne1(arr1);
      setTwo1(arr2);
      setThree1(arr3);
      setFour1(arr4);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let total = EP?.Excel?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            accumulator = accumulator + currentValue.f_R1ProcessTimeDelay;
          }
          return accumulator;
        }, 0);
        if (total <= 0) {
          arr1.push(total?.toFixed(1));
        } else {
          arr1.push(0);
        }
        if (total?.toFixed(2) > 1 && total?.toFixed(2) <= 5) {
          arr2.push(total?.toFixed(1));
        } else {
          arr2.push(0);
        }
        if (total?.toFixed(2) > 5 && total?.toFixed(2) <= 10) {
          arr3.push(total?.toFixed(1));
        } else {
          arr3.push(0);
        }
        if (total?.toFixed(2) > 11 && total?.toFixed(2) <= 999) {
          arr4.push(total?.toFixed(1));
        } else {
          arr4.push(0);
        }
      }

      setOne1(arr1);
      setTwo1(arr2);
      setThree1(arr3);
      setFour1(arr4);
    }
  };

  const chartData = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: oneMin,
        label: "SSP Process Time Delay[<=0]",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twoMin,
        label: "SSP Process Time Delay[1-5]",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: threeMin,
        label: "SSP Process Time Delay[6-10]",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: fourMin,
        label: "SSP Process Time Delay[11-999]",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
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
        data: oneMin1,
        label: "R1 Process Time Delay[<=0]",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twoMin1,
        label: "R1 Process Time Delay[1-5]",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: threeMin1,
        label: "R1 Process Time Delay[6-10]",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: fourMin1,
        label: "R1 Process Time Delay[11-999]",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
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
        data: oneMin2,
        label: "R2 Process Time Delay[<=0]",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twoMin2,
        label: "R2 Process Time Delay[1-5]",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[400],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: threeMin2,
        label: "R2 Process Time Delay[6-10]",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: fourMin2,
        label: "R2 Process Time Delay[11-999]",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
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
        data: oneMin4,
        label: "FM Process Time Delay[<=1]",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: twoMin4,
        label: "FM Process Time Delay[1-5]",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: threeMin4,
        label: "FM Process Time Delay[6-10]",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: fourMin4,
        label: "FM Process Time Delay[11-999]",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
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
                  SSP PROCESS TIME DELAY
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <ProcessStacked data={chartData} width={900} height={548} />
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
              <ProcessStacked data={chartData1} width={900} height={548} />
            </div>
          )}
          {modal == 2 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  R2 PROCESS TIME DELAY
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <ProcessStacked data={chartData2} width={900} height={548} />
            </div>
          )}
          {modal == 3 && (
            <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  FM PROCESS TIME DELAY
                </h2>
              </header>
              {/* Chart built with Chart.js 3 */}
              {/* Change the height attribute to adjust the chart height */}
              <ProcessStacked data={chartData3} width={900} height={548} />
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

export default ProcessChart;
