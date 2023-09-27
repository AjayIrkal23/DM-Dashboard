import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { roundOff } from "../utils/roundoff";

const FM = ({ open, setOpen }) => {
  const { period, setPeriod, data } = useContext(AccountContext);
  function FMEPredicted() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(
          Math.abs(
            data?.pacing?.f_FMProcessTimePred - data?.pacing?.f_FMProcessTimeAct
          ) * 100
        ) *
          -1) /
        100
      );
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_FMProcessTimePred,
          0
        );

      let total2 =
        data?.pacing.length > 1 &&
        data?.pacing?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.f_FMProcessTimeAct,
          0
        );

      console.log(total1);

      let value1 = (total1 - total2) / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  function FMProcessTime(a) {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_FMProcessTimeAct) * 100) * -1) / 100
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
            accumulator + currentValue.f_FMProcessTimeAct,
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

  function FMGapTime(a) {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_F1GapTimeAct) * 100) * -1) / 100
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
            accumulator + currentValue.f_F1GapTimeAct,
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

  function FMProcessDelay() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_R1R2TravelTimeDelay) * 100) * -1) /
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
            accumulator + currentValue.f_R1R2TravelTimeDelay,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  function FMTravelDelay() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_R1R2TravelTimeDelay) * 100) * -1) /
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
            accumulator + currentValue.f_R1R2TravelTimeDelay,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p>FM Predicted Gap Time </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FMEPredicted())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p>FM Travel Delay </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FMTravelDelay())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p>FM Process Time Actual</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FMProcessTime())}</p>
      </div>
      {period !== "Last Piece" && (
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
          <p>FM Process Time Average</p>
          <p>-</p>
          <p className="font-semibold ">{roundOff(FMProcessTime("a"))}</p>
        </div>
      )}

      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p>FM Gap Time Average</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(FMGapTime("a"))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p>Role Change Delay</p>
        <p>-</p>
        <p className="font-semibold ">3</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b items-center border-black/40 pt-1 italic pr-2">
        <p>FM Process Delay Time </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FMProcessDelay())}</p>
      </div>
    </div>
  );
};

export default FM;
