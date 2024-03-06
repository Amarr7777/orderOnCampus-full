import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import axios from "axios";

function OrderDetails({ order }) {
  console.log("ORDER", order);
  const [orderStatus, setOrderStatus] = useState(order.status);
  // const [orderId, setOrderId] = useState(order);

  const dateString = order.timestamp;
  const date = new Date(dateString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const getOrder = async() => {
  //   try {
  //     await axios
  //       .get(`http://localhost:5001/orders/${orderId}/get-order`)
  //       .then((res) => {
  //         console.log("RESPONSE", res.data.data);
  //       })
  //       .catch((err) => {
  //         console.log("Error getting the order", err);
  //       });
  //   } catch (error) {
  //     console.log("Error updating order status:", error);
  //   }
  // };

  const changeStatus = async () => {
    try {
      await axios.put(`http://localhost:5001/orders/${order._id}/status`, {
        status: orderStatus,
      }).then(()=>{triggerRender()})
    } catch (error) {
      console.log("Error updating order status:", error);
    }
  };

  useEffect(() => {
    changeStatus();
  }, [orderStatus]);

  const handleCancel = () => {
    setOrderStatus("Cancelled");
    // triggerRender();
  };
  const handleProcessing = () => {
    setOrderStatus("Processing");
    // triggerRender();
  };
  const handleReady = () => {
    setOrderStatus("Ready");
    // triggerRender();
  };
  const handleDelivered = () => {
    setOrderStatus("Completed");
    // triggerRender();
  };

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${day} ${months[monthIndex]} ${year}`;

  return (
    <div className="flex flex-col">
      {/* order number */}
      <div className="flex items-center justify-between p-5 bg-gray-300">
        <p className="text-green-900">#{order._id}</p>
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
        {order.status === "Placed" ? (
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
