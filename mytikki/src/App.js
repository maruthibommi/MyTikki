import logo from './logo.svg';
import './App.css';
import '../src/Components/BagWeight.component.js'
import BagWeight from '../src/Components/BagWeight.component.js';
import data from '../src/Components/Data.json'
import React, { useState } from "react";

function App() {

  const [customers, setCustomers] = useState(data);

  return (
      <div className='app-container'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Total Bags</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) =>(
              <tr>
                
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
  );
}

export default App;
