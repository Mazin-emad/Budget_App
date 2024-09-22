import ReactDOM from "react-dom";
import "./Model.css";

const Model = ({ visible, children, closeModel }) => {
  if (!visible) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={closeModel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.querySelector("#model-root")
  );
};

export default Model;
