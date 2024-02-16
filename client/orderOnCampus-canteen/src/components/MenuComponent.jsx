import React, { useState } from "react";
import MenuItem from "./MenuItem";
import AddNewItem from "./AddNewItem";

function MenuComponent() {
  const[addNewForm, setAddNewForm] = useState(false);

  const addNewItem = () => {
    setAddNewForm(true);
  };
  return (
    <>
    <div className="flex flex-col m-10 gap-5 w-full">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="search for items"
          className="lg:w-1/6 rounded-md py-2 px-5 border border-gray-500 bg-gray-200"
        />
        <button
          onClick={addNewItem}
          className="flex items-center gap-1 text-white bg-green-900 px-5 py-2 rounded-md hover:bg-white hover:text-black hover:border hover:border-black"
        >
          Add new item
        </button>
      </div>
      <div
        className="grid overflow-y-scroll h-1/2 rounded-md bg-white w-full gap-4 p-5 lg:grid lg:gap-8"
        style={{ minHeight: "70vh", maxHeight: "70vh" }}
      >
        <MenuItem  />
      </div>
    </div>
      <AddNewItem addNewForm={addNewForm}  setAddNewForm={setAddNewForm}/>
      </>
  );
}

export default MenuComponent;
