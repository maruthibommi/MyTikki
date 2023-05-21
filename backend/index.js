const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const URI = 'mongodb+srv://yagnaveeranarayan:Yagna@8956@cluster0.kri6pyo.mongodb.net'
// MongoDB Connection
const mongoURI = URI; // Use environment variable or replace with your MongoDB URI
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Check for connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your data schema
const jsonDataSchema = new mongoose.Schema({
  // Define your schema fields based on the JSON structure
  name: String,
  number: String,
  village: String,
  bagDetails: [{
    variety: String,
    ratePerKG: Number,
    totalNumberOfBags: Number,
    weights: [Number],
    grossWeight: Number,
    netWeight: Number,
    perBagCost: Number,
    totalBagsCost: Number,
    netAmount: Number,
  }],
  grossTotalAmount: Number,
  deductions: [{
    type: String,
    perBag: Boolean,
    deductionAmount: Number,
    totalNumberOfBags: Number,
    totalDeductionAmount: Number,
  }],
  netTotalAmount: Number,
});

// Create the model based on the schema
const JsonData = mongoose.model('JsonData', jsonDataSchema);

app.post('/submit', (req, res) => {
  const jsonData = req.body;

  // Create a new document using the model
  const newData = new JsonData(jsonData);

  // Save the document to the database
  newData.save()
    .then(() => {
      console.log('Data stored successfully');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error('Error storing data:', error);
      res.sendStatus(500);
    });
});

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});
