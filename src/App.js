import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./services/routes/Routes";
import Bar from "./components/bar/Bar";

import logo from "./assets/Logo_Netmore.png";

import "./App.css";

const menu = [{ _id: 1, link: "/main", description: "Main" }];

function App() {
  return (
    <BrowserRouter>
      <Bar listMenu={menu} appLogo={logo} />
      <main style={{marginTop: "75px"}}>
        <Routes />
      </main>
    </BrowserRouter>
  );
}

export default App;
