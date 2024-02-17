import React from "react";
import OrderItem from "./OrderItem";

function OrderDetails() {
  return (
    <div className="flex flex-col">
      {/* order number */}
      <div className="flex items-center justify-between p-5 bg-gray-300">
        <p className="text-green-900">#O234567890</p>
        <p className="text-gray-500 font-light">29 april 24</p>
        <p className="text-gray-500 font-light">2 items for 765.43</p>
      </div>
      {/* items */}
      <div className="flex flex-col gap-y-5 mt-5">
        <OrderItem />
        <OrderItem />
      </div>
      {/* buttons */}
      <div className="flex justify-evenly items-center p-5">
        <button className="py-2 px-5 lg:px-28 rounded-lg bg-white border border-green-900 text-green-900">
          Reject Order
        </button>
        <button className="py-2 px-5 lg:px-28 rounded-lg bg-green-900 text-white">
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;
