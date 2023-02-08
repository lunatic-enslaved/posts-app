import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { TheNavbar } from "./components/TheNavbar";
import { AuthContextProvider } from "./context";
import { Router } from "./router";

import "./styles/App.css";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <TheNavbar></TheNavbar>

        <div
          className="App"
          style={{
            flex: "1 1 auto",
            width: "100%",
            margin: "0 auto",
            maxWidth: "960px",
            padding: "16px",
            overflow: "auto",
          }}
        >
          <Suspense fallback={<div>Loading</div>}>
            <Router />
          </Suspense>
        </div>
      </AuthContextProvider>
    </BrowserRouter>
  );
};
