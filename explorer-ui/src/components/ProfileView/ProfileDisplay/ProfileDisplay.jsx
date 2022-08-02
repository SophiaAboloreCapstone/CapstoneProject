import * as React from "react";
import "./ProfileDisplay.css";
import { Link } from "react-router-dom";
import { useState, useEffect , useRef} from "react";
import NotFound from "../../NotFound/NotFound";
import axios from "axios";
import MatchGrid from "../../MatchGrid/MatchGrid";
import MapContainer from "../../Mapping/MapContainer";
import countries from "../../../data/countries.json";
import months from "../../../data/months.json"
import * as config from "../../../config";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
import { ChakraProvider, theme } from "@chakra-ui/react";
export default function ProfileDisplay({userProfile}) {
  const [picture, setPicture] = React.useState("");
  // const picture = React.createRef();
  const username = React.createRef();
  const bio = React.createRef();
  const age = React.createRef();
  const country = React.createRef();
  const travelMonth = React.createRef();
  const accomodations = React.createRef();
  const address = React.createRef();
  const location = React.createRef();
  // const [userProfile, setProfile] = React.useState({});
  const [profileInfo, setProfileInfo] = React.useState()
  
  const [profiles, setProfiles] = React.useState([]);

  let countryList = countries.list;
  let monthList = months.list;
  const [matchesPlusCoordinates, setMatchesPlusCoordinates] = useState([]);
  const [userCoordinates, setUserCoordinates] = useState({"string":"", "position":{}});
  const region = useRef();
  useEffect(() => {
      getCoordinates(profiles);
      // getUserCoords(profiles[0])
  }, [])
  const getCoordinates = (profiles) => {
      if (profiles) {
        for (let i = 0; i < profiles.length; i++) {
          if(( profiles[i].address != null || profiles[i].address!="")){ //&& profiles[i].preferenceInfo.visibility =="yes"){
          Geocode.fromAddress(profiles[i].address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setMatchesPlusCoordinates(matchesPlusCoordinates => [...matchesPlusCoordinates, {id: i, position: {lat, lng}, user: profiles[i]}])
            },
            (error) => {
              console.error(error);
            }
          );
          }
        }
        // Get latitude & longitude from address.
      }
    };
    function getCurrLocation(event){
      event.preventDefault();
      Geocode.fromAddress(region.current.value).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setUserCoordinates({"string": region.current.value, "position": {lat, lng}})
        },
        (error) => {
          console.error(error);
        }
      );
    }
    React.useEffect(() => {
      const fetchProfiles = (async () => {
        try {
          const res = await axios.get(`${config.API_BASE_URL}/matches`);
          setProfiles(res.data.profiles);
  
        } catch (err) {
          console.log(err);
        }
      })();
    }, []);
  // useEffect(() => {
  //   const fetchProfiles = (async () => {
  //     try {
  //       const res = await axios.get(`${config.API_BASE_URL}/matches`);
  //       setProfiles(res.data.profiles);
  //       console.log("profiles :", profiles);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  // useEffect(() => {
  //   setProfile(profileInfo);
  // }, [userProfile]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setProfile({});
    const profile = async () => {
      try {
        const res = await axios.post(
          `${config.API_BASE_URL}/profileInfo`,
          {
            picture: picture,
            age: age.current.value,
            location: location.current.value,
            username: username.current.value,
            bio: bio.current.value,
            address: address.current.value,
            country: country.current.value,
            travelMonth: travelMonth.current.value,
            accomodations: accomodations.current.value,
          },
          { maxContentLength: Infinity, maxBodyLength: Infinity }
        );
        handleCreateProfile(res.data.profile.user);
        setProfile(res.data.profile);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    profile();
    // <ProfileDisplay name={username} picture={picture} age={} bio, country, month, accomodation, location
  };


  let base64code = "";
  const onChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };
  const onLoad = (fileString) => {
    base64code = fileString;
    setPicture(base64code);
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  return (
    <div className="profile-name">
      {
        userProfile !={}
        ?  <div>
        <h2>Bio: {userProfile.bio}</h2>
        <h2>Country: {userProfile.country}</h2>
        <h2>Month: {userProfile.travelMonth}</h2>
        </div>
        :<h1>Loading</h1>
      }
      {/* {userProfile != null ? (
        <div className="profileDisplay">
          <h2>Bio: {userProfile.bio}</h2>
          <h2>Country: {userProfile.country}</h2>
          <h2>Month: {userProfile.travelMonth}</h2>
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="title">Login</div>
            <img src="userProfile.picture"></img>
            <label>
              <span>Profile Picture</span>
              <input
                type="file"
                id="profile-picture"
                name="picture"
                accept="image/*"
                value={base64code}
                onChange={onChange}
              ></input>
            </label>
            <label>
              <span>Bio</span>
              <input defaultValue={userProfile.bio} ref={bio}></input>
            </label>
            <label>
              <span>Destination</span>
              <select ref={country} id="country" name="country">
                {countryList.map((country, idx) => (
                  <option value={country.name} key={idx}>{country.name}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Month</span>
              <select ref={travelMonth} id="month">
                {monthList.map((month, idx) => (
                  <option value={month}>{month}</option>
                )
                )}
              </select>
            </label>
            <label>
              <span>Accomodations</span>
              <input
                defaultValue={userProfile.accomodations}
                ref={accomodations}
              ></input>
            </label>
            <button type="submit">Edit Profile</button>
            <div className="match-grid">
              <h1>Here are your matches!</h1>
              <MatchGrid profiles={profiles} userProfile={userProfile} />
              <ChakraProvider theme={theme}>
            <MapContainer coordinates={matchesPlusCoordinates} currLocation ={userCoordinates}/>
          </ChakraProvider>
            </div>
          </form>
        </div>
      ) : (
        <NotFound />
      )} */}
      <MatchGrid profiles={profiles} userProfile={userProfile} />
      <ChakraProvider theme={theme}>
      <MapContainer coordinates={matchesPlusCoordinates} currLocation ={userCoordinates}/>
      </ChakraProvider>
    </div>
  );
}
