import './App.css';
import '../src/Components/BagWeight.component.js'
import BagWeight from '../src/Components/BagWeight.component.js';
import React, { useState } from "react";

import { BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom";

import Bill from "./Components//bill.component";

function App() {

  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<BagWeight/>} />
      <Route path="/bill" element={<Bill/>} />
    </Routes>

    
  </Router>
  );
}

export default App;
