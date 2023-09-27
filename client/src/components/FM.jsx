import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { roundOff } from "../utils/roundoff";

const FM = ({ open, setOpen }) => {
  const { period, setPeriod, data } = useContext(AccountContext);
  function FmRockManCount() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.i_FMEntryOpInhibit) * 100) * -1) / 100
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
            accumulator + currentValue.i_FMEntryOpInhibit,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  function FmRockAutoCount() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.i_FMEntryOpInhibit) * 100) * -1) / 100
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
            accumulator + currentValue.i_FMEntryOpInhibit,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  function ManualRockMin() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.i_FMEntryOpInhibit) * 100) * -1) / 100
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
            accumulator + currentValue.i_FMEntryOpInhibit,
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
        <p>FM Rocking Man Count </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FmRockManCount())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p>FM Rocking Auto Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(FmRockAutoCount())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p>Manual Rock Time </p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(ManualRockMin())}</p>
      </div>
      <div className="flex text-xs justify-between px-1  pb-2 items-center pt-1 italic pr-2 ">
        <p>Manual Rock Time </p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(ManualRockMin())}</p>
      </div>
    </div>
  );
};

export default FM;
