import './App.css';
import '../src/Components/BagWeight.component.js'
import PrintBill from './Components/PrintBill.component';
import HomePage from './Components/homepage.component';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactForm from './Components/ContactForm.component';


function App() {

  

  return (
    <div>
      <div className='heading' >
        <h1>
          My APP
        </h1>
        <nav className="navbar">
          <a href='/'>Home</a>
          <a href='/contactForm'>NewBill</a>
          <a href='/printBill'>printBill</a>
        </nav>
      </div>

      
      <Router>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/contactForm" element={<ContactForm/>} />
            <Route path="/printBill" element={<PrintBill/>} />
          </Routes>

          
        </Router>
    </div>
    
  );
}

export default App;
