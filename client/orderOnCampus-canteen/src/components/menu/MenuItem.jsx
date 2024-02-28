import React, { useState } from "react";
import EditItemForm from "./EditItemForm";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Switch from "@mui/material/Switch";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[900],
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[600],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

function MenuItem({ menuItem }) {
  const [editForm, setEditForm] = useState(false);
  const editItem = () => {
    setEditForm(true);
  };
  return (
    <>
      <div className="flex items-center justify-between p-2 border border-gray-200 max-h-20 min-h-20 lg:max-h-20 lg:min-h-20">
        <div className="flex flex-col min-w-[30%] lg:min-w-[0]">
          <p className="text-green-900">{menuItem.name}</p>
          <p className="text-gray-500 font-light">{menuItem.description}</p>
          <p className="text-black font-light">₹{menuItem.price}</p>
        </div>
        <div className="flex items-center">
          <GreenSwitch {...label} defaultChecked />
        </div>
        <div className="flex items-center justify-evenly gap-5">
          <button
            onClick={editItem}
            className=" px-5 py-2 bg-green-900 text-white rounded-md hover:bg-white hover:text-black hover:border hover:border-black"
          >
            edit
          </button>
          <button className=" px-5 py-2 bg-green-900 text-white rounded-md hover:bg-white hover:text-black hover:border hover:border-black">
            delete
          </button>
        </div>
      </div>
      <EditItemForm editForm={editForm} setEditForm={setEditForm} />
    </>
  );
}

export default MenuItem;
