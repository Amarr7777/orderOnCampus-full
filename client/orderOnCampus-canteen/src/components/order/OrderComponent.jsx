import React from "react";
import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";

function OrderComponent() {
  return (
    <div className="grid grid-cols-1 w-full gap-4 p-5 m-x-20 lg:grid-cols-3 lg:gap-8 ">
      <div
        className="lg:h-96  w-full  overflow-scroll   rounded-lg bg-white p-5"
        style={{ minHeight: "80vh", maxHeight: "80vh" }}
      >
        <p className="text-center text-gray-500 p-5">
          Select an order to view its details
        </p>
        <OrderList />
        <OrderList />
      </div>
      <div
        className="lg:h-96 w-full rounded-lg bg-white overflow-y-scroll lg:col-span-2 p-5"
        style={{ minHeight: "80vh", maxHeight: "80vh" }}
      >
        <OrderDetails />
      </div>
    </div>
  );
}

export default OrderComponent;
