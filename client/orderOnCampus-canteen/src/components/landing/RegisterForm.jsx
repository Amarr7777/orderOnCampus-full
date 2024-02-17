import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FaApple, FaGoogle } from "react-icons/fa";

function RegisterForm({ regActive, setReginActive }) {
  if (!regActive) {
    return null;
  }
  return (
    <div className="fixed w-full inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center content-center">
      <div className="bg-white w-1/4 p-5 rounded-lg">
        <div className="flex items-center justify-between mb-10">
          <h4 className="text-gray-500 text-2xl ">Register</h4>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => setReginActive(false)}
            className="h-5"
            color="gray"
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <form action="#" method="post" className="space-y-5">
            <input
              type="Text"
              className="border rounded-lg w-full p-2  "
              placeholder="Full Name"
            />
            <input
              type="Text"
              className="border rounded-lg w-full p-2  "
              placeholder="Email"
            />
            <button className="bg-green-950 text-white rounded-lg py-2 px-5 w-full">
              Create Account
            </button>
            <div className="flex items-center gap-5 ">
              <input type="checkbox" />
              <p className="text-sm">
                I agree to OrderOnCampus's
                <span className="text-green-600">
                  {"\t"} Terms of Service, Privacy Policy
                </span>
                {"\t"} and
                <span className="text-green-600">{"\t"} Content Policies</span>
              </p>
            </div>
            <hr />
            <div className="flex items-center justify-center gap-5">
              <button className="border p-5 rounded-lg">
                <FaGoogle />
              </button>
              <button className="border p-5 rounded-lg">
                <FaApple />
              </button>
            </div>
          </form>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
