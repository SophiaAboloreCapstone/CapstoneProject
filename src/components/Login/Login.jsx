import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

import "./Login.css";

class Login extends Component {
  render() {
    return (
    // <Router basename="/react-auth-ui/">
        <div className="Login">
          <div className="LoginAside" />
          <div className="LoginForm">
            <div className="pageSwitcher">
              <NavLink
                to="/sign-in"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to="/sign-up"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </NavLink>
            </div>

            <div className="formTitle">
              <NavLink
                to="/sign-in"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/sign-up"
                activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </NavLink>
            </div>

            {/* <Route exact path="/" component={SignUp} />
            <Route path="/sign-in" component={SignIn} /> */}
          </div>
        </div>
    // {/* </Router> */}
    );
  }
}

export default Login;