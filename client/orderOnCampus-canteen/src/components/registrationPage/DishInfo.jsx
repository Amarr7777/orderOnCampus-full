import React from "react";

function DishInfo() {
  return (
    <div className="h-fit mx-10  rounded-lg bg-white p-5">
      <div className="flex flex-col my-5 py-5 space-y-5 px-20 rounded-md">
        <h6 className="text-green-950">Dish Information</h6>
        <input
          type="text"
          placeholder="Dish Name"
          className="py-3 px-2 rounded-md border border-green-950"
        />
        <textarea
          id="description"
          placeholder="Description(Optional)"
          className="w-full px-3 py-2 border border-green-950 rounded-md focus:outline-none focus:ring focus:border-green-900"
          rows="3"
        ></textarea>
        {/* <select className="py-3 px-2 rounded-md border border-green-950 h-10">
          <option value="">Category</option>
          <option value="ALL">All</option>
          <option value="BR">Breakfast</option>
          <option value="LN">Lunch</option>
          <option value="SN">Snacks</option>
        </select> */}
        <input
          type="number"
          placeholder="Price"
          className="py-3 px-2 rounded-md border border-green-950"
        />
        <input
          type="Text"
          placeholder="Image url"
          className="py-3 px-2 rounded-md border border-green-950"
        />
      </div>
      <br />
    </div>
  );
}

export default DishInfo;
