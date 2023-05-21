import React, { useState, useEffect } from 'react';
import '../App.css';

const BagWeight = ({ onBagWeightData }) => {
  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    setRows([...rows, { variety: '', bagWeights: [], ratePerKG: 0, perBagCost: 0 }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleVarietyChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].variety = event.target.value;
    setRows(updatedRows);
  };

  const handleBagWeightChange = (index, bagWeightIndex, event) => {
    const updatedRows = [...rows];
    updatedRows[index].bagWeights[bagWeightIndex] = Number(event.target.value);
    setRows(updatedRows);
  };

  const handleAddBagWeight = (index) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].bagWeights.push(0);
      return updatedRows;
    });
  };

  const handleRemoveBagWeight = (index, bagWeightIndex) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index].bagWeights.splice(bagWeightIndex, 1);
      return updatedRows;
    });
  };

  const handleRateChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].ratePerKG = Number(event.target.value);
    setRows(updatedRows);
  };

  const handlePerBagCostChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].perBagCost = Number(event.target.value);
    setRows(updatedRows);
  };

  useEffect(() => {
    onBagWeightData(rows);
  }, [rows, onBagWeightData]);

  const calculateTotalBags = (bagWeights) => {
    return bagWeights.length;
  };

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
    return Number(netWeight).toFixed(2); // Display with two decimal places
  };

  const calculateGrossAmount = (netWeight, ratePerKG) => {
    return Number(netWeight * ratePerKG).toFixed(2); // Display with two decimal places
  };

  const calculateNetAmount = (grossAmount, totalBags, perBagCost) => {
    return Number(Number(grossAmount) + Number(perBagCost * totalBags)).toFixed(2); // Display with two decimal places
  };

  const calculateTotalBagsCost = (totalBags, perBagCost) => {
    return Number(totalBags * perBagCost).toFixed(2); // Display with two decimal places
  };

  return (
    <div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Variety</th>
              <th>Rate per KG</th>
              <th>Bag Weight</th>
              <th>Total Bags</th>
              <th>Gross Weight</th>
              <th>Per Bag Cost</th>
              <th>Net Weight</th>
              <th>Gross Amount</th>
              <th>Total Bags Cost</th>
              <th>Net Amount</th>

            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <select value={row.variety} onChange={(event) => handleVarietyChange(index, event)}>
                    <option value="Select a Variety">Select a Variety</option>
                    <option value="Red">Red</option>
                    <option value="Taal">Taal</option>
                    <option value="Teja">Teja</option>
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    value={row.ratePerKG}
                    onChange={(event) => handleRateChange(index, event)}
                  />
                </td>
                <td>
                  {row.bagWeights.map((bagWeight, bagWeightIndex) => (
                    <div key={bagWeightIndex}>
                      <input
                        type="number"
                        value={bagWeight}
                        onChange={(event) => handleBagWeightChange(index, bagWeightIndex, event)}
                      />
                      <input type="checkbox" checked={bagWeight > 45} disabled />
                      <input type="checkbox" checked={bagWeight > 50} disabled />
                      <button
                        type="button"
                        onClick={() => handleRemoveBagWeight(index, bagWeightIndex)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddBagWeight(index)}>
                    Add Bag Weight
                  </button>
                </td>
                <td>{calculateTotalBags(row.bagWeights)}</td>
                <td>{calculateGrossWeight(row.bagWeights)}</td>
                <td>
                  <input
                    type="number"
                    value={row.perBagCost}
                    onChange={(event) => handlePerBagCostChange(index, event)}
                  />
                </td>
                <td>
                  {calculateNetWeight(
                    calculateGrossWeight(row.bagWeights),
                    row.bagWeights
                  )}
                </td>
                <td>
                  {calculateGrossAmount(
                    calculateNetWeight(
                      calculateGrossWeight(row.bagWeights),
                      row.bagWeights
                    ),
                    row.ratePerKG
                  )}
                </td>
                <td>
                  {calculateTotalBagsCost(
                    calculateTotalBags(row.bagWeights),
                    row.perBagCost
                  )}
                </td>
                <td>
                  {calculateNetAmount(
                    calculateGrossAmount(
                      calculateNetWeight(
                        calculateGrossWeight(row.bagWeights),
                        row.bagWeights
                      ),
                      row.ratePerKG
                    ),
                    calculateTotalBags(row.bagWeights),
                    row.perBagCost
                  )}
                </td>
                
                <td>
                  <button type="button" onClick={() => handleRemoveRow(index)}>
                    Remove Variety
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="button-container button" type="button" onClick={handleAddRow}>
        Add Variety
      </button>
    </div>
  );
};

export default BagWeight;
