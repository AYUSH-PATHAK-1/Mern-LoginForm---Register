import axios from "axios";
import React, { useState } from "react";
import {useNavigate, Link } from "react-router-dom";
import {URL} from '../url';

const Signup = () => {
  // State variables to hold the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
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
    const { name, email, password, phoneno } = formData;

    try{
        if(!name || !email || !password || !phoneno){
            console.log("Please Fill All The Fields");
        }else{
        //   const res = await fetch(URL + "/register", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         name,
        //         email,
        //         password,
        //         phoneno                       
        //     }),
        // });

        const res=await axios.post(URL+"/register",{name: name,email: email,password:password,phoneno:phoneno},{withCredentials:true})

              console.log("Account created successfully:", res.data);
              setFormData({
                email: "",
                password: "",
                phoneno:"",
                name:""
              });              
              navigate("/login");
        }
    }catch(error){
        console.error('An Error Occurred',error)
    }
   
  };
  return (
    <>
      <div className=" bg-green-300">
        <div className="flex md:justify-between p-9 h-screen justify-center ">
          <div className="flex items-center  ">
            <form
              onSubmit={handleSubmit}
              className="border-black p-5 border-[5px] bg-white w-[500px] mx-auto rounded-xl text-lg"
              style={{ fontFamily: "monospace" }}>
              <h1 className="text-center mb-2 text-2xl font-bold">Sign Up</h1>
              <div className="flex flex-col mt-5">
                <div className="name flex flex-col m-5 gap-5">
                  <label htmlFor="name" className="text-xl font-bold">
                    Name :-
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="name border-black border-[1px] rounded-lg p-2"
                    placeholder="Enter Your Name"
                    autoComplete="current-name"
                  />
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
                  <label htmlFor="email" className="text-xl font-bold">
                    Phoneno :-
                  </label>
                  <input
                    type="number"
                    name="phoneno"
                    value={formData.phoneno}
                    onChange={handleInputChange}
                    className="name border-black border-[1px] rounded-lg p-2"
                    placeholder="Enter Your Phone Number"
                    autoComplete="current-phoneno"
                  />
                </div>
                <div className=" justify-center items-center flex p-6">
                  <h6 className=" font-bold">
                    Already Have An Account !!{" "}
                    <Link to="/login" className=" underline text-green-600">
                      Login
                    </Link>
                  </h6>
                </div>
                <div className=" justify-center flex">
                  <button
                    type="submit"
                    className="bg-blue-500 items-center justify-center flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="line m-2 border-[1px] border-black rotate-180 hidden md:block"></div>
          <div className="image items-center md:flex justify-center align-middle hidden ">
            <img
              src="https://clipart-library.com/images_k/cartoon-transparent-background/cartoon-transparent-background-18.png"
              className="h-[80%]  w-[82%] "
              alt="alt"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
