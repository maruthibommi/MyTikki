import React, { useState } from "react";

function BagWeight() {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    costPerBag: "",
    category: "",
    bagWeights: [],
  });

  const handleInputChange = (event) => {
    if (event.target.name === "bagWeight") {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        bagWeights: [...formData.bagWeights],
      });
    }
  };

  const handleAddWeight = () => {
    if (
      formData.name === "" ||
      formData.mobileNumber === "" ||
      formData.costPerBag === "" ||
      formData.category === "" ||
      formData.bagWeight === ""
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    if (formData.mobileNumber.length < 10) {
      alert("Please enter at least 10 digits for the phone number.");
      return;
    }

    const updatedBagWeights = [...formData.bagWeights, formData.bagWeight];
    const jsonData = {
      name: formData.name,
      mobileNumber: formData.mobileNumber,
      costPerBag: formData.costPerBag,
      category: formData.category,
      bagWeights: updatedBagWeights,
    };

    setFormData({
      ...formData,
      bagWeight: "",
      bagWeights: updatedBagWeights,
    });

    const bagWeightsContainer = document.getElementById("bag-weights-container");
  if (bagWeightsContainer) {
    bagWeightsContainer.scrollTop = bagWeightsContainer.scrollHeight;
  }
  };

  const handleEditWeight = (index, value) => {
    const updatedBagWeights = [...formData.bagWeights];
    updatedBagWeights[index] = value;

    setFormData({
      ...formData,
      bagWeights: updatedBagWeights,
    });
  };

  const handleDeleteWeight = (index) => {
    const updatedBagWeights = [...formData.bagWeights];
    updatedBagWeights.splice(index, 1);

    setFormData({
      ...formData,
      bagWeights: updatedBagWeights,
    });
  };

  const handleSubmit = () => {
    if (formData.bagWeights.length === 0) {
      alert("Please add at least one bag weight.");
      return;
    }

    const totalWeight = formData.bagWeights.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue),
      0
    );

    alert(`Total weight: ${totalWeight}`);
  };

  return (
    <div className="container">
      <div className="bag-count">{formData.bagWeights.length}</div>
      <div className="form__group">
        <form>
          <input
            className="form__input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <br />
          <input
            className="form__input"
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Mobile Number"
          />
          <label htmlFor="mobileNumber" className="form__label">
            Number
          </label>
          <br />
          <input
            className="form__input"
            type="number"
            name="costPerBag"
            value={formData.costPerBag}
            onChange={handleInputChange}
            placeholder="Cost per Bag"
          />
          <label htmlFor="costPerBag" className="form__label">
            Rate
          </label>
          <br />
          <select
              className="form__input"
              name="category"
              value={formData.category}
              onChange={handleInputChange}>
              <option value="">Select Category</option>
              <option value="Taal">Taal</option>
              <option value="Lot">Lot</option>
        </select>
          <label htmlFor="category" className="form__label">
            Category
          </label>
          <br />
          <input
            className="form__input"
            type="number"
            name="bagWeight"
            value={formData.bagWeight}
            onChange={handleInputChange}
            placeholder="Enter Bag Weight"
          />
          <label htmlFor="bagWeight" className="form__label">
            Bag Weight
          </label>
          <input type="button" value="Add Weight" onClick={handleAddWeight} />
        </form>
      </div>
      <div className="bag-weights">
        <div className="bag-weights__container" id = "bag-weights-container">
          {formData.bagWeights.map((weight, index) => (
            <div className="bag-weight" key={index}>
              <input
                className="bag-weight__input"
                type="text"
                value={weight}
                onChange={(event) =>
                  handleEditWeight(index, event.target.value)
                }
              />
              <button
                className="bag-weight__button"
                onClick={() => handleDeleteWeight(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {formData.bagWeights.length > 0 && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
}

export default BagWeight;
