const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("./src/model/User");
dotenv.config({ path: "./.env" });

const verifyToken = async (req, res, next) => {

//   if (!token) {
//     return res.status(401).json("You Are Not Authenticated !");
//   }
  try {
    const tokens = req.cookies.token;
    const verifiedToken = jwt.verify(tokens, process.env.SECRET);
    const rootuser = await User.findOne({ _id: verifiedToken._id, "tokens.token": tokens });
    if (!rootuser) {
      res.status(401).json("Token is Not Valid !");
      console.log("USER NOT FOUND");
    }else{
    req.token = tokens;
    req.rootuser = rootuser;
    req.userId = rootuser._id;

    next();}
    
  } catch (error) {
    console.error(error);
    res.status(401).json("Authentication Failed !");
  }
};

module.exports = verifyToken;
