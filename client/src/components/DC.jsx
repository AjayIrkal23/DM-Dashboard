import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { roundOff } from "../utils/roundoff";

const DC = ({ open, setOpen, setTitle }) => {
  const { period, setPeriod, data } = useContext(AccountContext);

  function DCProcessTime(a) {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.pacing?.f_DCProcessTimeAct) * 100) * -1) /
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
            accumulator + currentValue.f_DCProcessTimeAct,
          0
        );

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  function DCGapTime(a) {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_DCGapTimeAct) * 100) * -1) / 100
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
            accumulator + currentValue.f_DCGapTimeAct,
          0
        );

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2 ">
        <p>DC Gap Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(DCGapTime())}</p>
      </div>
      <div className="flex text-xs justify-between px-1  pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p>Dc Process Time</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(DCProcessTime())}</p>
      </div>
    </div>
  );
};

export default DC;
