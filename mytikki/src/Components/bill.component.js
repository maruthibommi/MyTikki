import React from 'react';
import { useLocation } from 'react-router-dom';

const Bill = () => {
  const location = useLocation();
  const { formData } = location.state;
  //const jsonData = JSON.stringify(formData, null, 2); // Convert formData to a formatted JSON string

  // Define a helper function to render the bag weights as a table
  const renderBagWeightsTable = (bagWeights) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {bagWeights.map((weight, index) => (
            <tr key={index}>
              <td>{weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Bill</h1>
      <h2>Customer Details</h2>
      <p>Name: {formData.name}</p>
      <p>Phone Number: {formData.phoneNumber}</p>
      <p>Village: {formData.village}</p>

      <h2>Bag Weight Data</h2>
      {formData.bagWeightData.map((bagData, index) => (
        <div key={index}>
          <h3>Variety: {bagData.variety}</h3>
          <p>Rate Per KG: {bagData.ratePerKG}</p>
          <p>Per Bag Cost: {bagData.perBagCost}</p>
          {renderBagWeightsTable(bagData.bagWeights)}
        </div>
      ))}
    </div>
  );
};

export default Bill;
