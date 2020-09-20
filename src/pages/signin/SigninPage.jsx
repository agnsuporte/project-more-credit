import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import { setToken } from "../../services/auth";
import getSignin from "../../services/signin";
import { Modal } from "../../components";

import "./signin.css";

function PageSignin(props) {
  const history = useHistory();
  const elEmai = useRef(null);
  const elPass = useRef(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openMessageModal, setOpenMessageModal] = useState(false);

  const openShowMessageModal = () => setOpenMessageModal(true);
  const openCloseMessageModal = () => setOpenMessageModal(false);

  const { isLogged, location } = props;

  const handleFocus = (e) => {
    if (email && password) {
      if (message || loading) {
        setLoading(false);
        setMessage("");
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      if (!email) {
        setMessage("Email is required");
        elEmai.current.focus();
      } else {
        setMessage("Password is required");
        elPass.current.focus();
      }
    } else {
      setMessage("");
      setLoading(true);

      const signin = await getSignin(email, password, "/api/v1/login");

      if (!signin.err) {
        setToken(signin.token);
        isLogged();

        if (location.state) {
          return history.push(location.state.from);
        }
        return history.push("/");
      } else {
        setLoading(false);
        setMessage(signin.message);
      }
    }
    return false;
  };

  return (
    <section className="login">
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container__login">
            <li>
              <h2>Login</h2>
            </li>
            <li className="message">
              {loading && <div>Loading...</div>}
              {message && <div>{message}</div>}
            </li>
            <li>
              <div className="field-group__login">
                <div className="field__login">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={elEmai}
                    onFocus={handleFocus}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  ></input>
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
                    ref={elPass}
                    onFocus={handleFocus}
                    onChange={(e) => setPassword(e.target.value)}
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
                onClick={openShowMessageModal}
                className="button__login secondary text-center"
              >
                Crie sua conta!
              </button>
            </li>
          </ul>
        </form>
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
}
export default PageSignin;
