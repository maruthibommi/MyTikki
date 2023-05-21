import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Bill = () => {
  const location = useLocation();
  const { formData } = location.state;
  const [deductions, setDeductions] = useState([]);

  const handleAddRow = () => {
    const newDeduction = {
      deductionType: 'Commission',
      perBag: false,
      deductionAmount: 0,
      totalBags: 1,
    };
    setDeductions([...deductions, newDeduction]);
  };

  const handleDeleteRow = (index) => {
    const updatedDeductions = deductions.filter((_, i) => i !== index);
    setDeductions(updatedDeductions);
  };

  const calculateRowDeduction = (deductionAmount, totalBags) => {
    const bags = totalBags || 1;
    return deductionAmount * bags;
  };

  const calculateTotalNetAmount = () => {
    const grossAmount = formData.bagWeightData.reduce((total, bagData) => {
      const netWeight = calculateNetWeight(bagData);
      const bagsCost = bagData.bagWeights.length * bagData.perBagCost;
      const grossAmount = bagData.ratePerKG * netWeight;
      return total + grossAmount + bagsCost;
    }, 0);

    const totalDeductions = deductions.reduce((total, deduction) => {
      const deductionAmount = (deduction.deductionAmount);
      const totalBags = deduction.totalBags || 1;
      const deductionValue =deduction.deductionType === "Commission" ? (calculateGrossTotalAmount() * deduction.deductionAmount /100) :  deductionAmount * totalBags;
      return total + deductionValue;
    }, 0);

    return grossAmount - totalDeductions;
  };

  const calculateGrossTotalAmount = () => {
    const grossAmount = formData.bagWeightData.reduce((total, bagData) => {
      const netWeight = calculateNetWeight(bagData);
      const bagsCost = bagData.bagWeights.length * bagData.perBagCost;
      const grossAmount = bagData.ratePerKG * netWeight;
      return total + grossAmount + bagsCost;
    }, 0);
    return grossAmount;
  };

  const calculateNetWeight = (bagData) => {
    const bagWeights = bagData.bagWeights;
    const grossWeight = bagWeights.reduce((sum, weight) => sum + weight, 0);
    const bagsGreaterThan45 = bagData.bagWeights.filter((bagWeight) => Number(bagWeight) > 45);
    const bagsGreaterThan50 = bagData.bagWeights.filter((bagWeight) => Number(bagWeight) > 50);
    const netWeight =
      grossWeight -
      bagData.bagWeights.length -
      0.5 * bagsGreaterThan45.length -
      0.5 * bagsGreaterThan50.length;
    return netWeight;
  };

  const renderDeductionsTable = () => {
    const deductionOptions = ['Commission', 'Kiray', 'Kaata', 'Others'];

    return (
      <table>
        <thead>
          <tr>
            <th>Deduction Type</th>
            <th>Per Bag</th>
            <th>Deduction Amount</th>
            <th>Total Bags</th>
            <th>Total Deduction</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deductions.map((deduction, index) => (
            <tr key={index}>
              <td>
                <select
                  value={deduction.deductionType}
                  onChange={(e) => handleDeductionTypeChange(e, index)}
                >
                  {deductionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={deduction.perBag}
                  onChange={(e) => handlePerBagChange(e, index)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={deduction.deductionAmount}
                  onChange={(e) => handleDeductionAmountChange(e, index)}
                />
              </td>
              <td>
                {deduction.perBag ? (
                  <input
                    type="number"
                    value={deduction.totalBags}
                    onChange={(e) => handleTotalBagsChange(e, index)}
                  />
                ) : (
                  '-'
                )}
              </td>
              <td>{deduction.deductionType === "Commission" ? (calculateGrossTotalAmount() * deduction.deductionAmount /100) : calculateRowDeduction(deduction.deductionAmount, deduction.totalBags)}</td>
              <td>
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleDeductionTypeChange = (e, index) => {
    const updatedDeductions = [...deductions];
    updatedDeductions[index].deductionType = e.target.value;
    setDeductions(updatedDeductions);
  };

  const handlePerBagChange = (e, index) => {
    const updatedDeductions = [...deductions];
    updatedDeductions[index].perBag = e.target.checked;
    setDeductions(updatedDeductions);
  };

  const handleDeductionAmountChange = (e, index) => {
    const updatedDeductions = [...deductions];
    updatedDeductions[index].deductionAmount = parseFloat(e.target.value);
    setDeductions(updatedDeductions);
  };

  const handleTotalBagsChange = (e, index) => {
    const updatedDeductions = [...deductions];
    updatedDeductions[index].totalBags = parseInt(e.target.value);
    setDeductions(updatedDeductions);
  };

  const handleSubmit = () => {
    const bagDetails = formData.bagWeightData.map((bagData) => {
      const bagWeights = bagData.bagWeights;
      const grossWeight = bagWeights.reduce((sum, weight) => sum + weight, 0);
      const netWeight = calculateNetWeight(bagData);
      const bagsCost = bagWeights.length * bagData.perBagCost;
      const netAmount = bagData.ratePerKG * netWeight;
      return {
        Variety: bagData.variety,
        'Rate PerKG': bagData.ratePerKG,
        'Total Number Of Bags': bagData.bagWeights.length,
        Weights: bagData.bagWeights,
        'Gross Weight': Number(grossWeight).toFixed(2),
        'Net Weight': Number(netWeight).toFixed(2),
        'Per Bag Cost': bagData.perBagCost,
        'Total Bags Cost': Number(bagsCost).toFixed(2),
        'Net Amount': Number(netAmount).toFixed(2)
      };
    });

    const deductionsData = deductions.map((deduction) => {
      const totalDeductionAmount =
        deduction.deductionType === 'Commission'
          ? (calculateGrossTotalAmount() * deduction.deductionAmount) / 100
          : deduction.deductionAmount * (deduction.totalBags || 1);
      return {
        Type: deduction.deductionType,
        PerBag: deduction.perBag,
        'Deduction Amount': deduction.deductionAmount,
        'Total Number of Bags': deduction.totalBags || 0,
        'Total Deduction Amount': totalDeductionAmount
      };
    });

    const jsonData = {
      Name: formData.name,
      Number: formData.phoneNumber,
      Village: formData.village,
      BagDetails: bagDetails,
      'Gross Total Amount': calculateGrossTotalAmount(),
      Deductions: deductionsData,
      'Net total Amount': calculateTotalNetAmount()
    };

    console.log(JSON.stringify(jsonData));
    fetch('http://localhost:4000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    })
    .catch((error) => {
      console.error('Error submitting data:', error);
    });


  };

  return (
    <div>
      <h1>Bill</h1>
      <h2>Customer Details</h2>
      <p>Name: {formData.name}</p>
      <p>Phone Number: {formData.phoneNumber}</p>
      <p>Village: {formData.village}</p>

      <h2>Bag Weight Data</h2>
      <table>
        <thead>
          <tr>
            <th>Variety</th>
            <th>Rate Per KG</th>
            <th>Total Bags</th>
            <th>Per Bag Cost</th>
            <th>Weights</th>
            <th>Gross Weight</th>
            <th>Net Weight</th>
            <th>Gross Amount</th>
            <th>Bags Cost</th>
            <th>Net Amount</th>
          </tr>
        </thead>
        <tbody>
          {formData.bagWeightData.map((bagData, index) => {
            const bagWeights = bagData.bagWeights;
            const grossWeight = bagWeights.reduce((sum, weight) => sum + weight, 0);
            const netWeight = calculateNetWeight(bagData);
            const bagsCost = bagWeights.length * bagData.perBagCost;
            const grossAmount = bagData.ratePerKG * netWeight;
            const netAmount = grossAmount + bagsCost;

            return (
              <tr key={index}>
                <td>{bagData.variety}</td>
                <td>{bagData.ratePerKG}</td>
                <td>{bagData.bagWeights.length}</td>
                <td>{bagData.perBagCost}</td>
                <td>{bagData.bagWeights.join(', ')}</td>
                <td>{Number(grossWeight).toFixed(2)}</td>
                <td>{Number(netWeight).toFixed(2)}</td>
                <td>{Number(grossAmount).toFixed(2)}</td>
                <td>{Number(bagsCost).toFixed(2)}</td>
                <td>{Number(netAmount).toFixed(2)}</td>
              </tr>
            );
          })}
          <tr>
            <td>Gross Total Amount:</td>
            <td colSpan="9">{calculateGrossTotalAmount()}</td>
          </tr>
        </tbody>
      </table>

      <h2>Deductions</h2>
      {renderDeductionsTable()}

      <p>Total Net Amount: {calculateTotalNetAmount()}</p>

      <button onClick={handleAddRow}>Add Row</button>
      
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Bill;


