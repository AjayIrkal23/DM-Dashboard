import React, { useContext, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import DashboardAvatars from "../partials/dashboard/DashboardAvatars";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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

function createData(
  name,
  UOM,
  from,
  to,
  Responsibility,
  Monitoring_Method,
  Frequency,
  Checking_Kpi,
  UOM2,
  from1,
  to1,
  Responsibility1,
  Method1,
  Frequency1
) {
  return {
    name,
    UOM,
    from,
    to,
    Responsibility,
    Monitoring_Method,
    Frequency,
    Checking_Kpi,
    UOM2,
    from1,
    to1,
    Responsibility1,
    Method1,
    Frequency1,
  };
}

const rows = [
  createData(
    "Production",
    "TPD",
    3658,
    3750,
    "Mr. Hari Krishna",
    "Trend Chart",
    "Daily",
    "Total Oxygen",
    "NM3/HR",
    42225,
    43287,
    "Mr. Hari Krishna",
    "Control Chart",
    "Daily"
  ),
  createData(
    "Production",
    "TPD",
    3658,
    3750,
    "Mr. Hari Krishna",
    "Trend Chart",
    "Daily",
    "Total Moister Input",
    "Kg/Thm",
    47.2,
    42.4,
    "Mr. Hari Krishna",
    "Control Chart",
    "Daily"
  ),
  createData(
    "Quality Index of HM -5MT",
    "%",
    90.8,
    91.8,
    "Mr. Hari Krishna",
    "Trend Chart",
    "Daily",
    "HM Silicon",
    "%",
    0.74,
    0.6,
    "Mr. Hari Krishna",
    "Control Chart",
    "Daily"
  ),
  createData(
    "Quality Index of HM -5MT",
    "%",
    90.8,
    91.8,
    "Mr. Hari Krishna",
    "Trend Chart",
    "Daily",
    "HM Sulphur",
    "%",
    0.05,
    "0.050",
    "Mr. Hari Krishna",
    "Control Chart",
    "Daily"
  ),
  createData(
    "Quality Index of HM -5MT",
    "%",
    90.8,
    91.8,
    "Mr. Hari Krishna",
    "Trend Chart",
    "Daily",
    "HM Temperature",
    "deg C",
    1499,
    1490,
    "Mr. Hari Krishna",
    "Control Chart",
    "Daily"
  ),

  createData(
    "Fuel Rate",
    "Kg-Thm",
    560,
    556,
    "Mr. Hari Krishna",
    "Trend Chart",
    "Daily",
    "ETA CO",
    "%",
    46.4,
    47.2,
    "Shift Manager",
    "Control Chart",
    "Daily"
  ),
  createData(
    "Fuel Rate",
    "Kg-Thm",
    560,
    556,
    "Mr. Hari Krishna",
    "Trend Chart",
    "Daily",
    "SP. AL203",
    "Kg/Thm",
    74.9,
    72.5,
    "Shift Manager",
    "Control Chart",
    "Daily"
  ),

  createData(
    "Coal Rate",
    "Kg-Thm",
    137,
    156,
    "Mr. Hari Krishna",
    "Trend Chart",
    "Daily",
    "CWI",
    "No.",
    2.48,
    2.52,
    "Shift Manager",
    "Control Chart",
    "Daily"
  ),

  createData(
    "Coal Rate",
    "Kg-Thm",
    137,
    156,
    "Mr. Hari Krishna",
    "Trend Chart",
    "Daily",
    "Heat Loss",
    "Gl/Hr",
    56,
    60,
    "Shift Manager",
    "Control Chart",
    "Daily"
  ),

  createData(
    "Coal Rate",
    "Kg-Thm",
    137,
    156,
    "Mr. Hari Krishna",
    "Trend Chart",
    "Daily",
    "Coke CSR",
    "No.",
    65.4,
    67.5,
    "CFM",
    "Control Chart",
    "Daily"
  ),
];

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { mainData, setChart, chart } = useContext(AccountContext);
  const setDataCharts = (row) => {
    if (row.name == "Production") {
      setChart({
        main: row.name,
        ckpi: ["Total Oxygen", "Total Moisture Input"],
        target: 3658,
      });
    } else if (row.name == "Quality Index of HM -5MT") {
      setChart({
        main: row.name,
        ckpi: ["HM Si", "HM S", "HM Temp"],
        target: 0.91,
      });
    } else if (row.name == "Fuel Rate") {
      setChart({
        main: row.name,
        ckpi: ["Al2O3 Input", "ETA CO"],
        target: 556,
      });
    } else if (row.name == "Coal Rate") {
      setChart({
        main: row.name,
        ckpi: ["Stack heat loss", "Coke CSR", "CWI"],
        target: 156,
      });
    }

    navigate("/");
  };

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
            <WelcomeBanner p={"Please Select the Parameter"} />

            {/* Cards */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="!font-bold">Managing KPI</TableCell>
                    <TableCell className="!font-bold" align="center">
                      UOM
                    </TableCell>
                    <TableCell className="!font-bold " align="center">
                      <div className="!font-bold text-center " align="right">
                        Target
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <div className="!font-bold !text-xs" align="right">
                          From
                        </div>
                        <div className="!font-bold !text-xs" align="right">
                          -
                        </div>
                        <div className="!font-bold !text-xs" align="right">
                          To
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="!font-bold  " align="center">
                      Responsibility
                    </TableCell>
                    <TableCell className="!font-bold" align="center">
                      Monitoring Method
                    </TableCell>
                    <TableCell className="!font-bold" align="center">
                      Frequency
                    </TableCell>
                    <TableCell className="!font-bold" align="center">
                      Checking KPI
                    </TableCell>
                    <TableCell className="!font-bold" align="center">
                      UOM
                    </TableCell>
                    <TableCell className="!font-bold " align="center">
                      <div className="!font-bold text-center " align="center">
                        Target
                      </div>
                      <div className="flex justify-center items-center gap-2">
                        <div className="!font-bold !text-xs" align="right">
                          From
                        </div>
                        <div className="!font-bold !text-xs" align="right">
                          -
                        </div>
                        <div className="!font-bold !text-xs" align="right">
                          To
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="!font-bold  " align="center">
                      Responsibility
                    </TableCell>
                    <TableCell className="!font-bold" align="center">
                      Monitoring Method
                    </TableCell>
                    <TableCell className="!font-bold" align="center">
                      Frequency
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow
                      onClick={(e) => setDataCharts(row)}
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      className="hover:bg-gray-200 cursor-pointer transition-all ease-in-out duration-200 hover:scale-[1.01]"
                    >
                      <TableCell
                        component="th"
                        className="!font-bold"
                        scope="row"
                      >
                        {row.name}
                      </TableCell>{" "}
                      <TableCell align="center">{row.UOM}</TableCell>
                      <TableCell className="" align="center">
                        <div className="flex justify-center items-center gap-2 ">
                          <div className="" align="right">
                            {row.from}
                          </div>
                          <div className=" " align="right">
                            -
                          </div>
                          <div className=" " align="right">
                            {row.to}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center">{row.Responsibility}</TableCell>
                      <TableCell align="center">
                        {row.Monitoring_Method}
                      </TableCell>
                      <TableCell align="center">{row.Frequency}</TableCell>
                      <TableCell align="center">{row.Checking_Kpi}</TableCell>
                      <TableCell align="center">{row.UOM2}</TableCell>
                      <TableCell className="" align="center">
                        <div className="flex justify-center items-center gap-2">
                          <div className="" align="right">
                            {row.from}
                          </div>
                          <div className=" " align="right">
                            -
                          </div>
                          <div className=" " align="right">
                            {row.to}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        {row.Responsibility1}
                      </TableCell>
                      <TableCell align="center">{row.Method1}</TableCell>
                      <TableCell align="center">{row.Frequency1}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
