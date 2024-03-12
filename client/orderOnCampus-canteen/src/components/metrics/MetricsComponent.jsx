import React from "react";
import OrderSummary from "./OrderSummary";
import OrderStats from "./OrderStats";

function MetricsComponent() {
  return (
    <div className="flex flex-col gap-5 px-28 py-20 m-x-20 w-full lg:flex lg:flex-col">
      <div className="grid grid-cols-1 gap-4 w-full lg:grid-cols-3">
        <div className="h-52 w-full rounded-lg bg-white lg:col-span-1">
          <p className="p-5 font-bold ">Total Menu</p>
          <div
            className="p-5 flex items-center justify-center
           w-full h-24"
          >
            <p className="font-bold text-5xl text-green-900">123</p>
          </div>
        </div>
        <div className="h-52 w-full rounded-lg bg-white lg:col-span-1">
          <p className="p-5 font-bold text-green-900">Total Orders</p>
          <div
            className="p-5 flex items-center justify-center
           w-full h-24"
          >
            <p className="font-bold text-5xl text-green-900">123</p>
          </div>
        </div>
        <div className="h-52 w-full rounded-lg bg-white lg:col-span-1">
          <p className="p-5 font-bold text-green-900">Total Customers</p>
          <div
            className="p-5 flex items-center justify-center
           w-full h-24"
          >
            <p className="font-bold text-5xl text-green-900">123</p>
          </div>
        </div>
      </div>
      <div className="grid w-full gap-4 lg:grid-cols-2 lg:gap-5">
        <div className="flex flex-col h-96 w-full rounded-lg bg-white">
          <p className="p-5 font-bold text-green-900">Order Summary</p>
          <OrderSummary />
        </div>
        <div className="flex flex-col h-fit w-full rounded-lg bg-white">
          <p className="p-5 font-bold text-green-900">Order Statistic</p>
          <OrderStats/>
        </div>
      </div>
    </div>
  );
}

export default MetricsComponent;
