import React from "react";

function OrderList() {
  return (
    <div className="flex flex-col items-start gap-2 p-5 shadow-lg rounded mt-2 hover:shadow-md hover:shadow-green-900">
      <h6 className="text-gray-600">KOMAL BHAJIYAWALA</h6>
      <h6 className="text-green-900 font-semibold">5767</h6>
      <p className="text-sm font-light">2 items for ₹748.54</p>
    </div>
  );
}

export default OrderList;
