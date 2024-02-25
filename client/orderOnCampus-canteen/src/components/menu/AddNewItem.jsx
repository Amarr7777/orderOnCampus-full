import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import axios from 'axios'

function AddNewItem({ addNewForm, setAddNewForm }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    // image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const data  = {...formData};

  };
  if (!addNewForm) {
    return null;
  }
  return (
    <div className="fixed w-full inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center content-center z-50">
      <div className="max-w-md mx-auto p-6 bg-gray-100 shadow-md rounded-md">
        <div className="flex items-center justify-between mb-10">
          <h4 className="text-gray-500 text-2xl ">Add Dish</h4>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => setAddNewForm(false)}
            className="h-5"
            color="gray"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-900"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block font-medium mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-900"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-medium mb-1">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-green-900"
            />
          </div>
          <button
            type="submit"
            className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-950 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNewItem;
