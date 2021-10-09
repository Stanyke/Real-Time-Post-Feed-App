import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppProvider from "./store/providers/AppProvider";

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
