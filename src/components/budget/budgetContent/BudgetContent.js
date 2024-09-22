import React from "react";
import "./budgetcontent.css";
import { Tabs, Tab } from "components/ui";
import Transactions from "./transactions/Transactions";

const BudgetContent = () => {
  return (
    <div className="budget_content">
      <div className="container">
        <Tabs>
          <Tab title="data">
            <Transactions />
          </Tab>
          <Tab title="income">income</Tab>
          <Tab title="expanses">expanses</Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default BudgetContent;
