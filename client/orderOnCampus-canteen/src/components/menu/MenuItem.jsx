import React, { useState } from "react";
import EditItemForm from "./EditItemForm";

function MenuItem() {
  const [editForm, setEditForm] = useState(false);
  const editItem = () => {
    setEditForm(true);
  };
  return (
    <>
      <div className="flex items-center justify-between p-5 border border-gray-200 max-h-20 min-h-20 lg:max-h-20 lg:min-h-20">
        <div className="flex flex-col">
          <p className="text-green-900">Hash Brownie</p>
          <p className="text-gray-500 font-light">desserts</p>
          <p className="text-black font-light">₹90.63</p>
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
