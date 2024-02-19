import React from "react";
import Header from "../components/header/Header";
import CanteenInfo from "../components/registrationPage/CanteenInfo";
import DishInfo from "../components/registrationPage/DishInfo";

function CanteenRegistration() {
  return (
    <>
      <Header />
      <form action="/" className="min-h-screen bg-gray-200 pt-5 space-y-5">
        <CanteenInfo />
        <DishInfo />
        <div className="sticky inset-0 w-full flex gap-5 justify-end px-5 py-5 bg-white">
          <button className=" bg-green-900 text-white px-10 py-3 rounded-md hover:bg-white hover:text-black hover:border hover:border-black ">
            Register
          </button>
        </div>
      </form>
    </>
  );
}

export default CanteenRegistration;
