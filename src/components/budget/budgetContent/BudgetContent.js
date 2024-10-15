import React, { useContext, useMemo } from "react";
import "./budgetcontent.css";
import { Tabs, Tab } from "components/ui";
import Transactions from "./transactions/Transactions";
import { categoryContext } from "services/context/budget/categoryContext";
import { transactionsContext } from "services/context/budget/transactionsContext";
import DoughnutChart from "components/ui/DougnutChart/DougnutChart";

const expansesColors = [
  "#4C0033",
  "#790252",
  "#AF0171",
  "#E80F88",
  "#513252",
  "#7A4069",
  "#CA4E79",
  "#FFC18E",
];
const incomeColors = [
  "#557B83",
  "#82954B",
  "#A2D5AB",
  "#E5EFC1",
  "#85C88A",
  "#0d5235",
  "#82A284",
  "#BABD42",
];

const BudgetContent = () => {
  const { data: catData } = useContext(categoryContext);
  const { data: transactions } = useContext(transactionsContext);

  const chartData = useMemo(() => {
    const data = [...transactions];
    const chartData = { income: null, expanse: null };
    if (transactions.length && catData && catData.length && transactions) {
      chartData.income = {};
      chartData.expanse = {};

      data.forEach((d) => {
        const catName = catData.find((cat) => cat.id === d.category).name;
        if (d.type === "income") {
          if (chartData.income[catName]) {
            chartData.income[catName] += +d.amount;
          } else {
            chartData.income[catName] = +d.amount;
          }
        } else if (d.type === "expanse") {
          if (chartData.expanse[catName]) {
            chartData.expanse[catName] += +d.amount;
          } else {
            chartData.expanse[catName] = +d.amount;
          }
        }
      });
    }
    return chartData;
  }, [transactions, catData]);

  return (
    <div className="budget_content">
      <div className="container">
        <Tabs>
          <Tab title="data">
            <Transactions />
          </Tab>
          <Tab title="income">
            {!chartData.income ? (
              <p className="center_text">No Data</p>
            ) : (
              <DoughnutChart data={chartData.income} colors={incomeColors} />
            )}
          </Tab>
          <Tab title="expanses">
            {!chartData.expanse ? (
              <p className="center_text">No Data</p>
            ) : (
              <DoughnutChart data={chartData.expanse} colors={expansesColors} />
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default BudgetContent;
