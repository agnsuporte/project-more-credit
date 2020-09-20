import React from "react";

import Spinner from "../../assets/imgs/spinner-cicler.gif";

import "./fullload.css";

const FullLoad = () => {
  return (
    <div className="fp-container">
      <div className="fp-loader">
        <img src={Spinner} width="80px" height="80px" alt="loading" />
        <p>Aguarde...</p>
      </div>
    </div>
  );
};

export default FullLoad;
