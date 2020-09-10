import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const portalRoot = document.getElementById("root-modal");


const Modal = ({ children, isOpen, onClickClose }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal__overlay">
      <div className="modal">
        <button
          type="button"
          className="modal__close-button"
          onClick={onClickClose}
        >
          X
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    portalRoot
  );
};

export default Modal;
