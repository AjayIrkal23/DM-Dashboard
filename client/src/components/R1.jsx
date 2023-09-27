import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { roundOff } from "../utils/roundoff";

const R1 = ({ open, setOpen }) => {
  const { period, setPeriod, data } = useContext(AccountContext);
  function R1GapTimeAct() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_R1GapTimeAct) * 100) * -1) / 100
      );
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_R1GapTimeAct,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  function TravelDelay() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_SSPR1TravelTimeDelay) * 100) * -1) /
        100
      );
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_SSPR1TravelTimeDelay,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  function ProcessDelay() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_R1ProcessTimeDelay) * 100) * -1) /
        100
      );
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_R1ProcessTimeDelay,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  function R1ProcessTimeAct(a) {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_R1ProcessTimeAct) * 100) * -1) / 100
      );
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_R1ProcessTimeAct,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      if (a == "a") {
        let value1 = total1 / data?.pacing?.length;
        return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
      } else {
        return (Math.floor(Math.abs(total1) * 100) * -1) / 100;
      }
    } else {
      return "--";
    }
  }

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p>R1 Gap Time Actual </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(R1GapTimeAct())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p>R1 Process Time Actual</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(R1ProcessTimeAct())}</p>
      </div>
      {period !== "Last Coil" && (
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
          <p>R1 Process Time Average</p>
          <p>-</p>
          <p className="font-semibold ">{roundOff(R1ProcessTimeAct("a"))}</p>
        </div>
      )}

      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p>R1 Travel Delay</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(TravelDelay())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 pb-1 items-center pt-1 italic pr-2 b ">
        <p>R1 Process Delay</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(ProcessDelay())}</p>
      </div>
    </div>
  );
};

export default R1;
