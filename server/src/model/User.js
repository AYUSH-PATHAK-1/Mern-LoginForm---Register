require('dotenv').config();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phoneno:{
        type:String,
        require:true,
        unique:true
    },
    tokens:{
        type:Array,
        default:[],
    }
},{timestamps:true})

userSchema.methods.genrateAuthToken=async function(next){
    try{
        const token=jwt.sign({_id:this._id.toString(),name:this._id.toString(),email:this._id.toString(),password:this._id.toString()},process.env.SECRET)
        this.tokens=this.tokens.concat({token:token});
        await this.save(); 
        return token;
    }catch(e){
        console.log(e);
    }
    next();
};

userSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
});

const User=mongoose.model('User',userSchema);
module.exports=User;