import React from "react";

import "./show-message.css";

const ShowMessage = (props) => {
  const { title, message, onClickClose } = props;

  return (
    <div className="message-modal">
      <h2 className="message-modal__title">{title}</h2>

      <div className="message-modal__body"> {message} </div>

      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          type="button"
          className="message-modal__button"
          onClick={onClickClose}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default ShowMessage;
