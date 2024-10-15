import React, { useContext } from "react";
import SingleTrans from "./SingleTrans";
import { transactionsContext } from "services/context/budget/transactionsContext";
import { categoryContext } from "services/context/budget/categoryContext";

const TransContent = () => {
  const {
    filterData: transactions,
    loading,
    error,
  } = useContext(transactionsContext);
  const { data: categories } = useContext(categoryContext);
  return (
    <div className="trans_content">
      {transactions.map((trans) => (
        <SingleTrans trans={trans} key={trans.id} cat={categories} />
      ))}
      {transactions.length === 0 && !error && (
        <p className="no-data">NO DATA</p>
      )}
      {loading && !error && <p className="loading">LOADING ..</p>}
      {error && <p className="data-error">{error}</p>}
    </div>
  );
};

export default TransContent;
