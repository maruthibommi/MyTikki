import mongoose from "mongoose"

const Schema = mongoose.Schema

const billSchema = new Schema({
    name:{
        type : String,
        required: true
    },
    phoneNumber: {
        type: String,
        required:true
    },
    Address:{
        type:String
    },
    billNo:{
        type:String,
        required:true,
        unique:true
    }
})


export default mongoose.model("Bill",billSchema)