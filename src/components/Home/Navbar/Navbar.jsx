import * as React from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"
import Logo from "../Logo/Logo"
export default function Header() {
    return (
        <nav className="navbar">
            <div className="nav-content">
                <div className="logo">
                    <Logo />
                </div>
                <ul className="links">
                        <a className="pages" href="">Home</a>
                        <a className="pages" href="#Learn">Learn</a>
                        <a className="pages" href="#Buy">Safety</a>
                        <a className="pages" href="#About">Support</a>
                </ul>
                <Link to="/login">
                <ul className="login">
                    <button href="#login" className="login-button">Login</button>
                </ul>
                </Link>
            </div>
            {/* <p>Navbar</p> */}
        </nav>
    )
}
