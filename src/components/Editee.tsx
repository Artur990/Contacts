import React from "react";

const Editee = () => {
  return (
    <div className="w-full  bg-slate-400">
      <div className="flex m-1">
        <h3 className="w-1/4 text-left">Name:</h3>
        <input className="w-1/3 mr-2" />
        <input className="w-1/3" />
      </div>
      <div className="flex justify-between m-1">
        <h3 className="w-1/4 text-left">Twitter:</h3>
        <input className="w-3/4" />
      </div>
      <div className="flex justify-between m-1">
        <h3 className="w-1/4 text-left">Avatar url:</h3>
        <input className="w-3/4" />
      </div>
      <div className="flex justify-between m-1">
        <h3 className="w-1/4 text-left">Notes:</h3>
        <input className="w-3/4 h-10" />
      </div>
      <div className="flex m-1">
        <button className="w-12 h-5 bg-white rounded-md my-1 mr-2  text-xs ">
          Edit
        </button>
        <button className="w-12 h-5 bg-white rounded-md my-1  text-xs  ">
          Cancl
        </button>
      </div>
    </div>
  );
};

export default Editee;
