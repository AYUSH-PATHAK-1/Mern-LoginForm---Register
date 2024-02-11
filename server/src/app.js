const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("./db/conn");
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json());
app.use(cookieParser());


app.use(require('./router/users'));

const port = process.env.PORT;
app.listen(port, async () => {
  try {
    console.log(`SERVER IS RUNNING ON THE PORT NUMBER ${port}`);
  } catch (e) {
    console.log(e);
  }
});
