import * as React from "react";
import "./MatchGrid.css";
import MatchCard from "../MatchGrid/MatchCard/MatchCard";
import MapContainer from "../Mapping/MapContainer";
import { useEffect, useState } from "react";
import Geocode from "react-geocode";

import { useLoadScript } from "@react-google-maps/api";
import ReactDOM from "react-dom/client";
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
// Enable or disable logs. Its optional.
Geocode.enableDebug();
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
// const render = (status) => {
//   return <h1>{status}</h1>;
// };
export default function MatchGrid({ profiles, userProfile }) {
  console.log("profiles from grid: ", profiles);
  console.log("user profile from grid: ", userProfile);
  const [matchesPlusCoordinates, setMatchesPlusCoordinates] = useState([]);
  const [matches, setMatches] = useState([]);
  const userProfiles = userProfile


  useEffect(() => {
    getMatches(profiles);
}, [])
  // TODO: Create a function that filters through the list of users to get the matches of this specific user
  const getMatches = () => {
    console.log("these are the available profiles to be matched: ", profiles);
    for (let i = 0; i < profiles.length; i++) {
      if (
        profiles[i].country == userProfile.country 
        // &&
        // profiles[i].travelMonth == userProfile.travelMonth &&
        // profiles[i].accomodation == userProfile.accomodation
      ) {
        setMatches([...matches, profiles[i]])
      }
    }
  };


  console.log("here are your matches: ", matches);
  // getMatches(userProfile, profiles)
  //   };
  //   // TODO: Create a list of the matches locations
  //   // Call the geocoder address function on each location , and append it to a new list
  //   // send this list as a prop to the Mapping component


  useEffect(() => {
      getCoordinates(profiles);
  }, [])
  const getCoordinates = (matches) => {
      if (matches) {
        for (let i = 0; i < matches.length; i++) {
          if(matches[i].location != null || matches[i].location!="" ){

          Geocode.fromAddress(matches[i].location).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setMatchesPlusCoordinates([...matchesPlusCoordinates, {id: i, position: {lat, lng}, user: matches[i]}])
              
            },
            (error) => {
              console.log("this address is invalid: ", matches[i].location)
              console.error(error);
            }
          );
        }
        }
        // Get latitude & longitude from address.
      }
    };
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "", // Add your API key
//   });

getCoordinates (matches);
  console.log("here are your matches coordinates: ", matchesPlusCoordinates);
  const userCoordinates = getCoordinates(userProfile.location, 0);
  console.log("user Address: ", userProfile.location)
  return (
    <div className="match-grid">
      <h1>Here are your matches!</h1>
      {matches != null ? (
        matches.map((match, idx) => {
          return (
            <MatchCard
              name="Sophia"
              bio={match.bio}
              picture={match.picture}
              country={match.country}
              accomodation={match.accomodation}
              key={idx}
            />
          );
        })
      ) : (
        <div className="no-matches">
          <h1> Sorry we couldn't find any matches for you!</h1>
        </div>
      )}
      <div className="match-map">
 
        <h1>React with Google Maps</h1>
        <div className="map">
          <h1> Here's the map of your natches</h1>
       
            </div>
  
      </div>
    </div>
  );
}
