import * as React from "react";
import "./App.css";
import LoggedOutView from "../LoggedOutView/LoggedOutView";
import ProfileView from "../ProfileView/ProfileView";
import Home from "../Home/Home";
import ProfileDisplay from "../ProfileView/ProfileDisplay/ProfileDisplay";
import RegisterForm from "../LoginForm/RegisterForm/RegisterForm";
import NotFound from "../NotFound/NotFound";
import Preferences from "../ProfileView/Preferences/Preferences";
import * as config from "../../config";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoutes from "../PrivateRoutes"
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback } from "react";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("current_user_id") !== null
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

  addAuthenticationHeader();
  // const makeAPICall = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/cors', { mode: 'cors' });
  //     const data = await response.json();
  //     console.log({ data })
  //   }
  //   catch (e) {
  //     console.log(e)
  //   }
  // }
  // useEffect(() => {
  //   makeAPICall();
  // }, [])

  const handleLogout = () => {
    localStorage.removeItem("current_user_id");
    axios.defaults.headers.common = {};
    setIsLoggedIn(false);
  };

  const handleLogin = (user) => {
    localStorage.setItem("current_user_id", user["objectId"]);
    addAuthenticationHeader();
    console.log(user.objectId)
    setId(user.objectId);
    setIsLoggedIn(true);
  };

  const handleCreateProfile = (profileInfo) => {
    let ids = localStorage.getItem("current_user_id");
    localStorage.setItem("current_user_id", profileInfo.user["objectId"]);
    addAuthenticationHeader();
    setProfile(profileInfo)
    setProfileCreated(true);
  };

  React.useEffect(() => {
    const fetchProfiles = (async () => {
      try {
        const res = await axios.get(`${config.API_BASE_URL}/matches`);
        setProfileList(res.data.profiles);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);


  const findProfile = useCallback(() => {
    console.log("Profile list: ", profileList)
    console.log("id: ", id)
    setCurrUser(profileList.find(profile => profile.user.objectId == id))
    console.log(currUser)
  }, [id, profileList]);

  const setUserProfile = (profileInfo) => {
    setCurrUser(profileInfo)
    console.log("profile info: ", profileInfo)
  }


  return (
    <div className="App">
      <Router>
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
                    setUserProfile={setUserProfile}
                  />
                }/>
                
              <Route
                path="/profileDisplay"
                element={<ProfileDisplay profiles={profileList} userProfile={currUser} handleLogout={handleLogout}/>}
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
      </Router>
    </div>
  );
}
