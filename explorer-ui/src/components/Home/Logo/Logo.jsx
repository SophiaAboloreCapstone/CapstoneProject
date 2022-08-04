import * as React from "react"
import "./Logo.css"
import logo from "../../../data/imgs/Explorer.png"
import {
    Link
} from "react-router-dom";

export default function Logo() {
    return (
        <div className="logo">
            <Link to={"/"}> 
                <a href="">
                    <img className="logo-img" src={logo} ></img>
                </a>
            </Link>
        </div>
    )
}
