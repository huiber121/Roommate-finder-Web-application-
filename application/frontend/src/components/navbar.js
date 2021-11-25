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
                <Link to="/alerts" className="button is-success">
                  <span className="icon is-small">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ height: "1.2rem", width: "1.2rem" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </span>
                </Link>
                <Link to="/message-rooms" className="button is-info">
                  <span className="icon is-small">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ height: "1.2rem", width: "1.2rem" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </span>
                </Link>
                <div class="navbar-item button has-dropdown is-hoverable">
                  <a class="navbar-link">Preferences</a>

                  <div class="navbar-dropdown">
                    <Link to="/room-preferences" className="navbar-item">
                      <strong>Room Preferences</strong>
                    </Link>
                    <Link to="/roommate-preferences" className="navbar-item">
                      <strong>Roommate Preferences</strong>
                    </Link>
                    {/* <hr class="navbar-divider" /> */}
                  </div>
                </div>

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
