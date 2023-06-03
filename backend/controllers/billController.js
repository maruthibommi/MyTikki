import Bill from "../models/billModel.js";

export const getAllBills = async(req,res,next) => {
    let bills;
    try {

        bills = await Bill.find()
        
    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({bills})
}

export const addNewBill = async(req,res,next) =>{
    const { name,phoneNumber,Address,billNo }  = req.body

    let currbillno;
    try {
        currbillno = await Bill.findOne({billNo})

    } catch (error) {
        console.log(error)
    }
    if(currbillno) {
        return res.status(400).json({message: "bill No already exists"})
    }
    const bill = new Bill({
        name,
        phoneNumber,
        Address,
        billNo
    })

    try {
       await bill.save();
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:"bill not saved"})
    }
    return res.status(201).json({bill})

}