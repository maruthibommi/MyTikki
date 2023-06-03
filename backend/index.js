import  express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.connect(
    "mongodb+srv://admin:Admin8956@cluster-dev.jc2lcps.mongodb.net/Mirchibill?retryWrites=true&w=majority"
).then(()=>(app.listen(5000))).then(()=>{console.log("Connected and running the backend at 5000")})
.catch((err)=>{console.log(err)})


app.use("/bills",(req,res)=>{
res.json("Hello World")
})


