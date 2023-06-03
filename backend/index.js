// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/billDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the schema for the bill data
const billSchema = new mongoose.Schema({
  Name: String,
  Number: String,
  Village: String,
  BagDetails: [{ /* define the schema for the BagDetails */ }],
  'Gross Total Amount': Number,
  Deductions: [{ /* define the schema for the Deductions */ }],
  'Net total Amount': Number,
});

// Create the bill model
const BillModel = mongoose.model('Bill', billSchema);

// Save the bill data in the database
app.post('/bill', async (req, res) => {
  try {
    const billData = req.body;
    const bill = new BillModel(billData);
    await bill.save();
    res.status(201).json({ message: 'Bill data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving the bill data' });
  }
});

// Get bill data based on phone number
app.get('/bill/:phoneNumber', async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    const bill = await BillModel.findOne({ Number: phoneNumber }).exec();
    if (!bill) {
      res.status(404).json({ error: 'Bill data not found' });
    } else {
      res.status(200).json(bill);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the bill data' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
