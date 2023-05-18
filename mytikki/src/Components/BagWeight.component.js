
import React,{useState} from "react";

function BagWeight() {

  const [bagweight,setBagWeight] = useState(0)
  const [customers, setCustomers] = useState({
    "bagweights" : [1,2,3,4]
  });

const setWeight = (event) =>{
  setBagWeight(event.target.value)
  console.log(event.target.value)
}

const Addweight = () =>{

  setCustomers(customers.bagweights.push(parseFloat(bagweight)))
  console.log(customers)
}

  return (
      <div>
        <input type="number" id ="bagweight" name ="bagweight"  placeholder= "enter bag weight" onChange={setWeight}/>
        <input type="button" value = "Add Weight" onClick={Addweight}/>
      </div>
  );
}

export default BagWeight;
