import { Modal } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import BarChart01 from "../charts/BarChart01";

import GapChart from "../charts/GapChart";
import ProcessChart from "../charts/ProcessChart";
import ProcessStacked from "../charts/ProcessChartstacked";
import { AccountContext } from "../context/context";
const Processes = ({ open, setOpen }) => {
  const { period, setPeriod, data: EP } = useContext(AccountContext);

  const [five, setFive] = useState();
  const [four, setFour] = useState();
  const [three, setThree] = useState();
  const [two, setTwo] = useState();
  const [one, setOne] = useState();

  const get135Labels = () => {
    let arr = [];
    for (let index = 1; index < 100; index++) {
      if (index * 5 != 140) {
        arr.push(index * 5);
      } else {
        return arr;
      }
    }
  };

  useEffect(() => {
    BottleNeckData();
  }, [EP]);

  const BottleNeckData = () => {
    if (period == "Last Coil" || period.customp) {
      const start = 0;
      const end = 140;
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      let arr4 = [];
      let arr5 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        if (
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) >= index &&
          EP?.pacing?.f_F1GapTimeAct?.toFixed(1) <= plus5
        ) {
          if (EP?.pacing?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "FCE") {
            arr1.push(1);
          } else {
            arr1.push(0);
          }
          if (EP?.pacing?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "HSB") {
            arr2.push(1);
          } else {
            arr2.push(0);
          }
          if (EP?.pacing?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "R1R2") {
            arr3.push(1);
          } else {
            arr3.push(0);
          }
          if (EP?.pacing?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "FM") {
            arr4.push(1);
          } else {
            arr4.push(0);
          }
          if (EP?.pacing?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "DC") {
            arr3.push(1);
          } else {
            arr3.push(0);
          }
        }
      }

      setOne(arr1);
      setTwo(arr2);
      setThree(arr3);
      setFour(arr4);
      setFive(arr5);
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
      let arr5 = [];

      for (let index = start; index < end; index = index + 5) {
        let plus5 = index + 5;
        console.log(index, plus5);
        let FCE = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "FCE") {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let HSB = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "HSB") {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let R1R2 = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (
              currentValue.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "R1R2"
            ) {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let FM = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "FM") {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);
        let DC = EP?.pacing?.reduce((accumulator, currentValue) => {
          if (
            currentValue.f_F1GapTimeAct?.toFixed(1) >= index &&
            currentValue.f_F1GapTimeAct?.toFixed(1) <= plus5
          ) {
            if (currentValue.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "DC") {
              accumulator = accumulator + 1;
            }
          }
          return accumulator;
        }, 0);

        arr1.push(FCE);
        arr2.push(HSB);
        arr3.push(R1R2);
        arr4.push(FM);
        arr5.push(DC);
      }

      setOne(arr1);
      setTwo(arr2);
      setThree(arr3);
      setFour(arr4);
      setFive(arr5);
    }
  };

  const chartData3 = {
    labels: get135Labels(),
    datasets: [
      // Light blue bars
      {
        data: one,
        label: "BOTTLE NECK [FCE]",
        backgroundColor: tailwindConfig().theme.colors.orange[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: two,
        label: "BOTTLE NECK [HSB]",
        backgroundColor: tailwindConfig().theme.colors.gray[300],
        hoverBackgroundColor: tailwindConfig().theme.colors.gray[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: three,
        label: "BOTTLE NECK [R1]",
        backgroundColor: tailwindConfig().theme.colors.blue[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: three,
        label: "BOTTLE NECK [R2]",
        backgroundColor: tailwindConfig().theme.colors.yellow[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: four,
        label: "BOTTLE NECK [FM]",
        backgroundColor: tailwindConfig().theme.colors.green[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.green[800],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: five,
        label: "BOTTLE NECK [DC]",
        backgroundColor: tailwindConfig().theme.colors.purple[700],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[800],
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
                Bottle Neck Visualization
              </h2>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
            <ProcessStacked data={chartData3} width={900} height={548} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Processes;
