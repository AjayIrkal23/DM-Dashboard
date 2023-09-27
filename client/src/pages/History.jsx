import React, { useContext, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import MonthPicker from "react-simple-month-picker";
import Dh from "../partials/dashboard/Dh";
import { AccountContext } from "../context/context";

const History = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setMonth, Month } = useContext(AccountContext);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full  mx-auto">
            {/* Welcome banner */}
            <h1 className="text-center text-blue-600 tracking-wider font-semibold italic text-xl my-5">
              History Data
            </h1>
            <div className=" h-[200px] border-b shadow-md mb-4 ">
              <MonthPicker
                onChange={(date) => {
                  setMonth(
                    `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`
                  );
                }}
              />
            </div>
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <Dh />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;
