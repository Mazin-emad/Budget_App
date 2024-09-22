import React from "react";
import "./Transactions.css";

import TransHeader from "./shard/TransHeader";
import TransContent from "./shard/TransContent";

const Transactions = () => {
  return (
    <section className="trans">
      <TransHeader />
      <TransContent />
    </section>
  );
};

export default Transactions;
