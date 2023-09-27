import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import BarChart01 from "../charts/BarChart01";

import GapChart from "../charts/GapChart";
import { AccountContext } from "../context/context";
const Gaps = ({ open, setOpen }) => {
  const [chartDataEntry, setChartData] = useState();
  const { period, setPeriod, data } = useContext(AccountContext);

  function GapData() {
    let arr = [];
    if (period == "Last Coil" || period.customp) {
      arr.push(data?.Excel?.f_SSPGapTimeAct?.toFixed(2));
      arr.push(data?.Excel?.f_R1GapTimeAct?.toFixed(2));
      arr.push(data?.Excel?.f_R2GapTimeAct?.toFixed(2));
      arr.push(data?.Excel?.f_F1GapTimeAct?.toFixed(2));

      setChartData(arr);
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let arr = [];
      let total1 =
        data?.Excel?.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_SSPGapTimeAct,
          0
        );
      let total2 =
        data?.Excel?.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_R1GapTimeAct,
          0
        );
      let total3 =
        data?.Excel?.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_R2GapTimeAct,
          0
        );
      let total4 =
        data?.Excel?.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_F1GapTimeAct,
          0
        );

      arr.push(total1?.toFixed(2));
      arr.push(total2?.toFixed(2));
      arr.push(total3?.toFixed(2));
      arr.push(total4?.toFixed(2));

      setChartData(arr);
    } else {
      return "--";
    }
  }

  useEffect(() => {
    GapData();
  }, [data]);

  const chartData = {
    labels: [
      ["SSP", "Gap", "Time"],
      ["R1", "Gap", "Time"],
      ["R2", "Gap", "Time"],
      ["FM", "Gap", "Time"],
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
                Gap Visualization
              </h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
            <GapChart data={chartData} width={900} height={548} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Gaps;
