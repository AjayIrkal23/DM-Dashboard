import React from "react";

const Charging = () => {
  return (
    <div className="flex flex-col justify-center border border-black/40 p-1 rounded-md   !text-xs bg-[whitesmoke] shadow-md">
      <div className="flex text-xs justify-between px-1  pb-2 items-center border-black/40 pt-1 italic pr-2 ">
        <p>Charging Gap Time</p>
        <p>-</p>
        <p className="font-semibold">25</p>
      </div>
    </div>
  );
};

export default Charging;
