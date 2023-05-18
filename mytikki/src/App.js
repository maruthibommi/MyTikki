import './App.css';
import '../src/Components/BagWeight.component.js'
import BagWeight from '../src/Components/BagWeight.component.js';
import data from '../src/Components/Data.json'
import React, { useState } from "react";

function App() {

  

  return (
      <div>
        <form>
          <input type = "text" placeholder ="Name"/>
          <input type = "text" placeholder ="mobile number"/>
          <input type = "number" placeholder ="Cost per bag"/>
          <input type= "text" placeholder="Category"/>
        </form>
        <BagWeight/>
      </div>
  );
}

export default App;
