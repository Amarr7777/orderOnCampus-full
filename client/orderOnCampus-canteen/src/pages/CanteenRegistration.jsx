import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import CanteenInfo from "../components/registrationPage/CanteenInfo";
import DishInfo from "../components/registrationPage/DishInfo";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function CanteenRegistration() {
  const navigation = useNavigate()

  

  const [canteenName, setCanteenName] = useState("");
  const [location, setLoc] = useState("");
  const [canteenDescription, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [canteenNameVerify, setCanteenNameVerify] = useState(false);
  const [locationVerify, setLocVerify] = useState(false);
  const [categoryVerify, setCategoryVerify] = useState(false);
  // const [number, setNumber] = useState("");

  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDesc] = useState("");
  const [price, setPrice] = useState("");
  const [dishNameVerify, setDishNameVerify] = useState(false);
  const [priceVerify, setPriceVerify] = useState(false);


  


  const handleRegister = (e) => {
    if(!dishNameVerify  || !priceVerify || !locationVerify || !canteenNameVerify || !categoryVerify){
      alert('Please fill the madatory fields')
      return
    }
    console.log(canteenName)
    console.log(location)
    console.log(canteenDescription)
    console.log(category)
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
        // console.log();
        setCanteenName("");
        setLoc("");
        setDesc("");
        setCategory("");
        setDishName("");
        setDishDesc("");
        setPrice("");
        navigation('/');
        console.log("After navigation")
        
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
          canteenName = {canteenName}
          location = {location}
          category = {category}
          canteenNameVerify={canteenNameVerify}
          setCanteenNameVerify={setCanteenNameVerify}
          setLocVerify={setLocVerify}
          locationVerify={locationVerify}
          categoryVerify={categoryVerify}
          setCategoryVerify={setCategoryVerify}
        />
        <DishInfo
          setDishName={setDishName}
          setDishDesc={setDishDesc}
          setPrice={setPrice}
          dishName = {dishName}
          price = {price}
          dishNameVerify={dishNameVerify}
          setDishNameVerify={setDishNameVerify}
          priceVerify={priceVerify}
          setPriceVerify={setPriceVerify}
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
