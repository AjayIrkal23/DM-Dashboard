import { Modal } from "@mui/material";
import React, { useContext, useState } from "react";

// Import utilities
import { tailwindConfig } from "../utils/Utils";
import BarChart01 from "../charts/BarChart01";

import GapChart from "../charts/GapChart";
import ProcessChart from "../charts/ProcessChart";
import ProcessStacked from "../charts/ProcessChartstacked";
import { AccountContext } from "../context/context";
const PieceID = ({ open, setOpen }) => {
  const [piece, setPiece] = useState(null);
  const { period, setPeriod } = useContext(AccountContext);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute  bg-white outline-none top-[25%] left-[50%] -translate-x-[50%] flex">
          <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                Please Enter The Piece ID
              </h2>
              <div>
                <input
                  type="text"
                  className="my-4 rounded-md  shadow-md"
                  value={piece}
                  onChange={(e) => setPiece(e.target.value)}
                  placeholder="Piece ID"
                  name=""
                  id=""
                />
              </div>
              <button
                className="bg-blue-500 px-6 py-1.5 rounded-md flex justify-center w-full text-white "
                onClick={() => {
                  setPeriod({ customp: piece });
                  setOpen(false);
                }}
              >
                {" "}
                Submit{" "}
              </button>
            </header>
            {/* Chart built with Chart.js 3 */}
            {/* Change the height attribute to adjust the chart height */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PieceID;
