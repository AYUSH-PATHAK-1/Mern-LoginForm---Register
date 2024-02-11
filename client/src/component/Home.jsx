import React, { useEffect, useState } from "react";
import namashkar from '../images/namshkar.png'
import nama from '../images/nama.png'
import {useNavigate} from 'react-router-dom';
import { URL } from "../url";
import axios from "axios";

const Home = () => {  
  const [name,setName]=useState("");
  const navigate=useNavigate();

  const callAboutPage=async()=>{
    try{
        const res=await axios.get(URL+'/',{withCredentials:true})
          
        // const data=await res.json();
        // console.log(res.name);
        console.log(res.data)
        setName(res.data);    

      }catch(e){
      console.log('Login Before Homepage');
      navigate('/login');
    }
}

  useEffect(()=>{
    callAboutPage();
  },[]);
  return (
    <>
      <div className=" bg-indigo-400 h-screen">
        <div className="title font-bold  pt-4 text-white">         
            <h1 className=" font-bold text-2xl m-5  justify-center flex">Welcome To The Home Screen <span className=" text-2xl font-bold text-yellow-300 mx-3"> {name}</span> </h1>    
        </div>
        <div className="  flex flex-col">
          <div className="img-1 justify-center flex items-center">
            <div className=" justify-center items-center flex ">
            <img src={namashkar} alt="" className="w-[100%] h-[450px] object-cover" />
            </div>
          </div>
          <div className="img-1 justify-center flex items-center  ">
            <div className=" items-center flex justify-center md:-mt-16">
            <img src={nama} alt="" className=" w-[100%] h-[210px] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
