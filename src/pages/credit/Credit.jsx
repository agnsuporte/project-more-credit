import React, { useEffect, useState } from "react";
import { parseISO, format, formatRelative, formatDistance } from "date-fns";

import { FullLoad } from "../../components";
import getProposal from "../../services/proposal";

import "./credit.css";

const Credit = (props) => {
  const { id } = props.match.params;
  const creditURL = "/api/v1/cred/" + id;

  const [proposal, setProposal] = useState([]);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    const getData = async () => {
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
              <strong>E-mail: </strong>
              {proposal.email}
              <br />
              <strong>Rede Social: </strong>
              {proposal.socialNetwork}
              <br />
              <strong>Telefone: </strong>
              {proposal.phone}
              <br /> <br /> <br />
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
            <article className="bloco-endereco">
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
            <article className="bloco-endereco">
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

            <img
              src={proposal.deviceSpecification.diviceURL}
              alt={proposal.fullName}
            />
          </div>
        </div>

        <hr />

        <div className="credit-info">
          <h1 className="title">Responder</h1>

          <div className="contex">
            <article className="bloco-endereco">
              <strong>Data de Envio: </strong>
              {format(parseISO(proposal.createAt), "dd/MM/yyyy")}
              <br /> <br />
              <strong>Status: </strong>
              {proposal.creditAccepted ? "Deferido" : "Aguardando deferimento"}
              <br /> <br />
            </article>
          </div>

          <div className="contex">
            <div className="form">
              <form>
                <ul className="form-container__login">
                  <li>
                    <h2>Login</h2>
                  </li>
                  <li className="message">
                    {/* {loading && <div>Loading...</div>}
                    {message && <div>{message}</div>} */}
                  </li>
                  <li>
                    <div className="field-group__login">
                      <div className="field__login">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"></input>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="field-group__login">
                      <div className="field__login">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                        ></input>
                      </div>
                    </div>
                  </li>
                  <li>
                    <button type="submit" className="button__login primary">
                      Entrar
                    </button>
                  </li>
                  <li>Are you new here?</li>
                  <li>
                    <button
                      type="button"
                      className="button__login secondary text-center"
                    >
                      Crie sua conta!
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credit;
