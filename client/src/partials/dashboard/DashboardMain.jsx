import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/DropdownEditMenu";
import ProgressBar from "@ramonak/react-progress-bar";

import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";
import * as htmlToImage from "html-to-image";
// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import MainTrend from "../../charts/MainTrend";
import { AccountContext } from "../../context/context";
import toast from "react-hot-toast";

function DashboardMain() {
  const date = new Date(Date.now()).toDateString();
  var node = document.getElementById("my-node");

  const { mainData, setSelectAll, selectAll } = useContext(AccountContext);

  const [chart, setChart] = useState("Production");
  const [compare, setCompare] = useState(false);

  console.log(mainData);

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const time = "00:00:00";
  const day = 1;
  const dateObj = year + " " + month + " " + day + " " + time;
  var getDaysArray = function (s, e) {
    for (
      var a = [], d = new Date(s);
      d <= new Date(e);
      d.setDate(d.getDate() + 1)
    ) {
      a.push(new Date(d).toDateString().split(" ").slice(1, 3));
    }
    return a;
  };

  const download = (name) => {
    htmlToImage
      .toJpeg(document.getElementById("my-node"), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `${name} - ${date}.jpeg`;
        link.href = dataUrl;
        link.click();
      });
    toast.success("Image Downloaded");
  };

  const getVar = (values, mean) => {
    let sum = 0;
    for (let index = 0; index < values.length; index++) {
      let num = Number(values[index]);

      sum = sum + (num - mean) ** 2;
    }
    sum = sum / values.length;
    sum = Math.sqrt(sum);

    return sum;
  };

  const chartData = mainData.map((item) => {
    console.log(item);
    return {
      labels: getDaysArray(new Date(dateObj), new Date()),
      name: item.name,
      unit: item.unit,
      type: item.type,
      variance: getVar(
        item.values,
        item.values.reduce((partialSum, a) => partialSum + Number(a), 0) /
          item.values.length
      ),
      mean:
        item.values.reduce((partialSum, a) => partialSum + Number(a), 0) /
        item.values.length,
      datasets: [
        // Indigo line
        {
          data: item.values,
          fill: true,

          backgroundColor: `rgba(${hexToRGB(
            tailwindConfig().theme.colors.blue[500]
          )}, 0.08)`,
          borderColor: tailwindConfig().theme.colors.blue[500],
          borderWidth: 2,

          pointRadius: 0,

          pointHoverRadius: 3,
          pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
          pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,

          label: item.name,
        },

        // Gray line
      ],
    };
  });

  console.log(chartData);

  return (
    <div className="flex flex-col col-span-full   dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 pb-2 ">
      <div className="flex gap-3 flex-wrap justify-between px-2">
        {" "}
        {chartData?.map((item) => (
          <div
            onClick={() => setChart(item.name)}
            className={`basis-1/5 ${
              chart == item.name
                ? "bg-[#2242a1] text-white"
                : "bg white border-[#2242a1] border-2 text-black"
            }  py-1 rounded-md cursor-pointer hover:bg-[#2242a1] hover:text-white hover:scale-105 transition-all duration-200 ease-in-out shadow-md text-center`}
          >
            {item.name}
          </div>
        ))}
        <div
          onClick={() => setChart("All")}
          className={`basis-1/5 ${
            chart == "All"
              ? "bg-[#2242a1] text-white"
              : "bg white border-[#2242a1] border-2 text-black"
          }  py-1 rounded-md cursor-pointer hover:bg-[#2242a1] hover:text-white hover:scale-105 transition-all duration-200 ease-in-out shadow-md text-center`}
        >
          All Charts
        </div>
      </div>

      {chart == "All" ? (
        chartData?.map((item) =>
          item.type == "CKPI" ? (
            <div className="bg-white">
              <div className="px-5 pt-5 flex items-center justify-between">
                <div>
                  <div className="sm:flex sm:justify-between sm:items-center mb-8">
                    {/* Right: Actions */}
                    <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                      {/* Filter button */}

                      {/* Datepicker built with flatpickr */}
                      {/* <Datepicker /> */}
                      {/* Add view button */}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
                      {item.name}
                    </div>
                  </div>{" "}
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    {date}
                  </div>
                  <button
                    className="my-2 px-4  py-1.5 text-xs shadow-md rounded-md bg-blue-500 text-white hover:scale-105 transition-all ease-in-out duration-200"
                    onClick={() => download(item.name)}
                  >
                    Download Chart
                  </button>
                </div>
              </div>
              <div
                className="flex flex-col gap-3 border-2 border-black/40 mx-1 bg-white"
                id="my-node"
              >
                {" "}
                <div className="mt-3">
                  <div className="flex items-center justify-between px-3 border-b-2 pb-2 border-black/40">
                    {" "}
                    <img src="/jsw.png" className="h-14 w-18 mx-3 p-1" alt="" />
                    <p className="text-sm ">
                      {" "}
                      <span className="font-semibold">Form No</span>.
                      <span className="italic text-gray-700">
                        {" "}
                        VJNR/TQM/DM-006.00.20150526
                      </span>
                    </p>
                  </div>
                  <div className="flex border-b-2    border-black/40 px-3">
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                      <span className="font-semibold">Month / Year : </span>
                      <span className="italic text-gray-700">
                        {" "}
                        {`${date.split(" ")[1]} - ${date.split(" ")[3]}/${
                          Number(date.split(" ")[3]) + 1
                        }`}
                      </span>
                    </div>
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">
                        Unit of measurement :{" "}
                      </span>
                      <span className="italic text-gray-700"> Number</span>
                    </div>
                    <div className="basis-1/3  flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">Target Value : </span>
                      <span className="italic text-gray-700"> 60</span>
                    </div>
                  </div>
                  <div className="flex border-b-2    border-black/40 px-3">
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                      <span className="font-semibold">Checking KPI : </span>
                      <span className="italic text-gray-700">
                        {" "}
                        {item.name},{item.unit}
                      </span>
                    </div>
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">Current Value : </span>
                      <span className="italic text-gray-700">
                        {
                          item.datasets[0].data[
                            item.datasets[0].data.length - 1
                          ]
                        }
                      </span>
                    </div>
                    <div className="basis-1/3  flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">Benchmark : </span>
                      <span className="italic text-gray-700"> </span>
                    </div>
                  </div>
                </div>
                {/* Chart built with Chart.js 3 */}
                <div className="grow max-sm:max-h-[500px] xl:max-h-[500px]">
                  {/* Change the height attribute to adjust the chart height */}
                  <MainTrend data={item} width={389} height={500} />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white">
              <div className="px-5 pt-5 flex items-center justify-between">
                <div>
                  <div className="sm:flex sm:justify-between sm:items-center mb-8">
                    {/* Right: Actions */}
                    <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                      {/* Filter button */}

                      {/* Datepicker built with flatpickr */}
                      {/* <Datepicker /> */}
                      {/* Add view button */}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
                      {item.name}
                    </div>
                  </div>{" "}
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
                    {date}
                  </div>
                  <button
                    className="my-2 px-4  py-1.5 text-xs shadow-md rounded-md bg-blue-500 text-white hover:scale-105 transition-all ease-in-out duration-200"
                    onClick={() => download(item.name)}
                  >
                    Download Chart
                  </button>
                </div>
              </div>
              <div
                className="flex flex-col gap-3 border-2 border-black/40 mx-1 bg-white"
                id="my-node"
              >
                {" "}
                <div className="mt-3">
                  <div className="flex items-center justify-between px-3 border-b-2 pb-2 border-black/40">
                    {" "}
                    <img src="/jsw.png" className="h-14 w-18 mx-3 p-1" alt="" />
                    <p className="text-sm ">
                      {" "}
                      <span className="font-semibold">Form No</span>.
                      <span className="italic text-gray-700">
                        {" "}
                        VJNR/TQM/DM-006.00.20150526
                      </span>
                    </p>
                  </div>
                  <div className="flex border-b-2    border-black/40 px-3">
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                      <span className="font-semibold">Month / Year : </span>
                      <span className="italic text-gray-700">
                        {" "}
                        {`${date.split(" ")[1]} - ${date.split(" ")[3]}/${
                          Number(date.split(" ")[3]) + 1
                        }`}
                      </span>
                    </div>
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">Department : </span>
                      <span className="italic text-gray-700">
                        {" "}
                        Iron Making 5MT
                      </span>
                    </div>
                    <div className="basis-1/3  flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">Checking Points </span>
                    </div>
                  </div>
                  <div className="flex border-b-2    border-black/40 px-3">
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                      <span className="font-semibold">Managing Point : </span>
                      <span className="italic text-gray-700"> {item.name}</span>
                    </div>
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">Section : </span>
                      <span className="italic text-gray-700"> BF - 2</span>
                    </div>
                    <div className="basis-1/3  flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">
                        1. Total Oxygen, NM3/hr{" "}
                      </span>
                    </div>
                  </div>
                  <div className="flex border-b-2    border-black/40 px-3">
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                      <span className="font-semibold">
                        Unit Of Measurement :{" "}
                      </span>
                      <span className="italic text-gray-700"> {item.unit}</span>
                    </div>
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">Sub-Section : </span>
                      <span className="italic text-gray-700"> Operation</span>
                    </div>
                    <div className="basis-1/3  flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">
                        2. SP.Moisture Input, Kg/Thm{" "}
                      </span>
                    </div>
                  </div>
                  <div className="flex border-b-2    border-black/40 px-3">
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                      <span className="font-semibold">Current Value : </span>
                      <span className="italic text-gray-700">
                        {
                          item.datasets[0].data[
                            item.datasets[0].data.length - 1
                          ]
                        }
                      </span>
                    </div>
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">Benchmark : </span>
                      <span className="italic text-gray-700"> </span>
                    </div>
                    <div className="basis-1/3  flex items-center  h-[40px] ml-4"></div>
                  </div>
                  <div className="flex border-b-2    border-black/40 px-3">
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                      <span className="font-semibold">Target Value : </span>
                      <span className="italic text-gray-700">4250</span>
                    </div>
                    <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                      <span className="font-semibold">Frequency : </span>
                      <span className="italic text-gray-700"> Daily</span>
                    </div>
                    <div className="basis-1/3  flex items-center  h-[40px] ml-4"></div>
                  </div>
                </div>
                {/* Chart built with Chart.js 3 */}
                <div className="grow max-sm:max-h-[500px] xl:max-h-[500px]">
                  {/* Change the height attribute to adjust the chart height */}
                  <MainTrend data={item} width={389} height={500} />
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <>
          {chartData?.map(
            (item) =>
              chart == item.name &&
              (item.type == "CKPI" ? (
                <div className="bg-white">
                  <div className="px-5 pt-5 flex items-center justify-between">
                    <div>
                      <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        {/* Right: Actions */}
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                          {/* Filter button */}

                          {/* Datepicker built with flatpickr */}
                          {/* <Datepicker /> */}
                          {/* Add view button */}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
                          {item.name}
                        </div>
                      </div>{" "}
                      <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
                        {date}
                      </div>
                      <button
                        className="my-2 px-4  py-1.5 text-xs shadow-md rounded-md bg-blue-500 text-white hover:scale-105 transition-all ease-in-out duration-200"
                        onClick={() => download(item.name)}
                      >
                        Download Chart
                      </button>
                    </div>
                  </div>
                  <div
                    className="flex flex-col gap-3 border-2 border-black/40 mx-1 bg-white"
                    id="my-node"
                  >
                    {" "}
                    <div className="mt-3">
                      <div className="flex items-center justify-between px-3 border-b-2 pb-2 border-black/40">
                        {" "}
                        <img
                          src="/jsw.png"
                          className="h-14 w-18 mx-3 p-1"
                          alt=""
                        />
                        <p className="text-sm ">
                          {" "}
                          <span className="font-semibold">Form No</span>.
                          <span className="italic text-gray-700">
                            {" "}
                            VJNR/TQM/DM-006.00.20150526
                          </span>
                        </p>
                      </div>
                      <div className="flex border-b-2    border-black/40 px-3">
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                          <span className="font-semibold">Month / Year : </span>
                          <span className="italic text-gray-700">
                            {" "}
                            {`${date.split(" ")[1]} - ${date.split(" ")[3]}/${
                              Number(date.split(" ")[3]) + 1
                            }`}
                          </span>
                        </div>
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">
                            Unit of measurement :{" "}
                          </span>
                          <span className="italic text-gray-700"> Number</span>
                        </div>
                        <div className="basis-1/3  flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">Target Value : </span>
                          <span className="italic text-gray-700"> 60</span>
                        </div>
                      </div>
                      <div className="flex border-b-2    border-black/40 px-3">
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                          <span className="font-semibold">Checking KPI : </span>
                          <span className="italic text-gray-700">
                            {" "}
                            {item.name},{item.unit}
                          </span>
                        </div>
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">
                            Current Value :{" "}
                          </span>
                          <span className="italic text-gray-700">
                            {
                              item.datasets[0].data[
                                item.datasets[0].data.length - 1
                              ]
                            }
                          </span>
                        </div>
                        <div className="basis-1/3  flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">Benchmark : </span>
                          <span className="italic text-gray-700"> </span>
                        </div>
                      </div>
                    </div>
                    {/* Chart built with Chart.js 3 */}
                    <div className="grow max-sm:max-h-[500px] xl:max-h-[500px]">
                      {/* Change the height attribute to adjust the chart height */}
                      <MainTrend data={item} width={389} height={500} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white">
                  <div className="px-5 pt-5 flex items-center justify-between">
                    <div>
                      <div className="sm:flex sm:justify-between sm:items-center mb-8">
                        {/* Right: Actions */}
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                          {/* Filter button */}

                          {/* Datepicker built with flatpickr */}
                          {/* <Datepicker /> */}
                          {/* Add view button */}
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
                          {item.name}
                        </div>
                      </div>{" "}
                      <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
                        {date}
                      </div>
                      <button
                        className="my-2 px-4  py-1.5 text-xs shadow-md rounded-md bg-blue-500 text-white hover:scale-105 transition-all ease-in-out duration-200"
                        onClick={() => download(item.name)}
                      >
                        Download Chart
                      </button>
                    </div>
                  </div>
                  <div
                    className="flex flex-col gap-3 border-2 border-black/40 mx-1 bg-white"
                    id="my-node"
                  >
                    {" "}
                    <div className="mt-3">
                      <div className="flex items-center justify-between px-3 border-b-2 pb-2 border-black/40">
                        {" "}
                        <img
                          src="/jsw.png"
                          className="h-14 w-18 mx-3 p-1"
                          alt=""
                        />
                        <p className="text-sm ">
                          {" "}
                          <span className="font-semibold">Form No</span>.
                          <span className="italic text-gray-700">
                            {" "}
                            VJNR/TQM/DM-006.00.20150526
                          </span>
                        </p>
                      </div>
                      <div className="flex border-b-2    border-black/40 px-3">
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                          <span className="font-semibold">Month / Year : </span>
                          <span className="italic text-gray-700">
                            {" "}
                            {`${date.split(" ")[1]} - ${date.split(" ")[3]}/${
                              Number(date.split(" ")[3]) + 1
                            }`}
                          </span>
                        </div>
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">Department : </span>
                          <span className="italic text-gray-700">
                            {" "}
                            Iron Making 5MT
                          </span>
                        </div>
                        <div className="basis-1/3  flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">
                            Checking Points{" "}
                          </span>
                        </div>
                      </div>
                      <div className="flex border-b-2    border-black/40 px-3">
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                          <span className="font-semibold">
                            Managing Point :{" "}
                          </span>
                          <span className="italic text-gray-700">
                            {" "}
                            {item.name}
                          </span>
                        </div>
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">Section : </span>
                          <span className="italic text-gray-700"> BF - 2</span>
                        </div>
                        <div className="basis-1/3  flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">
                            1. Total Oxygen, NM3/hr{" "}
                          </span>
                        </div>
                      </div>
                      <div className="flex border-b-2    border-black/40 px-3">
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                          <span className="font-semibold">
                            Unit Of Measurement :{" "}
                          </span>
                          <span className="italic text-gray-700">
                            {" "}
                            {item.unit}
                          </span>
                        </div>
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">Sub-Section : </span>
                          <span className="italic text-gray-700">
                            {" "}
                            Operation
                          </span>
                        </div>
                        <div className="basis-1/3  flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">
                            2. SP.Moisture Input, Kg/Thm{" "}
                          </span>
                        </div>
                      </div>
                      <div className="flex border-b-2    border-black/40 px-3">
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                          <span className="font-semibold">
                            Current Value :{" "}
                          </span>
                          <span className="italic text-gray-700">
                            {
                              item.datasets[0].data[
                                item.datasets[0].data.length - 1
                              ]
                            }
                          </span>
                        </div>
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">Benchmark : </span>
                          <span className="italic text-gray-700"> </span>
                        </div>
                        <div className="basis-1/3  flex items-center  h-[40px] ml-4"></div>
                      </div>
                      <div className="flex border-b-2    border-black/40 px-3">
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px]">
                          <span className="font-semibold">Target Value : </span>
                          <span className="italic text-gray-700">4250</span>
                        </div>
                        <div className="basis-1/3 border-r-2 border-black/40 flex items-center  h-[40px] ml-4">
                          <span className="font-semibold">Frequency : </span>
                          <span className="italic text-gray-700"> Daily</span>
                        </div>
                        <div className="basis-1/3  flex items-center  h-[40px] ml-4"></div>
                      </div>
                    </div>
                    {/* Chart built with Chart.js 3 */}
                    <div className="grow max-sm:max-h-[500px] xl:max-h-[500px]">
                      {/* Change the height attribute to adjust the chart height */}
                      <MainTrend data={item} width={389} height={500} />
                    </div>
                  </div>
                </div>
              ))
          )}
        </>
      )}
    </div>
  );
}

export default DashboardMain;
