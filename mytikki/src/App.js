import './App.css';
import '../src/Components/BagWeight.component.js'
import Bill from './Components/bill.component';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactForm from './Components/ContactForm.component';


function App() {

  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<ContactForm/>} />
      <Route path="/bill" element={<Bill/>} />
    </Routes>

    
  </Router>
  );
}

export default App;
