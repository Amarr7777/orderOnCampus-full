import React, { useEffect, useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import AddNewItem from "./AddNewItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, setUserData } from "../../slices/authSlice";
import axios from "axios";

function MenuComponent() {
  const [addNewForm, setAddNewForm] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  // Function to trigger re-render
  const triggerRender = useCallback(async() => {
    await axios
    .get("http://localhost:5001/staff/auth")
    .then((res) => {
      dispatch(setUserData(res.data.data));
    })
    .catch((err) => console.log(err));
    if (userData && userData.ownedCanteens && userData.ownedCanteens[0]) {
      setMenuItems(userData.ownedCanteens[0].menu);
    }
  }, [userData]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchItem(searchTerm);
    const filteredResults = menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filteredResults);
  };

  useEffect(() => {
    // Trigger initial render
    triggerRender();
  }, [triggerRender]); // Only run this effect once

  const addNewItem = () => {
    setAddNewForm(true);
  };
  const handleDelete = () => {
    // Function to handle item deletion
    triggerRender(); // Trigger re-render after item deletion
  };

  return (
    <>
      <div className="flex flex-col m-10 gap-5 w-full">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search for items"
            onChange={handleSearch}
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
          {filteredData.length > 0 ? (
            filteredData.map((menuItem) => (
              <MenuItem key={menuItem._id} menuItem={menuItem} handleDelete={handleDelete} />
            ))
          ) : (
            menuItems.map((menuItem) => (
              <MenuItem key={menuItem._id} menuItem={menuItem} handleDelete={handleDelete} />
            ))
          )}
        </div>
      </div>
      <AddNewItem addNewForm={addNewForm} setAddNewForm={setAddNewForm} triggerRender={triggerRender} />
    </>
  );
}

export default MenuComponent;
