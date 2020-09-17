import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { setToken } from "../../services/auth";
import api from "../../services/api";

import "./signin.css";

function PageSignin(props) {
  const history = useHistory();
  const elEmail = useRef(null);
  const elPass = useRef(null);

  const { isLogged, logged, location } = props;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        elEmail.current.focus();
      } else {
        setMessage("Password is required");
        elPass.current.focus();
      }

      return false;
    } else {
      setMessage("");
      setLoading(true);
      await api
        .get("/api/v1/login", {
          auth: {
            username: email,
            password: password,
          },
        })
        .then(async (resp) => {
          if (!resp.data.err) {
            await setToken(resp.data.token);
            await isLogged();

            if (logged) {
              if (location.state) {
                return history.push(location.state.from);
              }
              return history.push("/");
            }
          }
          setLoading(false);
          setMessage(resp.data.message);
        })
        .catch((err) => {
          console.log("@GnErr =--> ", err);
        });
      setLoading(false);
    }
    return false;
  };

  return (
    <section className="login">
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container__login">
            <li>
              <h2>Faça Login</h2>
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
                    ref={elEmail}
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
            <li>É novo aqui?</li>
            <li>
              <Link to="/login" className="button__login secondary text-center">
                Crie sua conta!
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}
export default PageSignin;
