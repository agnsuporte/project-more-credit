import React from "react";
import { Link } from "react-router-dom";

import "./card.css";

const Card = (props) => {
  const {
    // _id,
    fullName,
    email,
    phone,
    // dateOfBirth,
    // socialNetwork,
    personalDocuments,
    // address,
    deviceSpecification,
    // bankDetails,
    creditAccepted,
  } = props.data;

  return (
    <div className="credit-card">
      <img
        src={personalDocuments.pictureSelfieWithPassport.location}
        alt={fullName}
        className="credit-card__image"
      />
      <div className="credit-card__info">
        <div className="credit-card__title">
          <h2 className="col50">{fullName}</h2>
          <div className="col50">{deviceSpecification.deviceName}</div>
        </div>

        <span className="credit-card__phone">{phone}</span>

        <footer className="credit-card__footer">
          <div className="credit-card__email">{email}</div>

          <div className="credit-card__actions">
            <button
              type="button"
              className="credit-card__link"
              onClick={() => console.log(fullName)}
            >
              {creditAccepted ? "Notificado" : "Notificar"}
            </button>

            <a
              href={"/"}
              target="_blank"
              rel="noopener noreferrer"
              className="credit-card__link"
            >
              Abrir Proposta
            </a>
            <Link to={`/edit/${1}`} className="credit-card__link">
              Excluir
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Card;
