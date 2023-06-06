import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bills', { mode: 'no-cors' });
      

      const data = await response.json();
      setBills(data);
      
    } catch (error) {
      console.error(error);
      console.log("coming here")
    }
  };

  return (
    <div>
      <h1>Bills</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Gross Total Amount</th>
            <th>Net Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td>{bill.name}</td>
              <td>{bill.phoneNumber}</td>
              <td>{bill.Address}</td>
              <td>{bill.GrossTotalAmount}</td>
              <td>{bill.NetTotalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
