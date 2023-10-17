import axios from "axios";
import { createContext, useState, useRef, useEffect } from "react";
import React from "react";
import toast from "react-hot-toast";

export const AccountContext = createContext(null);

export const Accountprovider = ({ children }) => {
  const [mainData, setMainData] = useState(null);
  const [user, setUser] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [Month, setMonth] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  console.log(historyData);

  console.log(user, "user");

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(async () => {
    // Your custom logic here

    await axios.get("http://localhost:8000/api/app").then((resp) => {
      setMainData(resp?.data);
      toast.dismiss();
      toast.success("Data Fetching Successfull");
    });
  }, 360000);

  const getData = async () => {
    await axios.get("http://localhost:8000/api/app").then((resp) => {
      setMainData(resp?.data);
      toast.dismiss();
      toast.success("Data Fetching Successfull");
    });
  };

  const getData1 = async () => {
    await axios
      .post("http://localhost:8000/api/app2", { month: Month })
      .then((resp) => {
        setHistoryData(resp?.data?.data);
        toast.dismiss();
        toast.success("Data Fetching Successfull");
      })
      .catch((e) => {
        toast.dismiss();
        toast.error("No Data Found");
        setHistoryData(null);
      });
  };

  useEffect(() => {
    getData1();
  }, [Month]);

  useEffect(() => {
    // Your custom logic here

    getData();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        mainData,
        historyData,
        setHistoryData,
        Month,
        setMonth,
        selectAll,
        setSelectAll,
        user,
        setUser,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
