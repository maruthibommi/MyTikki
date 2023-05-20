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
      bagWeightData,
    };

    // Pass the data to the next page or perform any desired action
    navigate('/bill', { state: { formData } });
  };

  const handleBagWeightData = (data) => {
    setBagWeightData(data);
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
