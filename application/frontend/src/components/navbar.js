import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isNavBarActive, setNavbarActive] = useState(false);
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

          <Link to="/about" className="navbar-item">
            About
          </Link>

          {/* <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div> */}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to="/register" className="button is-link">
                <strong>Register</strong>
              </Link>
              <Link to="/login" className="button is-light">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
