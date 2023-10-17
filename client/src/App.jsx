import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation, Link, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";

import { AccountContext } from "./context/context";
import History from "./pages/History";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  const { mainData, user, setUser } = useContext(AccountContext);
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
            <Route
              path="/"
              exact
              element={
                user == "admin" ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/history"
              exact
              element={user == "admin" ? <History /> : <Navigate to="/login" />}
            />

            <Route path="/login" element={<Login />} />
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
