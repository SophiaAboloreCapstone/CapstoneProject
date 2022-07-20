import * as React from "react"
import LoginForm from "../LoginForm/LoginForm"
import RegisterForm from "../RegisterForm/RegisterForm"
import "./LoggedOutView.css"

export default function LoggedOutView({handleLogin}) {
    return (
        <div className="logged-out">
            <LoginForm handleLogin={handleLogin} />
            <RegisterForm handleLogin={handleLogin} />
        </div>
    )
}