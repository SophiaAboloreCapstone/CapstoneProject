import * as React from "react"
import "./Home.css"
import Hero from "./Hero/Hero"
import NavBar from "./NavBar/NavBar"
import Testimonials from "../Testimonials/Testimonials"
import Footer from "./Footer/Footer"
import Activities from "../Activities/Activities"
// import Hero from "../Hero/Hero"
export default function Home({ isLoggedIn, handleLogout }) {
    return (
        <div className="home">
            <NavBar  isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <Hero />
            <Testimonials />
            <Footer />
        </div>
    )
}
