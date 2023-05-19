import React from "react";
import { useLocation } from "react-router-dom";

function Bill() {
    const location = useLocation();
    const { state } = location;
  
    if (!state) {
      return null;
    }
  
    const { name, mobileNumber, costPerKG, category, bagWeights, netWeight, netAmount } = state;
  
  return (
    <div className="container">
      <h2>Bill Details</h2>
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>Mobile Number:</strong> {mobileNumber}
      </div>
      <div>
        <strong>Cost per Bag:</strong> {costPerKG}
      </div>
      <div>
        <strong>Category:</strong> {category}
      </div>
      <div>
        <strong>Bag Weights:</strong>
        {bagWeights.map((weight, index) => (
          <span key={index}>{weight} </span>
        ))}
      </div>
      <div>
        <strong>Net Weight:</strong> {netWeight}
      </div>
      <div>
        <strong>Net Amount:</strong> {netAmount}
      </div>
    </div>
  );
}

export default Bill;
