import * as React from "react"
import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../LoginForm/RegisterForm/RegisterForm"
import NavBar from "../Home/NavBar/NavBar"
import "./LoggedOutView.css"

export default function LoggedOutView({handleLogin}) {
    return (
        <div className="logged-out">
            <NavBar />
            <LoginForm handleLogin={handleLogin} />
            {/* <RegisterForm handleLogin={handleLogin} /> */}
        </div>
    )
}