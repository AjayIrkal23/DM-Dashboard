import React, { useContext } from "react";
import { AccountContext } from "../context/context";

const BottleNeck = () => {
  const { period, setPeriod, data } = useContext(AccountContext);
  function BN(b) {
    if (period == "Last Coil" || period.customp) {
      if (b == "R1" || b == "R2") {
        if (data?.pacing?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "R1R2") {
          return 1;
        } else {
          return 0;
        }
      } else if (b == "FCE") {
        if (data?.pacing?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "FCE") {
          return 1;
        } else {
          return 0;
        }
      } else if (b == "FM") {
        if (data?.pacing?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "FM") {
          return 1;
        } else {
          return 0;
        }
      } else if (b == "DC") {
        if (data?.pacing?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "DC") {
          return 1;
        } else {
          return 0;
        }
      }
    } else if (
      period == "Last 5 Coil" ||
      period == "Last Hour" ||
      period == "Last Day" ||
      period?.date
    ) {
      if (b == "R1" || b == "R2") {
        let total1 =
          data?.pacing?.length > 1 &&
          data?.pacing?.reduce((accumulator, currentValue) => {
            if (
              currentValue?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "R1R2"
            ) {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);

        return total1;
      }
      if (b == "FCE") {
        let total1 =
          data?.pacing?.length > 1 &&
          data?.pacing?.reduce((accumulator, currentValue) => {
            if (
              currentValue?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "FCE"
            ) {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);

        return total1;
      }
      if (b == "FM") {
        let total1 =
          data?.pacing?.length > 1 &&
          data?.pacing?.reduce((accumulator, currentValue) => {
            if (currentValue?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "FM") {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);

        return total1;
      }
      if (b == "DC") {
        let total1 =
          data?.pacing?.length > 1 &&
          data?.pacing?.reduce((accumulator, currentValue) => {
            if (currentValue?.c_BottleNeck?.replace(/^\s+|\s+$/g, "") == "DC") {
              accumulator = accumulator + 1;
            }
            return accumulator;
          }, 0);

        return total1;
      }
    } else {
      return "--";
    }
  }
  return (
    <div className="flex flex-col justify-center border border-black/40     !text-xs bg-[whitesmoke] shadow-md pr-[0.25px]">
      <div className="flex text-xs justify-between px-1 border-b pb-2 items-center border-black/40 pt-1 italic pr-2">
        <p className="!text-center w-full">Bottle Neck</p>
      </div>
      <div className="flex">
        <div className="flex flex-col text-center border-r border-black/40 w-[50px]">
          <p className="border-b border-black/40 px-2 pb-1 text-center text-xs">
            FCE
          </p>
          <p className="pt-1 pb-1">{BN("FCE")}</p>
        </div>

        <div className="flex flex-col text-center border-r border-black/40 w-[50px]">
          <p className="border-b border-black/40 px-2 pb-1 text-center text-xs">
            R1
          </p>
          <p className="pt-1 pb-1">{BN("R1")}</p>
        </div>
        <div className="flex flex-col text-center border-r border-black/40 w-[50px]">
          <p className="border-b border-black/40 px-2 pb-1 text-center text-xs">
            R2
          </p>
          <p className="pt-1 pb-1">{BN("R2")}</p>
        </div>
        <div className="flex flex-col text-center border-r border-black/40 w-[50px]">
          <p className="border-b border-black/40 px-2 pb-1 text-center text-xs">
            FM
          </p>
          <p className="pt-1 pb-1">{BN("FM")}</p>
        </div>
        <div className="flex flex-col text-center  border-black/40 border-r-0w-[50px]">
          <p className="border-b border-black/40 px-2 pb-1 text-center text-xs">
            DC
          </p>
          <p className="pt-1 pb-1">{BN("DC")}</p>
        </div>
      </div>
    </div>
  );
};

export default BottleNeck;
