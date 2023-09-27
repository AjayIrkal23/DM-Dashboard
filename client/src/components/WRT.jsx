import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import BarChart01 from "../charts/BarChart01";

import GapChart from "../charts/GapChart";
import ProcessChart from "../charts/ProcessChart";
import ProcessStacked from "../charts/ProcessChartstacked";
import { AccountContext } from "../context/context";
import FCE1BarChart from "../charts/FCE1BarChart";
const WRT = ({ open, setOpen }) => {
  const [data, setData] = useState([5, 7, 8, 6, 4, 9, 4, 5]);
  const [chartDataEntry, setChartData] = useState();
  const { period, setPeriod, data: EP } = useContext(AccountContext);

  useEffect(() => {
    GRT();
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

  const GRT = () => {
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
          arr.push(EP?.pacing?.i_WRTIdx?.toFixed(2));
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
            accumulator = accumulator + currentValue.i_WRTIdx;
          }
          return accumulator;
        }, 0);
        arr.push(total.toFixed(1));
      }
      console.log(arr);
      setChartData(arr);
    }
  };

  const chartData3 = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: chartDataEntry,
        label: "The Number of WRT 0",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // {
      //   data: get135Labels(),
      //   label: "The Number of WRT 1",
      //   backgroundColor: tailwindConfig().theme.colors.gray[300],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.gray[300],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
      // {
      //   data: get135Labels(),
      //   label: "The Number of WRT 2",
      //   backgroundColor: tailwindConfig().theme.colors.blue[700],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
      // {
      //   data: get135Labels(),
      //   label: "The Number of WRT 3",
      //   backgroundColor: tailwindConfig().theme.colors.yellow[700],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
      // {
      //   data: get135Labels(),
      //   label: "The Number of WRT 4",
      //   backgroundColor: tailwindConfig().theme.colors.green[700],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.green[800],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
      // {
      //   data: get135Labels(),
      //   label: "The Number of WRT 5",
      //   backgroundColor: tailwindConfig().theme.colors.blue[100],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.blue[200],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
      // {
      //   data: get135Labels(),
      //   label: "The Number of WRT 6",
      //   backgroundColor: tailwindConfig().theme.colors.pink[700],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.pink[800],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
      // {
      //   data: get135Labels(),
      //   label: "The Number of WRT 7",
      //   backgroundColor: tailwindConfig().theme.colors.yellow[200],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.yellow[300],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
      // {
      //   data: get135Labels(),
      //   label: "The Number of WRT 8",
      //   backgroundColor: tailwindConfig().theme.colors.blue[200],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.blue[300],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
      // {
      //   data: get135Labels(),
      //   label: "The Number of WRT 9",
      //   backgroundColor: tailwindConfig().theme.colors.red[700],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.red[800],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },
      // {
      //   data: get135Labels(),
      //   label: "The Number of WRT 10",
      //   backgroundColor: tailwindConfig().theme.colors.red[200],
      //   hoverBackgroundColor: tailwindConfig().theme.colors.red[200],
      //   barPercentage: 0.66,
      //   categoryPercentage: 0.66,
      // },

      // Light blue bars

      // Blue bars
    ],
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute  bg-white outline-none top-[5%] left-[50%] -translate-x-[50%] flex">
          <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                WRT Trend
              </h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
            <FCE1BarChart data={chartData3} width={900} height={548} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WRT;
