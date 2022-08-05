import * as React from "react"
import "../MatchGrid.css"
import Geocode from "react-geocode";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
import MatchCard from "../MatchCard/MatchCard"
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
    const getCoordinates = (profiles) => {
        if (profiles) {
          // for (let i = 0; i < profiles.length; i++) {
          //   if(( profiles[i].address != null || profiles[i].address!="")){ //&& profiles[i].preferenceInfo.visibility =="yes"){
          //   Geocode.fromAddress(profiles[i].address).then(
          //     (response) => {
          //       const { lat, lng } = response.results[0].geometry.location;
          //       setMatchesPlusCoordinates(matchesPlusCoordinates => [...matchesPlusCoordinates, {id: i, position: {lat, lng}, user: profiles[i]}])
          //     },
          //     (error) => {
          //       console.error(error);
          //     }
          //   );
          //   }
          // }
          Object.values(profiles).forEach(profile => {
          if(( profile.address != null || profile.address!="")){ //&& profiles[i].preferenceInfo.visibility =="yes"){
            Geocode.fromAddress(profile.address).then(
              (response) => {
                const res = response.results[0].geometry;
                const { lat, lng } = res.location;
                setMatchesPlusCoordinates(matchesPlusCoordinates => [...matchesPlusCoordinates, {position: {lat, lng}, user: profile}])
              },
              (error) => {
                console.error(error);
              }
            );
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

            {/* <h1>Here are all the users on the app!</h1>
            {profiles != null && profiles.map((profile, idx) => {
                return (
                    <MatchCard name="Sophia" bio={profile.bio} picture={profile.picture} country={profile.country} accomodation={profile.accomodation} key={idx} />
                )
            })
        } */}
          
        </div>
    )
}
