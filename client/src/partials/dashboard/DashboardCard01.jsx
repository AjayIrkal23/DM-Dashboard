import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../../components/DropdownEditMenu";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import { getLabels } from "../../utils/roundoff";
import { AccountContext } from "../../context/context";

function DashboardCard01() {
  const [dataLine, setDataLine] = useState(null);
  const [lab, setLab] = useState(null);
  const [data, setData] = useState(null);
  const { eightData } = useContext(AccountContext);

  const getData = () => {
    const data = eightData?.map((item) => item?.data?.Total_Coils);
    setData(data);
  };

  console.log(data);

  useEffect(() => {
    setDataLine(getLabels());
    getData();
  }, [eightData]);

  console.log(dataLine);

  const chartData = {
    labels: dataLine,
    datasets: [
      // Indigo line
      {
        label: "Shift Coils",
        data: data,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.blue[500],
        borderWidth: 2,
        pointStyle: "circle",
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      // Gray line
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3  dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 pb-2 bg-blue-100">
      <div className="px-5 pt-5 flex items-center justify-between">
        <div>
          {" "}
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
            Current Shift Coils
          </div>
          <div className="flex items-start">
            <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
              80
            </div>
          </div>
        </div>

        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src="/coil.png" width="90" height="90" alt="Icon 01" />
          {/* Menu button */}
        </header>
      </div>
      {/* Chart built with Chart.js 3 */}
      {dataLine ? (
        <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
          {/* Change the height attribute to adjust the chart height */}
          <LineChart data={chartData} width={389} height={128} title="Coils" />
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}

export default DashboardCard01;
