const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const User=require("../model/User");
const jwt=require("jsonwebtoken");
const veryfyToken=require("../../veryfyToken");

router.get("/",veryfyToken,(req,res)=>{
    res.send(req.rootuser.name);
});

//register

router.post("/register",async(req,res)=>{
    try{
        const newuser=new User(req.body);
        const saveduser=await newuser.save();
        res.status(201).json(saveduser);
    }catch(e){
        res.status(500).json(e)
        console.log(e)
    }
})

// login

router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).json("USer Not Found !!")
        }
        const match=await bcrypt.compare(req.body.password,user.password);
        if(!match){
            return res.status(404).json("Wrong Credentials")
        }else{
            const token=await user.genrateAuthToken();
            res.cookie("token",token,{
                expires:new Date(Date.now()+800000),
                httpOnly:true,
            });
            res.status(200).json({message:"Login Successfull"});
        }
    }catch(e){
        res.status(500).json(e);
    }
});

// logout

router.get("/logout",async(req,res)=>{
    try{
        res.clearCookie("token").status(200).send("User Logged-Out Successfully !")
    }catch(e){
        res.status(500).json(e);
    }
})

module.exports=router;