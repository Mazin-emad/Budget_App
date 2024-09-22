import React, { useContext, useState } from "react";
import { categoryContext } from "services/context/budget/categoryContext";

const TransHeader = () => {
  const { data: catData } = useContext(categoryContext);

  const [inputs, setInputs] = useState({
    keys: "",
    category: "",
    type: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((d) => {
      return { ...d, [name]: value };
    });
  };
  console.log(inputs);

  return (
    <div className="trans_header">
      <h1 className="trans_header-title">Recent Transactions</h1>
      <div className="trans_header-filters">
        <select
          className="filters-select"
          name="keys"
          onChange={handleChange}
          value={inputs.keys}
        >
          <option value="">Sort By</option>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <select
          className="filters-select"
          name="category"
          onChange={handleChange}
          value={inputs.category}
        >
          <option value="">Category</option>
          {catData &&
            catData.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
        <select
          className="filters-select"
          name="type"
          onChange={handleChange}
          value={inputs.type}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expanse">Expanse</option>
        </select>
      </div>
    </div>
  );
};

export default TransHeader;
