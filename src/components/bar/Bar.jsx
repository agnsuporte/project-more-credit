import React from "react";
import { Link } from "react-router-dom";

import "./bar.css";

const Bar = (props) => {
  const { listMenu, appLogo } = props;

  const toggleClickMenu = () => {
    document.querySelector(".toggle").classList.toggle("active");
    document.querySelector("nav ul").classList.toggle("active-menu");
  };

  return (
    <nav>
      <Link to="/" className="logo">
        {!appLogo && "LOGO"}
        {appLogo && <img src={appLogo} alt="logo" />}
      </Link>

      <div className="toggle" onClick={toggleClickMenu}></div>

      <ul className="menu">
        {listMenu.map((item) => {
          return (
            <li className="" key={item._id}>
              <a href={item.link} > {item.description} </a>
            </li>
          );
        })}
      </ul>

      {/* <a href="/" className="lang">
        Pb
      </a> */}
    </nav>
  );
};

export default Bar;
