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
    const data = req.body;

    try {
      // Create a new instance of the Data model
      const newData = new Bill(data);
  
      // Save the data to the database
      await newData.save();
  
      res.json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save data' });
    }

}