import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import axiosInstance from "../axios-config";
import {
  checkAdminState,
  checkLoginState,
  loginState,
} from "../pages/auth/login";

const Navbar = (props) => {
  const [isNavBarActive, setNavbarActive] = useState(false);

  const isLoggedIn = useRecoilValue(checkLoginState);
  const isAdmin = useRecoilValue(checkAdminState);
  const [login, setLogin] = useRecoilState(loginState);
  let history = useHistory();

  const logout = async () => {
    const data = await axiosInstance.post(
      `/api/logout`,
      {},
      { withCredentials: true }
    );
    console.log(data);
    if (data.data.message === "Logged out successfully") {
      setLogin(false);
      history.push("/");
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          {/* <img src={GatorRoomerLogo} width="166" height="30" /> */}
          <h3 className="has-text-weight-bold is-size-4">GatorRoomer</h3>
        </Link>

        <a
          role="button"
          className={["navbar-burger", isNavBarActive ? "is-active" : ""].join(
            " "
          )}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => setNavbarActive(!isNavBarActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={["navbar-menu", isNavBarActive ? "is-active" : ""].join(" ")}
      >
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/find-roommates" className="navbar-item">
            Find Roommates
          </Link>
          {isLoggedIn && !isAdmin ? (
            <Link to="/room-bookmarks" className="navbar-item">
              Bookmarks
            </Link>
          ) : isLoggedIn && isAdmin ? (
            <React.Fragment>
              <Link to="/admin/manage-rooms" className="navbar-item">
                Manage Rooms
              </Link>
              <Link to="/admin/manage-users" className="navbar-item">
                Manage Users
              </Link>
            </React.Fragment>
          ) : null}
          <Link to="/about" className="navbar-item">
            About
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {isLoggedIn && !isAdmin ? (
              <div className="buttons">
                <Link to="/add-room" className="button is-link">
                  <strong>Add Room</strong>
                </Link>
                <Link to="/my-preferences" className="navbar-item">
                  <strong>My Preferences</strong>
                </Link>
                <button onClick={() => logout()} className="button">
                  <strong>Logout</strong>
                </button>
              </div>
            ) : isLoggedIn && isAdmin ? (
              <div className="buttons">
                <Link to="/register" className="button is-link">
                  <strong>Add User</strong>
                </Link>
                <button onClick={() => logout()} className="button">
                  <strong>Logout</strong>
                </button>
              </div>
            ) : (
              <div className="buttons">
                <Link to="/register" className="button is-link">
                  <strong>Register</strong>
                </Link>
                <Link to="/login" className="button is-light">
                  Log in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
