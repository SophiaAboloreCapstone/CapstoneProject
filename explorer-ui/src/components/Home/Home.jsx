import * as React from "react"
import "./Home.css"
import Hero from "./Hero/Hero"
import NavBar from "../NavBar/NavBar"
// import Hero from "../Hero/Hero"
export default function Home() {
    return (
        <div className="home">
            <NavBar />
            <Hero />
        </div>
    )
}
