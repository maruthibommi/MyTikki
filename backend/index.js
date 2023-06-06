import express from 'express'
import mongoose from 'mongoose'
import router from './Routers/bill-router.js'
import cors from 'cors'

const app = express()


app.use(express.json())
app.use("/",router)


mongoose.connect("mongodb+srv://yagnaveeranarayan:Admin8956@cluster0.kri6pyo.mongodb.net/MirchiBills?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{app.listen(3001)})
.then(()=>{console.log("Connected to mongodb")})
.catch((err)=>{console.log(err)})




