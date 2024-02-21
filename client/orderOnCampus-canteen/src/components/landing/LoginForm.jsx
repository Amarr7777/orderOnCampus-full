import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FaApple, FaCheckCircle, FaGoogle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function LoginForm({ loginActive, setLoginActive }) {

  const[email, setEmail] = useState("");
  const[emailVerify,setEmailVerify] = useState(false)
  const[password, setPassword] = useState("");
  const[passwordVerify,setPasswordVerify] = useState(false)

  const navigation = useNavigate();

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailVerify(false);
    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(value)) {
      setEmailVerify(true);
    }
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordVerify(false);
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(value)) {
      setPasswordVerify(true);
    }
  };

  const handleForm = (e)=>{
    if(!emailVerify  || !passwordVerify){
      alert('Please check your email and password');
      return ;
    }else{
      navigation("/canteenStaff");
    }

  }

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
          <form onSubmit={handleForm} method="post" className="space-y-5">
            <div className="flex items-center border w-full  rounded-md">
              <input
                type="email"
                className="outline-none rounded-lg w-full p-2  "
                placeholder="Email"
                onChange={(e)=>handleEmail(e)}
              /> {email.length < 1 ? null : emailVerify ? (
                <FaCheckCircle className="m-2 text-green-900" />
              ) : (
                <FaTimesCircle className="m-2 text-red-700 " />
              )}
            </div>
            {email.length < 1 ? null : emailVerify ? null : (
              <p className="font-light text-sm text-red-700">
                invalid Email
              </p>
            )}
            <div className="flex items-center border w-full  rounded-md">
              <input
                type="password"
                className="outline-none rounded-lg w-full p-2  "
                placeholder="password"
                onChange={(e)=>handlePassword(e)}
              /> {password.length < 1 ? null : passwordVerify ? (
                <FaCheckCircle className="m-2 text-green-900" />
              ) : (
                <FaTimesCircle className="m-2 text-red-700 " />
              )}
            </div>
            {password.length < 1 ? null : passwordVerify ? null : (
              <p className="font-light text-sm text-red-700">
                invalid password
              </p>
            )}
            <button
              className="bg-green-950 text-white rounded-lg py-2 px-5 w-full"
              type="submit"
            >
              Login
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
