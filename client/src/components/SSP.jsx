import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { roundOff } from "../utils/roundoff";

const SSP = ({ open, setOpen }) => {
  const { period, setPeriod, data } = useContext(AccountContext);
  function SSPUse(fw, sy) {
    if (period == "Last Coil" || period.customp) {
      if (data?.Excel?.i_SSPUse == fw) {
        let value = 1;
        return value;
      } else {
        return 0;
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      let total1 =
        data?.Excel.length > 1 &&
        data?.Excel?.reduce((accumulator, currentValue) => {
          if (currentValue.i_SSPUse == fw) {
            accumulator = accumulator + 1;
          }
          return accumulator;
        }, 0);
      if (sy == "%" && fw == 1) {
        return (total1 / data?.Excel.length) * 100;
      } else {
        return total1;
      }
    } else {
      return "--";
    }
  }

  function GapTime() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_SSPGapTimeAct) * 100) * -1) / 100
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
            accumulator + currentValue.f_SSPGapTimeAct,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  function SSPProcess() {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_SSPProcessTimeDelay) * 100) * -1) /
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
            accumulator + currentValue.f_SSPProcessTimeDelay,
          0
        );

      console.log(total1);

      let value1 = total1 / data?.pacing?.length;

      return (Math.floor(Math.abs(value1) * 100) * -1) / 100;
    } else {
      return "--";
    }
  }

  function SSPProcessTime(a) {
    if (period == "Last Coil" || period.customp) {
      return (
        (Math.floor(Math.abs(data?.Excel?.f_SSPProcessTimeAct) * 100) * -1) /
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
            accumulator + currentValue.f_SSPProcessTimeAct,
          0
        );

      console.log(total1);

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
        <p>% of SSP Usage </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(SSPUse(1, "%"))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p>SSP Use </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(SSPUse(1))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p>SSP No Use </p>
        <p>-</p>
        <p className="font-semibold">{roundOff(SSPUse(0))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p>SSP Process Delay</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(SSPProcess())}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
        <p>SSP Process Time</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(SSPProcessTime())}</p>
      </div>
      {period !== "Last Piece" && (
        <div className="flex text-xs justify-between px-1 border-b pb-2 items-center pt-1 italic pr-2 border-black/40">
          <p>Process Time Average</p>
          <p>-</p>
          <p className="font-semibold ">{roundOff(SSPProcessTime("a"))}</p>
        </div>
      )}

      <div className="flex text-xs justify-between px-1 pb-1 items-center pt-1 italic pr-2 b ">
        <p>Gap Time Actual</p>
        <p>-</p>
        <p className="font-semibold ">{roundOff(GapTime())}</p>
      </div>
    </div>
  );
};

export default SSP;
