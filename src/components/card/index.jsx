import React, { useState } from "react";

import "./card.css";

import Modal from "../Modal/Modal";
import ShowDetails from "../Modal/ShowDetails";

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

  const [openModal, setOpenModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);

  const openShowMessageModal = () => setOpenMessageModal(true);
  const openCloseMessageModal = () => setOpenMessageModal(false);

  const onClickCloseModal = () => setOpenModal(false);
  const onClickOpenModal = () => setOpenModal(true);

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
              onClick={onClickOpenModal}
            >
              Preview
            </button>

            <button
              type="button"
              className="credit-card__link"
              onClick={openShowMessageModal}
            >
              Abrir Proposta
            </button>

            <button
              type="button"
              className="credit-card__link"
              onClick={openShowMessageModal}
            >
              Excluir
            </button>

            {/* <a
              href={"/"}
              target="_blank"
              rel="noopener noreferrer"
              className="credit-card__link"
            >
              Abrir Proposta
            </a>
            <Link to={`/edit/${1}`} className="credit-card__link">
              Excluir
            </Link> */}
          </div>
        </footer>
      </div>
      <Modal isOpen={Boolean(openModal)} onClickClose={onClickCloseModal}>
        <ShowDetails
          data={props.data}
          onClickClose={onClickCloseModal}
        ></ShowDetails>
      </Modal>
      <Modal
        isOpen={Boolean(openMessageModal)}
        onClickClose={openCloseMessageModal}
      >
        <h2 className="message-modal__title">
          Muito obrigado por esta oportunidade!
        </h2>

        <div className="message-motal__text">
          <p>Este recurso não está disponível</p>
        </div>

        <div className="message-modal-buttons">
          <button
            type="button"
            className="message-modal__button"
            onClick={openCloseMessageModal}
          >
            Ok, Obrigado!
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
