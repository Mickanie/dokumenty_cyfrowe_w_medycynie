import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//basename - because of /dokumenty_cyfrowe_w_medycynie in url (gh-pages)
ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}> 
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
