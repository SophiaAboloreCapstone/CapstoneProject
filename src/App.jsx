import * as React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./App.css";
import Home from "./components/Home/Home"
import Navbar from "./components/Home/Navbar/Navbar"
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import Profile from "./components/Profile/Profile";
import MatchGrid from "./components/MatchGrid/MatchGrid";
import TravellerMap from "./components/TravellerMap/TravellerMap";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function App() {
    return (
        <div className="app">
            <BrowserRouter>

                <main>
                    {/* YOUR CODE HERE! */}
                    <Navbar />
                    {/* <Sidebar /> */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/login" element={<Login />} /> */}
                        <Route path="/login" element={<Login />} />
                        <Route exact path="/sign-up" element={<SignUp />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/matches" element={<MatchGrid />} />
                        <Route path="/map" element={<TravellerMap />}/>
                    </Routes>
                    <Footer />

                </main>
            </BrowserRouter>
        </div>
    )
}
