import React from "react";
import { useLocation } from "react-router-dom";
import NetAmount from "./NetAmount.component";

function Bill() {
  const location = useLocation();
  const { state } = location;


  if (!state) {
    return null;
  }

  const {
    name,
    mobileNumber,
    costPerKG,
    category,
    bagWeights,
    totalBags,
    grossWeight
  } = state;



  // Calculate net weight
  let netWeight = grossWeight;
  bagWeights.forEach((weight) => {
    if (weight > 50) {
      netWeight -= 2;
    } else if (weight > 45 && weight <= 50) {
      netWeight -= 1.5;
    }
    
  });
  const grossAmount = netWeight * costPerKG;
  return (
    <div className="container">
      <h2>Bill Details</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Name:</strong>
            </td>
            <td>{name}</td>
          </tr>
          <tr>
            <td>
              <strong>Mobile Number:</strong>
            </td>
            <td>{mobileNumber}</td>
          </tr>
          <tr>
            <td>
              <strong>Cost per Kg:</strong>
            </td>
            <td>{costPerKG}</td>
          </tr>
          <tr>
            <td>
              <strong>Category:</strong>
            </td>
            <td>{category}</td>
          </tr>
          <tr>
            <td>
              <strong>Total Bags:</strong>
            </td>
            <td>{totalBags}</td>
          </tr>
          <tr>
            <td>
              <strong>Bag Weights:</strong>
            </td>
            <td>
              {bagWeights.map((weight, index) => (
                <div key={index}>
                  <span>{weight}</span>
                  {weight > 50 ? (
                    <>
                      <label>
                        <input
                          type="checkbox"
                          checked={weight > 45}
                          disabled={0<1}
                        />
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={weight > 50}
                          disabled={0<1}
                        />
                      </label>
                    </>
                  ) : (
                    <label>
                      <input
                        type="checkbox"
                        checked={weight > 45}
                        disabled={0<1}
                      />
                    </label>
                  )}
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Gross Weight:</strong>
            </td>
            <td>{grossWeight}</td>
          </tr>

          <tr>
            <td>
              <strong>Net Weight:</strong>
            </td>
            <td>{netWeight}</td>
          </tr>
          <tr>
            <td>
              <strong>Gross Amount:</strong>
            </td>
            <td>{grossAmount}</td>
          </tr>
        </tbody>
      </table>
      <NetAmount netWeight={netWeight} grossAmount={grossAmount} costPerKG={costPerKG} totalBags={totalBags}/>
    
    </div>
  );
}

export default Bill;
