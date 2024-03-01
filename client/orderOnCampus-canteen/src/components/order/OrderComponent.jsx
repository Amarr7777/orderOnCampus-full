import React, { useEffect, useState } from "react";
import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";
import { useSelector } from "react-redux";
import { selectUserData } from "../../slices/authSlice";
import axios from "axios";

function OrderComponent() {
  const [canteenID, setCanteenId] = useState("");
  const [orders, setOrders] = useState([]);
  const userData = useSelector(selectUserData);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/canteens/${canteenID}/get-canteen`
      );
      setOrders(res.data.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userData && userData.ownedCanteens.length > 0) {
      setCanteenId(userData.ownedCanteens[0]._id);
    }
  }, [userData]);

  useEffect(() => {
    if (canteenID) {
      getOrder();
    }
  }, [canteenID]);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="grid grid-cols-1 w-full gap-4 p-5 m-x-20 lg:grid-cols-3 lg:gap-8 ">
      <div
        className="lg:h-96 w-full overflow-scroll rounded-lg bg-white p-5"
        style={{ minHeight: "80vh", maxHeight: "80vh" }}
      >
        <p className="text-center text-gray-500 p-5">
          Select an order to view its details
        </p>
        {orders
          .filter(
            (item) => item.status !== "Completed" && item.status !== "Cancelled"
          )
          .slice()
          .reverse()
          .map((item, index) => (
            <button
              key={index}
              className="flex w-full"
              onClick={() => handleOrderSelect(item)}
            >
              <OrderList item={item} />
            </button>
          ))}
      </div>
      <div
        className="lg:h-96 w-full rounded-lg bg-white overflow-y-scroll lg:col-span-2 p-5"
        style={{ minHeight: "80vh", maxHeight: "80vh" }}
      >
        {selectedOrder !== null ? (
          <OrderDetails order={selectedOrder} />
        ) : (
          <div className="flex items-center justify-center content-center w-full h-full">
            <h4 className="font-semi text-gray-400 text-lg">
              No Order Selected
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderComponent;
