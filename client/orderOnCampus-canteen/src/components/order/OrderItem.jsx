import React from "react";

function OrderItem() {
  return (
    <div className="flex items-center justify-between p-5 border border-gray-200">
      <div className="flex flex-col">
        <p className="text-green-900">Hash Brownie</p>
        <p className="text-gray-500 font-light">desserts</p>
      </div>
      <div>
        <p className="text-black font-semibold">₹90.63</p>
      </div>
    </div>
  );
}

export default OrderItem;
