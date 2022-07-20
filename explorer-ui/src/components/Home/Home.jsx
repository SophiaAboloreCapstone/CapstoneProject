import * as React from "react"
import "./Home.css"
import Hero from "./Hero/Hero"
import NavBar from "./NavBar/NavBar"
import Testimonials from "../Testimonials/Testimonials"
import Footer from "./Footer/Footer"
// import Hero from "../Hero/Hero"
export default function Home() {
    return (
        <div className="home">
            <NavBar />
            <Hero />
            <Testimonials />
            <Footer />
        </div>
    )
}
