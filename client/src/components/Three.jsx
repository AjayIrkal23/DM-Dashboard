import React, { useContext } from "react";
import { AccountContext } from "../context/context";
import { roundOff } from "../utils/roundoff";

const Three = ({ open, setOpen }) => {
  function Passes(fw, sy) {
    const { period, setPeriod, data } = useContext(AccountContext);
    if (period == "Last Coil" || period.customp) {
      if (fw == 3 && data?.Excel?.i_R2PassAct == 3) {
        let value = 1;
        return value;
      } else if (fw == 5 && data?.Excel?.i_R2PassAct == 5) {
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
      if (fw == 3) {
        let total1 =
          data?.Excel.length > 1 &&
          data?.Excel?.reduce((accumulator, currentValue) => {
            if (currentValue.i_R2PassAct == 3) {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);
        if (fw == 3 && sy == "%") {
          return (total1 / data?.Excel.length) * 100;
        } else {
          return total1;
        }
      } else if (fw == 5) {
        let total1 =
          data?.Excel.length > 1 &&
          data?.Excel?.reduce((accumulator, currentValue) => {
            if (currentValue.i_R2PassAct == 5) {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);

        if (fw == 5 && sy == "%") {
          return (total1 / data?.Excel.length) * 100;
        } else {
          return total1;
        }
      } else if (fw == 3) {
        let total1 =
          data?.Excel.length > 1 &&
          data?.Excel?.reduce((accumulator, currentValue) => {
            if (currentValue.i_FceNum == 3) {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);
        return total1;
      } else {
        return 0;
      }
    } else {
      return "--";
    }
  }
  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1 ">
        <p>% of R2 3Passes Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(Passes(3, "%"))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1 ">
        <p>R2 3Passes Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(Passes(3))}</p>
      </div>
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-1 ">
        <p>R2 5Passes Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(Passes(5))}</p>
      </div>
      <div className="flex text-xs justify-between px-1  pb-1 items-center pt-1 italic pr-2 ">
        <p>% of R2 5Passes Count</p>
        <p>-</p>
        <p className="font-semibold">{roundOff(Passes(5, "%"))}</p>
      </div>
    </div>
  );
};

export default Three;
