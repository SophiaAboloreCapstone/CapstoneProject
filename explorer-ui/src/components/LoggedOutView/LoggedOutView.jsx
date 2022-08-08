import * as React from "react"
import LoginForm from "../LoginForm/LoginForm"
import NavBar from "../Home/NavBar/NavBar"
import "./LoggedOutView.css"

export default function LoggedOutView({profileCreated, handleLogin, findProfile, isLoggedIn, handleLogout}) {
    return (
        <div className="logged-out">
            <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <LoginForm profileCreated={profileCreated} findProfile={findProfile} handleLogin={handleLogin} />
        </div>
    )
}