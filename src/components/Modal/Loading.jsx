import React from "react";

import "./show-message.css";

const Loagin = () => {
  return (
    <div className="message-modal">
      <h2 className="message-modal__title">
        <div className="fa-3x box-info">
          <i className="fas fa-sync fa-spin"></i>
        </div>
      </h2>

      <div className="message-modal__body"> Por favor aguarde... </div>
    </div>
  );
};

export default Loagin;
