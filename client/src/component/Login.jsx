import axios from "axios";
import React, { useState } from "react";
import {useNavigate, Link } from "react-router-dom";
import { URL } from "../url";

const Login = () => {
  // State variables to hold the form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); 

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, password} = formData;

    try{
        if(!email || !password ){
            console.log("Please Fill All The Fields");
        }else{
            const res=await axios.post(URL+"/login",{email: email,password:password},{withCredentials:true});
              console.log("Login successfully:", res.data);
              setFormData({
                email: "",
                password: "",
              });              
              navigate("/");
        }
    }catch(error){
        console.error('An Error Occurred',error)
    }
   
  };
  return (
    <>
      <div className=" bg-green-300 h-screen">
        <div className="flex md:justify-between p-9 h-screen justify-center ">
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="border-black p-5 border-[5px] bg-white w-[500px] rounded-xl text-lg"
              style={{ fontFamily: "monospace" }}>
              <h1 className="text-center mb-2 text-2xl font-bold">Login</h1>
              <div className="flex flex-col mt-5">
                <div className="name flex flex-col m-5 gap-5">
                  <label htmlFor="email" className="text-xl font-bold">
                    Email :-
                  </label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="name border-black border-[1px] rounded-lg p-2"
                    placeholder="Enter Your Email Address"
                    autoComplete="current-email"
                  />
                  <label htmlFor="email" className="text-xl font-bold">
                    Password :-
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="name border-black border-[1px] rounded-lg p-2"
                    placeholder="Enter Your Password"
                    autoComplete="current-password" 
                  />
                </div>
                <div className=" justify-center items-center flex p-6">
                  <h6 className=" font-bold">
                    Don't Have An Account !!{" "}
                    <Link to="/signup" className=" underline text-red-600">
                      Signup
                    </Link>
                  </h6>
                </div>
                <div className=" justify-center flex">
                  <button
                    type="submit"
                    className="bg-blue-500 items-center justify-center flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="line m-2 border-[1px] border-black rotate-180 hidden md:block"></div>
          <div className="image items-center md:flex justify-center align-middle hidden ">
            <img
              src="https://clipart-library.com/images_k/cartoon-transparent-background/cartoon-transparent-background-2.png"
              className="h-[80%]  w-[82%] "
              alt="alt"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
