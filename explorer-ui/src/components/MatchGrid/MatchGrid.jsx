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
export default function MatchGrid({ matches , userProfile}) {
  const [loadingComplete, setLoadingComplete] = useState(false)
useEffect(() => {
    setLoadingComplete(true)
}, [matches])
  return (
    <div className="match-grid">
      {loadingComplete
      ? 
      <div>
      <h1>Here are your matches!</h1>
      {matches != [] ? (
        matches.map((sortedMatch, idx) => {
          return (
            <MatchCard
              name={sortedMatch.match.name}
              bio={sortedMatch.match.bio}
              picture={sortedMatch.match.picture}
              country={sortedMatch.match.country}
              accomodation={sortedMatch.match.accomodations}
              key={idx}
            />
          );
        })
      ) : (
          <h1> Sorry we couldn't find any matches for you!</h1>
      )}
      </div>
      : <h1> Sorry we couldn't load your matches</h1>
}
    </div>
  );
}
