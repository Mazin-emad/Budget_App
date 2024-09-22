import MainLayout from "../layout/MainLayout";
import Hero from "components/budget/hero/Hero";
import BudgetContent from "components/budget/budgetContent/BudgetContent";

const BudgetPage = () => {
  return (
    <MainLayout>
      <Hero />
      <BudgetContent></BudgetContent>
    </MainLayout>
  );
};

export default BudgetPage;
