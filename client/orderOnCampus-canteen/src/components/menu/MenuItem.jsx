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
        <label
          htmlFor="AcceptConditions"
          className="relative h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-green-900"
        >
          <input
            type="checkbox"
            id="AcceptConditions"
            className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
          />

          <span className="absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-900">
            <svg
              data-unchecked-icon
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>

            <svg
              data-checked-icon
              xmlns="http://www.w3.org/2000/svg"
              className="hidden h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>
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
