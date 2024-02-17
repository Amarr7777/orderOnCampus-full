import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FaApple, FaGoogle } from "react-icons/fa";

function AddNewItem({ addNewForm, setAddNewForm }) {
  if (!addNewForm) {
    return null;
  }
  return (
    <div className="fixed w-full inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center content-center">
      <div className="bg-white w-1/4 p-5 rounded-lg"></div>
    </div>
  );
}

export default AddNewItem;
