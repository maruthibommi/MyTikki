import './App.css';
import '../src/Components/BagWeight.component.js'
import BagWeight from '../src/Components/BagWeight.component.js';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
