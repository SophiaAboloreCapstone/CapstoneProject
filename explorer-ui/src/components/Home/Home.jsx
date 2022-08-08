import * as React from "react"
import "./Home.css"
import Hero from "./Hero/Hero"
import NavBar from "./NavBar/NavBar"
import Testimonials from "../Testimonials/Testimonials"
import Footer from "./Footer/Footer"
export default function Home({ isLoggedIn, handleLogout }) {
    return (
        <div className="home">
            <NavBar  isLoggedIn={false} handleLogout={handleLogout}/>
            <Hero />
            <Testimonials />
            <Footer />
        </div>
    )
}
