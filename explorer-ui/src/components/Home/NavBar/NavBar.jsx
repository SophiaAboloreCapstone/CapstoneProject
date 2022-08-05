import * as React from "react";
import "./NavBar.css";
import Logo from "../Logo/Logo";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export default function NavBar({ isLoggedIn, handleLogout }) {
  const navigate = useNavigate();
  const onLogoutClick = (event) => {
    event.preventDefault();
    handleLogout();
    navigate("/");
  };

  return (
    <div id="NavBar">
      <div className="content">
        <div className="navbar-logo">
          <Logo />
        </div>
        {/* These links are just here for decoration and to make the page look like other web applications */}
        <ul className="links">
          <li>
            <a className="pages" href="">
              Products
            </a>
          </li>
          <li>
            <a className="pages" href="">
              Learn
            </a>
          </li>
          <li>
            <a className="pages" href="">
              Safety
            </a>
          </li>
          <li>
            <a className="pages" href="">
              Support
            </a>
          </li>
          <li>
            <a className="pages" href="">
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
        <button onClick={(event) => onLogoutClick(event)} className="login-button" href="">
          Logout
        </button>
      </li>
    </div>
}
      </div>
    </div>
  );
}
