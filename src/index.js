import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "global.css";
import { TransactionsProvider } from "services/context/budget/transactionsContext";
import { CategoryProvider } from "services/context/budget/categoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TransactionsProvider>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </TransactionsProvider>
  </React.StrictMode>
);
