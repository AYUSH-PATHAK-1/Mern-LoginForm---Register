import React, { useEffect, useState } from "react";
import namashkar from '../images/namshkar.png'
import nama from '../images/nama.png'
import {useNavigate} from 'react-router-dom';
import { URL } from "../url";
import axios from "axios";
import Sidebar ,{ SidebarItem } from "./Sidebar.jsx";
import  {
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings}
  from "lucide-react"

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
    <Sidebar>
    <SidebarItem
icon={<LayoutDashboard size={20} />}
text="Dashboard"
alert/>
<SidebarItem icon={<BarChart3 size={20} />} text="Statistics" active/>
<SidebarItem icon={<UserCircle size={20} />} text="Users" />
<SidebarItem icon={<Boxes size={20}/> } text="Inventory"/>
<SidebarItem icon={<Package size={20} />} text="Orders" alert />
<SidebarItem icon={<Receipt size={20} />} text="Billings"/>
<hr className="my-3"/>
<SidebarItem icon={<Settings size={20}/> } text="Settings"/>
<SidebarItem icon={<LifeBuoy size={20}/> } text="Help" />
</Sidebar>
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
