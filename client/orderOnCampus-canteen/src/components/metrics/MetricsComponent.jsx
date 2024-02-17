import React from "react";

function MetricsComponent() {
  return (
    <div className="flex flex-col gap-5 p-5 m-x-20 w-full lg:flex lg:flex-col">
      <div className="grid grid-cols-1 gap-4 w-full lg:grid-cols-3 lg:gap-5">
        <div className="h-32 w-full rounded-lg bg-white">
          <p>hello</p>
        </div>
        <div className="h-32 w-full rounded-lg bg-white lg:col-span-2">
          <p>hello</p>
        </div>
      </div>
      <div className="grid w-full gap-4 lg:grid lg:gap-5">
        <div className="h-32 w-full rounded-lg bg-white">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
}

export default MetricsComponent;
