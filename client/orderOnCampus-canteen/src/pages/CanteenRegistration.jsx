import React, { useState } from "react";
import Header from "../components/header/Header";
import CanteenInfo from "../components/registrationPage/CanteenInfo";
import DishInfo from "../components/registrationPage/DishInfo";
import axios from "axios";

function CanteenRegistration() {
  const [canteenName, setCanteenName] = useState("");
  const [location, setLoc] = useState("");
  const [canteenDescription, setDesc] = useState("");
  const [category, setCategory] = useState("");
  // const [number, setNumber] = useState("");

  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDesc] = useState("");
  const [price, setPrice] = useState("");

  const handleRegister = (e) => {
    console.log(canteenName)
    console.log(location)
    console.log(canteenDescription)
    e.preventDefault();
    const restaurantData = {
      canteenName: canteenName,
      location: location,
      canteenDescription: canteenDescription,
      category: category,
      dishName: dishName,
      dishDescription: dishDescription,
      price: price,
    };
    axios
      .post("http://localhost:5001/registerCanteen", restaurantData)
      .then((res) => {
        // Handle success, maybe navigate to another page
        console.log(res);
        setCanteenName("");
        setLoc("");
        setDesc("");
        setCategory("");
        setDishName("");
        setDishDesc("");
        setPrice("");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleRegister}
        className="min-h-screen bg-gray-200 pt-5 space-y-5"
      >
        <CanteenInfo
          setCanteenName={setCanteenName}
          setLoc={setLoc}
          setDesc={setDesc}
          setCategory={setCategory}
        />
        <DishInfo
          setDishName={setDishName}
          setDishDesc={setDishDesc}
          setPrice={setPrice}
        />
        <div className="sticky inset-0 w-full flex gap-5 justify-end px-5 py-5 bg-white">
          <button 
          type="submit"
          className=" bg-green-900 text-white px-10 py-3 rounded-md hover:bg-white hover:text-black hover:border hover:border-black ">
            Register
          </button>
        </div>
      </form>
    </>
  );
}

export default CanteenRegistration;
