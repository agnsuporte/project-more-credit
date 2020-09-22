import React, { useEffect, useState } from "react";

import { parseISO, format } from "date-fns";

import { FullLoad } from "../../components";
import getProposal from "../../services/proposal";
import Modal from "../../components/Modal/Modal";

import getChekToken from "../../services/chektoken";
import { logout } from "../../services/auth";

import "./credit.css";

const Credit = (props) => {
  const { id } = props.match.params;
  const creditURL = "/api/v1/cred/" + id;

  const [proposal, setProposal] = useState([]);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const [values, setValues] = useState({});
  // const [openModal, setOpenModal] = useState(false);

  const [openMessageModal, setOpenMessageModal] = useState(false);

  const openShowMessageModal = () => setOpenMessageModal(true);
  const openCloseMessageModal = () => setOpenMessageModal(false);

  useEffect(() => {
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjYxMjBlODQ2OTk5MzY4NTZlZjY5MjUiLCJuYW1lIjoiQW5hIE1hcmlhIiwiZW1haWwiOiJhbmFtYXJpYUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MDA2MDM1MjEsImV4cCI6MTYwMDYxMDcyMX0.yel3MQsRQENe8NWtB-CK0CzgHjG4zdn--4s1PPVo5Jk
    window.scrollTo(0, 0);

    const getData = async () => {
      // -----
      const token = await getChekToken();

      if (token.err) {
        logout();
      }

      const data = await getProposal(creditURL);

      if (!data.err) {
        await setProposal(data[0]);
      } else {
        setMessage(data.message);
      }

      setLoader(false);
    };

    if (id) {
      setLoader(true);
      getData();
    }
  }, [id, creditURL]);

  if (loader) {
    return <FullLoad />;
  }

  if (message) {
    return (
      <section id="credit" className="credit">
        <div className="credit-container">
          <h1>{message}</h1>
        </div>
      </section>
    );
  }

  if (
    !proposal.address ||
    !proposal.personalDocuments ||
    !proposal.deviceSpecification ||
    !proposal.bankDetails
  ) {
    return null;
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...values, _id: proposal._id };

    openShowMessageModal();

    return null && data;
  };

  return (
    <section id="credit" className="credit">
      <div className="credit-container">
        {/* <!---  */}
        <div className="credit-info">
          <h1 className="title">{proposal.fullName}</h1>

          <div className="contex">
            <address className="bloco-endereco">
              <strong>Data de Nasc.: </strong>
              {format(parseISO(proposal.dateOfBirth), "dd/MM/yyyy")}
              <br />
              <br />
              <strong>Telefone: </strong>
              {proposal.phone}
              <br />
              <strong>E-mail: </strong>
              {proposal.email}
              <br />
              <strong>Rede Social: </strong>
              {proposal.socialNetwork}
              <br />
              <br /> <br />
              <strong>Endereço: </strong>
              {proposal.address.streetOrAvenue}
              <br />
              <strong>Cidade: </strong>
              {proposal.address.city}
              <br />
              <strong>Estado: </strong>
              {proposal.address.state}
              <br />
              <strong>País: </strong>
              {proposal.address.country}
              {"  "}
              <strong>CP: </strong>
              {proposal.address.zipCode}
              <br />
            </address>

            <img
              src={
                proposal.personalDocuments.pictureSelfieWithPassport.location
              }
              alt={proposal.fullName}
            />
          </div>
        </div>

        <hr />

        <div className="credit-info">
          <h1 className="title">Documentação</h1>

          <div className="contex">
            <article className="bloco-documentos">
              <strong>RG: </strong>
              {proposal.personalDocuments.rg}
              <br />
              <strong>CPF: </strong>
              {proposal.personalDocuments.cpf}
              <br />
              <strong>Passaporte: </strong>
              {proposal.personalDocuments.passportNumber}
              <br /> <br />
              <strong>Banco - Titular da Conta: </strong>
              {proposal.bankDetails.ownersAccountName}
              <br />
              <strong>Número de Conta: </strong>
              {proposal.bankDetails.numberAccount}
              <br />
              <strong>Sort Code: </strong>
              {proposal.bankDetails.sortCodeAccount}
              <br />
            </article>

            <img
              src={proposal.personalDocuments.picturePassportOrRg.location}
              alt={proposal.fullName}
            />
          </div>
        </div>

        <hr />

        <div className="credit-info">
          <h1 className="title">Objeto de Interesse</h1>

          <div className="contex">
            <article className="bloco-produto">
              <strong>Descrição do Produto: </strong>
              <br /> <br />
              {proposal.deviceSpecification.deviceName}
              <br /> <br />
              <strong>Valor da Entrada: </strong>
              {proposal.deviceSpecification.inputValue}
              <br /> <br />
              <strong>Número de Parcelas (semanas?): </strong>
              {proposal.deviceSpecification.numberOfWeeks}
              <br />
            </article>

            {proposal.deviceSpecification.diviceURL !== "undefined" && (
              <img
                src={proposal.deviceSpecification.diviceURL}
                alt={proposal.fullName}
              />
            )}
          </div>
        </div>

        <hr />

        <div className="credit-info">
          <h1 className="title">Responder</h1>

          <div className="contex">
            <article className="bloco-proposta">
              <strong>Data de Envio: </strong>
              {format(parseISO(proposal.createAt), "dd/MM/yyyy")}
              <br /> <br />
              <strong>Status: </strong>
              {proposal.creditAccepted ? "Deferido" : "Aguardando deferimento"}
              <br /> <br />
            </article>
          </div>

          <div className="contex">
            <form
              onSubmit={handleSubmit}
              id="proposal-form-response"
              method="POST"
            >
              <fieldset>
                <div className="field-group">
                  <div className="field">
                    <label htmlFor="creditAccepted">Aceitar proposta?</label>
                    <select
                      name="creditAccepted"
                      id="creditAccepted"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione uma opção</option>
                      <option value={true}>Aceitar</option>
                      <option value={false}>Recusar</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="collectionDate">Data de Recolha</label>
                    <input
                      type="date"
                      id="collectionDate"
                      name="collectionDate"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="field-group">
                  <div className="field">
                    <label htmlFor="message">Mensagem</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="10"
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <div className="field-group">
                  {!loader && (
                    <button type="submit" className="button" disabled={loader}>
                      Concluir Proposta
                    </button>
                  )}
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
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
    </section>
  );
};

export default Credit;
