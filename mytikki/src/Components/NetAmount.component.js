import React, { useState, useEffect } from "react";

function NetAmount({ netWeight, grossAmount, costPerKG, totalBags }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows([
      {
        category: "kaata",
        totalBags: totalBags || "",
        isPerBag: true,
      },
      {
        category: "kiray",
        totalBags: totalBags || "",
        isPerBag: true,
      },
    ]);
  }, [totalBags]);

  const addRow = () => {
    setRows([...rows, {}]);
  };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const calculateTotalCost = (cost, totalBags, isPerBag) => {
    const multiplier = isPerBag ? totalBags : 1;
    return cost * multiplier;
  };

  const calculateNetAmount = () => {
    const totalCosts = rows.reduce(
      (sum, row) =>
        sum +
        (row.cost &&
        row.totalBags &&
        (row.isPerBag || row.isPerBag === undefined)
          ? calculateTotalCost(row.cost, row.totalBags, row.isPerBag)
          : 0),
      0
    );

    return grossAmount - totalCosts;
  };

  return (
    <div className="container">
      <h2>Net Amount</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Is per Bag</th>
            <th>Cost</th>
            <th>Total Number of Bags</th>
            <th>Total Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                {index === 0 || index === 1 ? (
                  <select
                    value={row.category}
                    onChange={(e) =>
                      handleChange(index, "category", e.target.value)
                    }
                    disabled
                  >
                    <option value="kaata">Kaata</option>
                    <option value="kiray">Kiray</option>
                  </select>
                ) : (
                  <select
                    value={row.category}
                    onChange={(e) =>
                      handleChange(index, "category", e.target.value)
                    }
                  >
                    <option value="kaata">Kaata</option>
                    <option value="kiray">Kiray</option>
                    <option value="others">Others</option>
                  </select>
                )}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={row.isPerBag || false}
                  onChange={(e) =>
                    handleChange(index, "isPerBag", e.target.checked)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.cost || ""}
                  onChange={(e) => handleChange(index, "cost", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.totalBags || ""}
                  onChange={(e) =>
                    handleChange(index, "totalBags", e.target.value)
                  }
                />
              </td>
              <td>
                {row.cost &&
                row.totalBags &&
                (row.isPerBag || row.isPerBag === undefined) ? (
                  calculateTotalCost(
                    row.cost,
                    row.totalBags,
                    row.isPerBag
                  )
                ) : (
                  <span>-</span>
                )}
              </td>
              <td>
                <button onClick={() => removeRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>

      <h3>Net Weight: {netWeight}</h3>
      <h3>Gross Amount: {grossAmount}</h3>
      <h3>Cost per KG: {costPerKG}</h3>
      <h3>Net Amount: {calculateNetAmount()}</h3>
    </div>
  );
}

export default NetAmount;
