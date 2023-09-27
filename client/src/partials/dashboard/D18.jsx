import React from "react";
import BarChart from "../../charts/BarChart01";

// Import utilities
import { tailwindConfig } from "../../utils/Utils";

function D18() {
  const chartData = {
    labels: ["Runbacks", "Plates", "Kickback", "Cobbles", "Pressback"],
    datasets: [
      // Light blue bars
      {
        data: [8, 9, 1, 2, 6],
        backgroundColor: tailwindConfig().theme.colors.orange[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.orange[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Day Wise Rejects
        </h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={300} />
    </div>
  );
}

export default D18;
