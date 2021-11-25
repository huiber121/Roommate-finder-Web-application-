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
import { RecoilRoot } from "recoil";
import RoomBookmarks from "./pages/room-bookmarks/room-bookmarks";
import RoomDetails from "./pages/room-details/room-details";
import ManageRooms from "./pages/admin/manage-rooms/manage-rooms";
import RoomPreferences from "./pages/user-preferences/room-preferences";
import ManageUsers from "./pages/admin/manage-users/manage-users";
import RoommatePreferences from "./pages/user-preferences/roommate-preferences";
import Alerts from "./pages/alerts/alerts";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import MessageRooms from "./pages/messaging/message-rooms";
import MessageRoom from "./pages/messaging/message-room";
import "./pages/search/search-rooms.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <div className="root">
      <div className="tagline-container">
        SFSU Software Engineering Project CSC 648-848, Fall 2021. For
        Demonstration Only
      </div>
      <RecoilRoot>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route
              path="/login"
              exact
              render={(props) => <Login {...props} analytics={analytics} />}
            />
            <Route
              path="/register"
              exact
              render={(props) => <Register {...props} analytics={analytics} />}
            />
            <Route path="/find-roommates" exact component={SearchRoommates} />
            <Route path="/add-room" exact component={AddRoom} />
            <Route path="/room-bookmarks" exact component={RoomBookmarks} />
            <Route path="/room/:id" component={RoomDetails} />
            <Route path="/room-preferences" component={RoomPreferences} />
            <Route
              path="/roommate-preferences"
              component={RoommatePreferences}
            />
            <Route path="/alerts" component={Alerts} />
            <Route path="/message-room/:id" component={MessageRoom} />
            <Route path="/message-rooms" component={MessageRooms} />
            {/* ADMIN ROUTES */}
            <Route path="/admin/manage-rooms" component={ManageRooms} />
            <Route path="/admin/manage-users" component={ManageUsers} />
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
            <Route
              path="/"
              render={(props) => <App {...props} analytics={analytics} />}
            />
          </Switch>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
