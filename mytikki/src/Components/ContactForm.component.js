import React, { useState } from 'react';
import BagWeight from './BagWeight.component';
import { useNavigate } from 'react-router-dom';

import '../App.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [village, setVillage] = useState('');
  const [bagWeightData, setBagWeightData] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleVillageChange = (event) => {
    setVillage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name,
      phoneNumber,
      village,
      varieties: bagWeightData.map((data) => data.variety),
      weights: bagWeightData.map((data) => data.bagWeights),
      grossWeight: bagWeightData.reduce(
        (total, data) => total + calculateGrossWeight(data.bagWeights),
        0
      ),
      netWeight: bagWeightData.reduce(
        (total, data) =>
          total + calculateNetWeight(calculateGrossWeight(data.bagWeights), data.bagWeights),
        0
      ),
      grossAmount: bagWeightData.reduce(
        (total, data) =>
          total +
          calculateGrossAmount(
            calculateNetWeight(calculateGrossWeight(data.bagWeights), data.bagWeights),
            data.ratePerKG
          ),
        0
      ),
      totalBags: bagWeightData.reduce(
        (total, data) => total + calculateTotalBags(data.bagWeights),
        0
      ),
      costPerBag: bagWeightData[0].ratePerKG,
      totalBagsCost: bagWeightData.reduce(
        (total, data) =>
          total + calculateTotalBagsCost(calculateTotalBags(data.bagWeights)),
        0
      ),
      netAmount: bagWeightData.reduce(
        (total, data) =>
          total +
          calculateNetAmount(
            calculateGrossAmount(
              calculateNetWeight(calculateGrossWeight(data.bagWeights), data.bagWeights),
              data.ratePerKG
            ),
            calculateTotalBags(data.bagWeights)
          ),
        0
      ),
    };

    // Pass the data to the next page or perform any desired action
    navigate('/bill', { state: { formData } });
  };

  const handleBagWeightData = (data) => {
    setBagWeightData(data);
  };

  // Calculation functions (same as before)
  const calculateGrossWeight = (bagWeights) => {
    return bagWeights.reduce((acc, curr) => acc + curr, 0);
  };

  const calculateNetWeight = (grossWeight, bagWeights) => {
    const bagsGreaterThan45 = bagWeights.filter((bagWeight) => bagWeight > 45);
    const bagsGreaterThan50 = bagWeights.filter((bagWeight) => bagWeight > 50);
    const netWeight =
      grossWeight -
      bagWeights.length -
      0.5 * bagsGreaterThan45.length -
      0.5 * bagsGreaterThan50.length;
    return Number(netWeight.toFixed(2));
  };

  const calculateGrossAmount = (netWeight, ratePerKG) => {
    return Number((netWeight * ratePerKG).toFixed(2));
  };

  const calculateTotalBags = (bagWeights) => {
    return bagWeights.length;
  };

  const calculateTotalBagsCost = (totalBags) => {
    return Number((totalBags * bagWeightData[0].ratePerKG).toFixed(2));
  };

  const calculateNetAmount = (grossAmount, totalBags) => {
    return Number((grossAmount + calculateTotalBagsCost(totalBags)).toFixed(2));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="input-container">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
          </div>
          <div className="input-container">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="village">Village:</label>
            <input type="text" id="village" value={village} onChange={handleVillageChange} />
          </div>
        </div>
        <BagWeight onBagWeightData={handleBagWeightData} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
