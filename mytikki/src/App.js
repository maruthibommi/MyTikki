import './App.css';
import '../src/Components/BagWeight.component.js'
import Bill from './Components/bill.component';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactForm from './Components/ContactForm.component';


function App() {

  

  return (
    <div>
      <div className='heading' >
        <h1>
          My APP
        </h1>
      </div>
      
      <Router>
          <Routes>
            <Route path="/" element={<ContactForm/>} />
            <Route path="/bill" element={<Bill/>} />
          </Routes>

          
        </Router>
    </div>
    
  );
}

export default App;
