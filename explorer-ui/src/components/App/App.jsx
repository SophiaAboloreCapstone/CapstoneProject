import * as React from "react";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import ProfileView from "../ProfileView/ProfileView";
import Home from "../Home/Home";
import MatchGrid from "../MatchGrid/MatchGrid";
import ProfileDisplay from "../ProfileView/ProfileDisplay/ProfileDisplay";
import RegisterForm from "../LoginForm/RegisterForm/RegisterForm";
import NotFound from "../NotFound/NotFound";
import Preferences from "../ProfileView/Preferences/Preferences";
import * as config from "../../config";
import { useState } from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import PrivateRoutes from "../PrivateRoutes"
import axios from "axios";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("current_user_id") != null
  );
  const [profileCreated, setProfileCreated] = useState(false);
  const [profileEdited, setProfileEdited] = useState(false);
  const [profileList, setProfileList] = useState([]);
  const [currUser, setCurrUser] = useState({})
  const [userProfile, setProfile] = React.useState({});
  const [id, setId] = React.useState();
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

  // useEffect(() => {
  //   fetchCurrUser();
  // }, [profileCreated]);
  // const fetchCurrUser = (async () => {
  //   try {
  //     const res = await axios.get(`${config.API_BASE_URL}/currUser`);
  //     // setCurrUser(res.data.currUser);
  //     // console.log("currUser :", currUser);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // })
  addAuthenticationHeader();

  const handleLogout = () => {
    localStorage.removeItem("current_user_id");
    axios.defaults.headers.common = {};
    setIsLoggedIn(false);
  };

  const handleLogin = (user) => {
    localStorage.setItem("current_user_id", user["objectId"]);
    addAuthenticationHeader();
    setId(user.objectId);
    console.log("user id: ", user.objectId)
    setIsLoggedIn(true);
  };

  const handleCreateProfile = (profileInfo) => {
    let ids = localStorage.getItem("current_user_id");
    console.log("ids: ", ids)
    localStorage.setItem("current_user_id", profileInfo.user["objectId"]);
    addAuthenticationHeader();
    setProfile(profileInfo)
    // setIsLoggedIn(true);
    setProfileCreated(true);
  };

  React.useEffect(() => {
    const fetchProfiles = (async () => {
      try {
        const res = await axios.get(`${config.API_BASE_URL}/matches`);
        setProfileList(res.data.profiles);
        console.log("profile List :", res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  const findProfile = () => {
    // setId(localStorage.getItem("current_user_id"));
    setCurrUser(profileList.find(profile => profile.user.objectId == id))
    // setCurrUser(found);
    // console.log("found: ", found)
    console.log("profiles: ", profileList)
    console.log("curr user: ", currUser)
  }
  // const setUserProfile = (userProfile) =>{
  //   let user = localStorage.getItem(userId)
  //   console.log("current user is: ", user)
  //   // setCurrUser(userProfile);
  // }

  
  
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
      <Router>
        {/* <main> */}
          {/* <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      {isLoggedIn
        ? <ProfileView handleCreateProfile={handleCreateProfile} profileCreated={profileCreated} profileEdited={profileEdited}/>
        : <LoggedOutView handleLogin={handleLogin} />
      } */}
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path="/preferences" element={<Preferences  isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
              <Route
                path="/profileView"
                element={
                  <ProfileView
                    handleCreateProfile={handleCreateProfile}
                    profileCreated={profileCreated}
                    profileEdited={profileEdited}
                    isLoggedIn={isLoggedIn} handleLogout={handleLogout}
                    
                  />
                }/>
                
              <Route
                path="/profileDisplay"
                element={<ProfileDisplay profiles={profileList} userProfile={currUser}/>}
              />
            </Route>
            
            <Route path="/" element={<Home isLoggedIn={isLoggedIn}  handleLogout={handleLogout}/>} />
            <Route 
              path="/login"
              element={<LoggedOutView profileCreated={profileCreated} findProfile={findProfile} handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>}
            />
            <Route
              path="/register"
              element={<RegisterForm handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
            />
            
            <Route path="/notFound" element={<NotFound />} />
          </Routes>
        {/* </main> */}
      </Router>
    </div>
  );
}
