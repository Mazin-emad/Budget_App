import { CurrencyDollar, PencilLine, Trash } from "phosphor-react";
import { Button, Model } from "components/ui";
import { useContext, useMemo, useState } from "react";
import { transactionsContext } from "services/context/budget/transactionsContext";
import BudgetForm from "components/budget/budgetForm/BudgetForm";

const SingleTrans = ({ trans, cat }) => {
  const { handelDelete } = useContext(transactionsContext);

  const [showModal, setShowModal] = useState(false);

  const currentCat = useMemo(() => {
    // eslint-disable-next-line eqeqeq
    let findCat = cat.find((c) => c.id == trans.category);

    if (findCat && findCat.name) {
      return findCat.name;
    } else {
      return "";
    }
  }, [cat, trans]);

  return (
    <div className="trans_item">
      <div
        className={`trans_item-icon ${trans.type === "expanse" ? "error" : ""}`}
      >
        <CurrencyDollar />
      </div>
      <div className="trans_item-data">
        <h4>{trans.title}</h4>
        <div>
          <small>${trans.amount}</small>,<small>{trans.date}</small>,
          <small>{currentCat}</small>
        </div>
      </div>
      <div className="trans_item-cta">
        <Button icon onClick={() => setShowModal(true)}>
          <PencilLine />
        </Button>
        <Button icon type="error" onClick={() => handelDelete(trans.id)}>
          <Trash />
        </Button>
      </div>
      <Model visible={showModal} closeModel={() => setShowModal(false)}>
        <BudgetForm
          closeModel={() => setShowModal(false)}
          defaultData={trans}
        />
      </Model>
    </div>
  );
};

export default SingleTrans;
