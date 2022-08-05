import * as React from "react"
import "../MatchGrid.css"
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
import MapContainer from "../../Mapping/MapContainer";
import { useState, useEffect, useRef } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
export default function AllUsers({profiles}) {
    const [matchesPlusCoordinates, setMatchesPlusCoordinates] = useState([]);
    const [userCoordinates, setUserCoordinates] = useState({"string":"", "position":{}});
    const region = useRef();
    useEffect(() => {
        getCoordinates(profiles);
        // getUserCoords(profiles[0])
    }, [profiles])
    const getCoordinates = async(profiles) => {
        if (profiles != null && profiles.length > 0) {
          Object.values(profiles).forEach(async profile => {
          if(( profile.address != null || profile.address!="")){
            try{
              const response = await Geocode.fromAddress(profile.address)
              const res = response.results[0].geometry;
                const { lat, lng } = res.location;
                setMatchesPlusCoordinates(matchesPlusCoordinates => [...matchesPlusCoordinates, {position: {lat, lng}, user: profile}])
            }
            catch(error){
              console.error(error);
            }
            }
          })
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
 
    return (
        <div className="match-grid">
          <h3>Where are you currently located</h3>
            <span>Region</span>
            <input className="country" ref={region}></input>
            <button type="click" onClick={(event) => getCurrLocation(event)}>Save Region</button>
            <h1>Here is the map of all users</h1>
            <div className="display-map">
            {userCoordinates.position != {"string":"", "position":{}}
            ?<ChakraProvider theme={theme}>
            <MapContainer coordinates={matchesPlusCoordinates} currLocation ={userCoordinates}/>
          </ChakraProvider>
          :<></>
          }
          </div> 
          
        </div>
    )
}
