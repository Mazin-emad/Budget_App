import BudgetNumber from "./BudgetNumber";
import "./Hero.css";
import { Coins, Money, CreditCard } from "phosphor-react";

const Hero = () => {
  return (
    <div className="hero_budget">
      <div className="hero_budget-bg">
        <img src="https://unsplash.it/1200/400" alt="random img" />
      </div>
      <div className="container">
        <div className="hero_budget-numbers">
          <BudgetNumber money={500} title="total money">
            <Coins weight="duotone" />
          </BudgetNumber>
          <BudgetNumber money={500} title="total income">
            <Money weight="duotone" />
          </BudgetNumber>
          <BudgetNumber money={500} title="total expanse">
            <CreditCard weight="duotone" />
          </BudgetNumber>
        </div>
      </div>
    </div>
  );
};

export default Hero;
