import React from "react";

import Spinner from "../../assets/imgs/spinner-cicler.gif";

import "./fullload.css";

const FullLoad = () => {
  return (
    <div className="fp-container">
      <img src={Spinner} className="fp-loader" alt="loading" />
    </div>
  );
};

export default FullLoad;
