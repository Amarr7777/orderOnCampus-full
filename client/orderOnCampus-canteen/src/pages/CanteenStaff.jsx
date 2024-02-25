import React, { useEffect, useState } from "react";
import SideNavBar from "../components/sidebar/SideNavBar";
import Header from "../components/header/Header";
import OrderComponent from "../components/order/OrderComponent";
import { Route, Routes, useNavigate } from "react-router-dom";
import MenuComponent from "../components/menu/MenuComponent";
import MetricsComponent from "../components/metrics/MetricsComponent";
import ProfileComponent from "../components/profile/ProfileComponent";
import axios from "axios";

function CanteenStaff() {
  const navigation = useNavigate()

  const [userData, setUserData] = useState(null);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:5001/staff/auth")
      .then((res) => {
        // console.log(res.data.status);
        setUserData(res.data.userData);

      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {userData ? (
        <div className="h-screen bg-gray-300 lg:fixed w-full">
          <Header />
          <div className="flex">
            <SideNavBar />
            <Routes>
              <Route path="/" element={<OrderComponent userData = {userData} />} />
              <Route path="/menu" element={<MenuComponent />} />
              <Route path="/metrics" element={<MetricsComponent />} />
              <Route path="/profile" element={<ProfileComponent />} />
            </Routes>
          </div>
        </div>
      ) : 
      <div className="flex flex-1 justify-center items-center h-screen">
        <p className="text-xl font-green-900">please log in</p>
      </div>}
    </div>
  );
}

export default CanteenStaff;
