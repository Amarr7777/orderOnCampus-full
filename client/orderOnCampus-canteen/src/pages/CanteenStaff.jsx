import React from "react";
import SideNavBar from "../components/sidebar/SideNavBar";
import Header from "../components/header/Header";
import OrderComponent from "../components/order/OrderComponent";
import { Route, Routes } from "react-router-dom";
import MenuComponent from "../components/menu/MenuComponent";
import MetricsComponent from "../components/metrics/MetricsComponent";
import ProfileComponent from "../components/profile/ProfileComponent";

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
