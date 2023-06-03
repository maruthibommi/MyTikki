import mongoose from "mongoose";

const Schema = mongoose.Schema

const billSchema = new Schema(
    {
        name:{
            type: String,
            requred: true
        },
        number:{
            type:String,
            required: true
        },
        
    }
)