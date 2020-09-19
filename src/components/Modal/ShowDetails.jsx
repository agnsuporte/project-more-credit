import React from "react";

import "./show-details.css";

const ShowDetails = (props) => {
  const { title, message, onClickClose, data } = props;

  return (
    <div className="detail-modal">
      <h2 className="detail-modal__title">{data.fullName}</h2>

      <div className="detail-modal__body">
        <section className="show-details">
          <div
            className="foto"
            style={{
              backgroundImage: `url(${data.personalDocuments.pictureSelfieWithPassport.location})`,
            }}
          ></div>

          <div className="detail-text">
            <article className="article">
              <h2>
                <i className="fas fa-phone-square-alt"></i> {"  "}
                {data.phone}
              </h2>
              <p>
                <strong>E-mail: </strong>
                {data.email}
              </p>
              <p>
                <strong>Rede Social: </strong>
                {data.socialNetwork}
              </p>
            </article>

            <article className="article">
              <p>
                <strong>Valor Entrada: </strong>
                {data.deviceSpecification.inputValue}
              </p>
              <p>
                <strong>Número de Parcelas: </strong>
                {data.deviceSpecification.numberOfWeeks}
              </p>
              <p>
                <strong>Status: </strong>
                {data.creditAccepted ? "Deferido" : "Aguardando deferimento"}
              </p>
            </article>

            <address className="bloco-endereco">
              <strong>Endereço: </strong>
              {data.address.streetOrAvenue}
              <br />
              <strong>Cidade: </strong>
              {data.address.city}
              <br />
              <strong>Estado: </strong>
              {data.address.state}
              <br />
              <strong>País: </strong>
              {data.address.country}
              {"  "}
              <strong>CP: </strong>
              {data.address.zipCode}
              <br />
            </address>
          </div>
        </section>
      </div>

      <div className="detail-modal-buttons">
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          type="button"
          className="detail-modal__button"
          onClick={onClickClose}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default ShowDetails;
