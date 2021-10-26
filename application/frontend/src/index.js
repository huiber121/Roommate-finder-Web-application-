import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "flexboxgrid/css/flexboxgrid.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { About } from "./pages/about";
import Sanket from "./pages/about/sanket";
import Georgina from "./pages/about/georgina";
import Swetha from "./pages/about/swetha";
import Zhiling from "./pages/about/zhiling";
import William from "./pages/about/william";
import Gabriel from "./pages/about/gabriel";
import Eanguy from "./pages/about/eanguy";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Navbar from "./components/navbar";
import SearchRoommates from "./pages/search/search-roommates";
import AddRoom from "./pages/add-room/add-room";

ReactDOM.render(
  <React.StrictMode>
    <div className="root">
      <div className="tagline-container">
        SFSU Software Engineering Project CSC 648-848, Fall 2021. For
        Demonstration Only
      </div>

      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/find-roommates" exact component={SearchRoommates} />
          <Route path="/add-room" exact component={AddRoom} />
          <Route path="/about/georgina" exact>
            <Georgina />
          </Route>
          <Route path="/about/swetha" exact>
            <Swetha />
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
    </div>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
