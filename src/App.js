import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./services/routes/Routes";
import Bar from "./components/bar/Bar";
import { isAuthenticated } from "./services/auth";

import "./App.css";

function App() {
  const [logged, setLogged] = useState(isAuthenticated());
  const isLogged = () => setLogged(isAuthenticated());

  return (
    <BrowserRouter>
      <main style={{ marginTop: "75px" }}>
        <Bar logged={logged} isLogged={isLogged} />
        <Routes logged={logged} isLogged={isLogged} />
      </main>
    </BrowserRouter>
  );
}

export default App;
