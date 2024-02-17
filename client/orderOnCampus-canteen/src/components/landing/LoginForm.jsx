import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginForm({ loginActive, setLoginActive }) {
  const navigation = useNavigate();
  if (!loginActive) {
    return null;
  }
  return (
    <div className="fixed w-full inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center content-center">
      <div className="bg-white w-1/4 p-5 rounded-lg">
        <div className="flex items-center justify-between mb-10">
          <h4 className="text-gray-500 text-2xl ">Login</h4>
          <FontAwesomeIcon
            onClick={() => setLoginActive(false)}
            icon={faXmark}
            className="h-5"
            color="gray"
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <form method="post" className="space-y-5">
            <input
              type="number"
              className="border rounded-lg w-full p-2  "
              placeholder="Phone"
            />
            <button
              className="bg-green-950 text-white rounded-lg py-2 px-5 w-full"
              onClick={() => {
                navigation("/canteenStaff");
              }}
            >
              Send One Time Password
            </button>
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
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
