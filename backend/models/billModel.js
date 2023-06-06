import mongoose from "mongoose"

const Schema = mongoose.Schema

const bagSchema = new mongoose.Schema({
    Variety: String,
    RatePerKG: String,
    TotalNumberOfBags: String,
    Weights: [String],
    GrossWeight: String,
    NetWeight: String,
    PerBagCost: String,
    TotalBagsCost: String,
    NetAmount: String,
  });
  
  const deductionSchema = new mongoose.Schema({
    Type: String,
    PerBag: Boolean,
    DeductionAmount: String,
    TotalNumberOfBags: String,
    TotalDeductionAmount: String,
  });
  
  const billSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    Address: String,
    BagDetails: [bagSchema],
    GrossTotalAmount: String,
    Deductions: [deductionSchema],
    NetTotalAmount: String,
  });

export default mongoose.model("Bill",billSchema)