import * as React from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
// import Home from "./components/Home/Home";
// import Navbar from "./components/Home/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
// import Login from "./components/Login/Login";
// import SignIn from "./components/Login/SignIn";
// import SignUp from "./components/Login/SignUp";
// import Profile from "./components/Profile/Profile";
// import MatchGrid from "./components/MatchGrid/MatchGrid";
// import TravellerMap from "./components/TravellerMap/TravellerMap";
import NavBar from "../NavBar/NavBar";
import MessagesView from "../MessagesView/MessagesView";
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import ProfileView from "../ProfileView/ProfileView";
import Home from "../Home/Home"
import MatchGrid from "../MatchGrid/MatchGrid"
import { useState } from "react";
import { useEffect } from "react";
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("current_user_id") != null
  );
  const [profileCreated, setProfileCreated] = useState(false);
  // For every network request, add a custom header for the logged in user
  // The backend API can check the header for the user id
  //
  // Note: This isn't a secure practice, but is convenient for prototyping.
  // In production, you would add an access token instead of (or in addition to)
  // the user id, in order to authenticate the request
  const addAuthenticationHeader = () => {
    const currentUserId = localStorage.getItem("current_user_id");
    if (currentUserId !== null) {
      axios.defaults.headers.common = {
        current_user_id: currentUserId,
      };
    }
  };
  addAuthenticationHeader();

  const handleLogout = () => {
    localStorage.removeItem("current_user_id");
    axios.defaults.headers.common = {};
    setIsLoggedIn(false);
  };

  const handleLogin = (user) => {
    console.log(user);
    localStorage.setItem("current_user_id", user["objectId"]);
    addAuthenticationHeader();

    setIsLoggedIn(true);
  };

  const handleCreateProfile = (profileInfo) => {
    // console.log(profile)
    localStorage.setItem("current_user_id", profileInfo["objectId"]);
    addAuthenticationHeader();

    // setIsLoggedIn(true);
    setProfileCreated(true)
    // console.log("profile creation stat: ", profileCreated)
  };
  

  return (
    // <div className="app">
    //   <BrowserRouter>
    //     <main>
    //       {/* YOUR CODE HERE! */}
    //       <Navbar />
    //       {/* <Sidebar /> */}
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         {/* <Route path="/login" element={<Login />} /> */}
    //         <Route path="/login" element={<Login />} />
    //         <Route exact path="/sign-up" element={<SignUp />} />
    //         <Route path="/sign-in" element={<SignIn />} />
    //         <Route path="/profile" element={<Profile />} />
    //         <Route path="/matches" element={<MatchGrid />} />
    //         <Route path="/map" element={<TravellerMap />} />
    //       </Routes>
    //       <Footer />
    //     </main>
    //   </BrowserRouter>
    // </div>
    <div className="App">
      {/* <BrowserRouter> */}
      <main>
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      {isLoggedIn
        ? <ProfileView handleCreateProfile={handleCreateProfile}/>
        : <LoggedOutView handleLogin={handleLogin} />
      }
      </main>
      {/* <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/matches" elememt={<MatchGrid />}/>
        </Routes>
      </main>
      </BrowserRouter> */}
    </div>
  );
}
