import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import BarChart01 from "../../charts/BarChart01";
import BarChart02 from "../../charts/BarChart02";
import RejBar from "../../charts/rejBar";
import { getLabels } from "../../utils/roundoff";
import { AccountContext } from "../../context/context";

function DashboardExtra() {
  const [dataLine, setDataLine] = useState(null);
  const [lab, setLab] = useState(null);
  const [data, setData] = useState(null);
  const [data4, setData4] = useState(null);
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [data5, setData5] = useState(null);
  const [data3, setData3] = useState(null);
  const { eightData } = useContext(AccountContext);

  const getData = () => {
    const data = eightData?.map((item) => item?.data?.Total_Cobbles);
    setData1(data);
  };

  const getData1 = () => {
    const data = eightData?.map((item) => item?.data?.Total_Kickbacks);
    setData2(data);
  };
  const getData5 = () => {
    const data = eightData?.map((item) => item?.data?.Total_Runbacks);
    setData5(data);
  };

  const getData2 = () => {
    const data = eightData?.map((item) => item?.data?.Total_Pressbacks);
    setData3(data);
  };

  const getData3 = () => {
    const data = eightData?.map((item) => item?.data?.Total_Plates);
    setData(data);
  };

  const getData4 = () => {
    let total = 0;

    const data = eightData?.forEach((num) => {
      total += num?.data?.Total_Rejects;
    });
    setData4(total);
  };

  console.log(data);

  useEffect(() => {
    setDataLine(getLabels());
    getData();
    getData1();
    getData2();
    getData5();
    getData3();
    getData4();
  }, [eightData]);

  console.log(dataLine);

  const chartData = {
    labels: dataLine,
    datasets: [
      // Indigo line
      {
        data: data2,
        label: "Runback",
        fill: true,
        backgroundColor: tailwindConfig().theme.colors.red[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.red[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },

      {
        data: data2,
        fill: true,
        label: "Kickback",
        backgroundColor: tailwindConfig().theme.colors.blue[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: data3,
        fill: true,
        backgroundColor: tailwindConfig().theme.colors.yellow[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.yellow[600],
        barPercentage: 0.66,
        label: "Pressback",
        categoryPercentage: 0.66,
      },
      {
        data: data1,
        fill: true,
        label: "Cobble",
        backgroundColor: tailwindConfig().theme.colors.pink[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.pink[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      {
        data: data,
        fill: true,
        label: "Plate ",
        backgroundColor: tailwindConfig().theme.colors.purple[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.purple[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Gray line
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3  dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 pb-2 bg-red-100">
      <div className="px-5 pt-5 flex items-center justify-between mt-4">
        <div>
          {" "}
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
            Current Shift Rejects
          </div>
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
              {data4}
            </div>
          </div>
        </div>

        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img
            src="/reject.png"
            width="80"
            className="mt-5"
            height="100"
            alt="Icon 01"
          />
          {/* Menu button */}
        </header>
      </div>
      {/* Chart built with Chart.js 3 */}
      {dataLine ? (
        <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
          {/* Change the height attribute to adjust the chart height */}
          <RejBar data={chartData} width={389} height={128} title="Rejects" />
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default DashboardExtra;
