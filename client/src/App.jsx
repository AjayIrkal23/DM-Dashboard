import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, Link, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./css/style.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useIdleTimer } from "react-idle-timer";
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";

import { AccountContext } from "./context/context";
import History from "./pages/History";
import Login from "./pages/Login";
import DataSelect from "./pages/DataSelect";

function App() {
  const location = useLocation();
  const { mainData, user, setUser } = useContext(AccountContext);
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  const [isIdle, setIsIdle] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
  };

  // Handle user inactivity
  const onIdle = () => {
    setIsIdle(true);
    console.log("hello");
  };

  // Reset the idle state when user becomes active
  const onActive = () => {
    setIsIdle(false);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    timeout: 10_000,
    throttle: 500,
  });

  useEffect(() => {
    // You can start the slideshow when the application becomes inactive
    if (isIdle) {
      // Your logic to start the slideshow
      console.log("Slideshow started!");
    }
  }, [isIdle]);

  return (
    <>
      {isIdle ? (
        <div className="overflow-hidden m-1">
          {/* Your image slider */}
          <Slider {...settings}>
            <div className="w-screen h-screen">
              <img
                src="/1.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/3.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/4.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/5.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/6.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/7.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/8.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/9.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/10.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/11.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/12.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/13.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/14.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-screen h-screen">
              <img
                src="/2.jpeg"
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
          </Slider>
        </div>
      ) : (
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
                {/* <Route
                  path="/history"
                  exact
                  element={
                    user == "admin" ? <History /> : <Navigate to="/login" />
                  }
                /> */}

                <Route
                  path="/dataSelect"
                  exact
                  element={
                    user == "admin" ? <DataSelect /> : <Navigate to="/login" />
                  }
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
      )}
    </>
  );
}

export default App;
