import * as React from "react";
import "./NavBar.css";
import Logo from "../Logo/Logo";
import { Link } from 'react-router-dom';
export default function NavBar({ isLoggedIn, handleLogout }) {
  const onClick = (event) => {
    event.preventDefault();
    handleLogout();
  };

  return (
    <div id="NavBar">
      <div className="content">
        <div className="navbar-logo">
          <Logo />
        </div>
        <ul className="links">
          <li>
            <a className="pages" href="">
              Products
            </a>
          </li>
          <li>
            <a className="pages" href="#Buy">
              Learn
            </a>
          </li>
          <li>
            <a className="pages" href="#About">
              Safety
            </a>
          </li>
          <li>
            <a className="pages" href="#Contact">
              Support
            </a>
          </li>
          <li>
            <a className="pages" href="#Contact">
              Download
            </a>
          </li>
        </ul>
        {isLoggedIn != true
        ? <div className="nav-directory">
          <li>
            <Link 
            to="/login">
            <button className="login-button" href="">
              Login
            </button>
            </Link>
          </li>
        </div>
      : <div className="nav-directory">
      <li>
        <Link 
        to="/login">
        <button className="login-button" href="">
          Logout
        </button>
        </Link>
      </li>
    </div>
}
      </div>
    </div>
  );
}
