import * as React from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import ProfileView from "../ProfileView/ProfileView";
import Home from "../Home/Home"
import MatchGrid from "../MatchGrid/MatchGrid"
import RegisterForm from "../LoginForm/RegisterForm/RegisterForm";
import NotFound from "../NotFound/NotFound";
import Preferences from "../ProfileView/Preferences/Preferences";
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("current_user_id") != null
  );
  const [profileCreated, setProfileCreated] = useState(false);
  const [profileEdited, setProfileEdited] = useState(false);
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
    localStorage.setItem("current_user_id", user["objectId"]);
    addAuthenticationHeader();

    setIsLoggedIn(true);
  };

  const handleCreateProfile = (profileInfo) => {
    localStorage.setItem("current_user_id", profileInfo["objectId"]);
    addAuthenticationHeader();

    // setIsLoggedIn(true);
    setProfileCreated(true)

  };

  //  // HANDLE SUBMIT FOR UPDATE
  // handleTripSubmit = (e) => {
  //    e.prevent.Default();
  //    let tripNotes = {
  //      title: e.target.title.value,
  //      description: e.target.description.value,
  //      likes: e.target.likes.value,
  //      dislikes: e.target.dislikes.value,
       
  //    }
  //    this.postNotes(tripNotes);
  // }

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
      <BrowserRouter>
      <main>
      {/* <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      {isLoggedIn
        ? <ProfileView handleCreateProfile={handleCreateProfile} profileCreated={profileCreated} profileEdited={profileEdited}/>
        : <LoggedOutView handleLogin={handleLogin} />
      } */}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="login" element={<LoggedOutView handleLogin={handleLogin}/>}/>
        <Route path="/matches" elememt={<MatchGrid />}/>
        <Route path="/register" element={<RegisterForm handleLogin={handleLogin}/>} />
        <Route path="/preferences" element={<Preferences/>} />
        {isLoggedIn
         ? <Route path="/profileView" element={<ProfileView handleCreateProfile={handleCreateProfile} profileCreated={profileCreated} profileEdited={profileEdited}/>}/>
         : <Route path="/profileView" element={<NotFound />}/>
        }
        </Routes>
      </main>
      </BrowserRouter> 
    </div>
  );
}