import React from "react";
import SideNavBar from "../components/SideNavBar";
import Header from "../components/Header";
import OrderComponent from "../components/OrderComponent";
import { Route, Routes } from "react-router-dom";
import MenuComponent from "../components/MenuComponent";
import MetricsComponent from "../components/MetricsComponent";
import ProfileComponent from "../components/ProfileComponent";

function CanteenStaff() {
  return (
    <div className="h-screen bg-gray-300 lg:fixed w-full">
      <Header />
      <div className="flex">
        <SideNavBar />
        <Routes>
          <Route path="/" element={<OrderComponent />} />
          <Route path="/menu" element={<MenuComponent />} />
          <Route path="/metrics" element={<MetricsComponent />} />
            <Route path="/profile" element={<ProfileComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default CanteenStaff;
