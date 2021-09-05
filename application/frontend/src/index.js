import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "flexboxgrid/css/flexboxgrid.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { About } from "./pages/about";
import Sanket from "./pages/about/sanket";
import Georgina from "./pages/about/georgina";
import Shwetha from "./pages/about/shwetha";
import Zhiling from "./pages/about/zhiling";
import William from "./pages/about/william";
import Gabriel from "./pages/about/gabriel";
import Eanguy from "./pages/about/eanguy";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/about/georgina" exact>
          <Georgina />
        </Route>
        <Route path="/about/shwetha" exact>
          <Shwetha />
        </Route>
        <Route path="/about/zhiling" exact>
          <Zhiling />
        </Route>
        <Route path="/about/william" exact>
          <William />
        </Route>
        <Route path="/about/sanket" exact>
          <Sanket />
        </Route>
        <Route path="/about/gabriel" exact>
          <Gabriel />
        </Route>
        <Route path="/about/eanguy" exact>
          <Eanguy />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
