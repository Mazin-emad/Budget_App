import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import logoImg from "assets/images/logo.png";
import { Button, Model } from "components/ui";
import BudgetForm from "components/budget/budgetForm/BudgetForm";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const isMount = useRef(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isMount.current) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 60) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      });
      isMount.current = true;
    }
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header_row">
          {/* brand */}
          <div className="header_brand">
            <div className="logo">
              <img src={logoImg} alt="logo brand"></img>
            </div>
            <h1>Budget App</h1>
          </div>
          {/* actions */}
          <div className="header_actions">
            <div className="header_actions_add">
              <Button onClick={() => setShowModal(true)}>+</Button>
            </div>
          </div>
        </div>
      </div>
      <Model visible={showModal} closeModel={() => setShowModal(false)}>
        <BudgetForm closeModel={() => setShowModal(false)} />
      </Model>
    </header>
  );
};

export default Header;
