import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import AddNewItem from "./AddNewItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../slices/authSlice";

function MenuComponent() {
  const [addNewForm, setAddNewForm] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  useEffect(() => {
    if (userData && userData.ownedCanteens && userData.ownedCanteens[0]) {
      setMenuItems(userData.ownedCanteens[0].menu);
    }
  }, [userData]);
  
  const addNewItem = () => {
    setAddNewForm(true);
  };
  return (
    <>
      <div className="flex flex-col m-10 gap-5 w-full">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="search for items"
            className="lg:w-1/6 rounded-md py-2 px-5 border border-green-900 bg-gray-200"
          />
          <button
            onClick={addNewItem}
            className="flex items-center gap-1 text-white bg-green-900 px-5 py-2 rounded-md hover:bg-white hover:text-black hover:border hover:border-black"
          >
            Add new item
          </button>
        </div>
        <div
          className="flex flex-col overflow-y-scroll h-1/2 rounded-md bg-white w-full gap-5 p-5 lg:flex lg:flex-col lg:gap-5"
          style={{ minHeight: "70vh", maxHeight: "70vh" }}
        >
          {userData &&
            userData.ownedCanteens &&
            userData.ownedCanteens[0] &&
            userData.ownedCanteens[0].menu &&
            userData.ownedCanteens[0].menu.map((menuItem) => (
              <MenuItem key={menuItem._id} menuItem={menuItem} />
            ))}
        </div>
      </div>
      <AddNewItem addNewForm={addNewForm} setAddNewForm={setAddNewForm} />
    </>
  );
}

export default MenuComponent;
