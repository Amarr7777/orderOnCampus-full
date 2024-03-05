import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import axios from "axios";

function OrderDetails({ order }) {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [orderId, setOrderId] = useState(order._id); // Corrected typo in state name

  const dateString = "2024-03-01T06:33:02.467Z";
  const date = new Date(dateString);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const changeStatus = async () => {
    try {
      await axios.put(`http://localhost:5001/orders/${orderId}/status`, { status: orderStatus });
    } catch (error) {
      console.log("Error updating order status:", error);
    }
  };

  useEffect(() => {
    changeStatus();
  }, [orderId, orderStatus]); // Added orderId to the dependency array

  const handleCancel = () => {
    setOrderStatus("Cancelled");
  };
  const handleProcessing = () => {
    setOrderStatus("Processing");
  };
  const handleReady = () => {
    setOrderStatus("Ready");
  };
  const handleDelivered = () => {
    setOrderStatus("Completed");
  };

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${day} ${months[monthIndex]} ${year}`;

  return (
    <div className="flex flex-col">
      {/* order number */}
      <div className="flex items-center justify-between p-5 bg-gray-300">
        <p className="text-green-900">#{orderId}</p> {/* Updated to display orderId */}
        <p className="text-gray-500 font-light">{formattedDate}</p>
        <p className="text-gray-500 font-light">
          {order.items.length} items for {order.totalPrice}
        </p>
      </div>
      {/* items */}
      <div className="flex flex-col gap-y-5 mt-5">
        {order.items.map((item, key) => (
          <OrderItem key={key} item={item} />
        ))}
      </div>
      {/* buttons */}
      <div className="flex justify-evenly items-center p-5">
        {orderStatus === "Placed" ? (
          <>
            <button
              onClick={handleCancel}
              className="py-2 px-5 lg:px-28 rounded-lg bg-white border border-green-900 text-green-900"
            >
              Reject Order
            </button>
            <button
              onClick={handleProcessing}
              className="py-2 px-5 lg:px-28 rounded-lg bg-green-900 text-white"
            >
              Confirm Order
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleReady}
              className="py-2 px-5 lg:px-28 rounded-lg bg-white border border-green-900 text-green-900"
            >
              Order Ready
            </button>
            <button
              onClick={handleDelivered}
              className="py-2 px-5 lg:px-28 rounded-lg bg-green-900 text-white"
            >
              Order Delivered
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
