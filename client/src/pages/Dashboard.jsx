import React, { useContext, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";

import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";
import DashboardCard04 from "../partials/dashboard/DashboardCard04";

import DashboardCard06 from "../partials/dashboard/DashboardCard06";
import DashboardCard07 from "../partials/dashboard/DashboardCard07";

import DashboardCard14 from "../partials/dashboard/DashboardCard14";
import D15 from "../partials/dashboard/d15";
import D16 from "../partials/dashboard/D16";
import DashboardExtra from "../partials/dashboard/Dashboardextra";
import DashboardMain from "../partials/dashboard/DashboardMain";
import { AccountContext } from "../context/context";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mainData } = useContext(AccountContext);

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
            <WelcomeBanner />

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <DashboardMain mainData={mainData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
