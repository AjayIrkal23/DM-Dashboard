import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";

import { AccountContext } from "./context/context";
import History from "./pages/History";

function App() {
  const location = useLocation();
  const { mainData } = useContext(AccountContext);
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {mainData?.length > 0 ? (
        <>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/history" element={<History />} />
          </Routes>
        </>
      ) : (
        <div className="bg-blue-500 font-semibold text-[60px] text-center  text-white w-screen h-screen justify-center items-center flex flex-col">
          <p>No Data Found Please Check if Backend is on </p>
          <Link
            to={"/liveDashboard"}
            className="my-2 underline"
            onClick={() => setPeriod("Last Coil")}
          >
            Go Back
          </Link>
        </div>
      )}
    </>
  );
}

export default App;
