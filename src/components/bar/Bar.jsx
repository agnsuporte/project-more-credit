import React from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../services/auth";

import logo from "../../assets/Logo_Netmore.png";

import "./bar.css";

const menu = [{ _id: 2, link: "/main", description: "Main" }];

const Bar = (props) => {
  const { isLogged, logged } = props;

  const onClickLogged = () => {
    logout();
    isLogged();
    return;
  };

  const Logout = () => {
    return (
      <li>
        <Link to="/" onClick={onClickLogged}>
          Sair
        </Link>
      </li>
    );
  };

  const Login = () => {
    return (
      <li>
        <NavLink to="/login" activeClassName="active-item">
          Fazer Login
        </NavLink>
      </li>
    );
  };

  const toggleClickMenu = () => {
    document.querySelector(".toggle").classList.toggle("active");
    document.querySelector("nav ul").classList.toggle("active-menu");
  };

  return (
    <nav>
      <Link to="/" className="logo">
        <img src={logo} alt="logo" />
      </Link>

      <div className="toggle" onClick={toggleClickMenu}></div>

      <ul className="menu">
        {menu.map((item) => {
          return (
            <li className="" key={item._id}>
              <NavLink to={item.link} activeClassName="active-item">
                {item.description}{" "}
              </NavLink>
            </li>
          );
        })}
        {logged ? <Logout /> : <Login />}
      </ul>
    </nav>
  );
};

export default Bar;
