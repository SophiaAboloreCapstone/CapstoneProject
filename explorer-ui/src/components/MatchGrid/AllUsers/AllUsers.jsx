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
  SkeletonText,
  Text,
} from '@chakra-ui/react'
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
import MatchCard from "../MatchCard/MatchCard"
import MapContainer from "../../Mapping/MapContainer";
import { useState } from "react";
import { useEffect } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
export default function AllUsers({profiles}) {
    const [matchesPlusCoordinates, setMatchesPlusCoordinates] = useState([]);
    const [userCoordinates, setUserCoordinates] = useState([]);
    useEffect(() => {
        getCoordinates(profiles);
        // getUserCoords(profiles[0])
    }, [profiles])
    const getCoordinates = (profiles) => {
        if (profiles) {
          for (let i = 0; i < profiles.length; i++) {
            if(profiles[i].address != null || profiles[i].address!="" ){
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
      const getUserCoords = (user) => 
      {Geocode.fromAddress(user.address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setUserCoordinates( {id: 0, position: {lat, lng}, user: user})
        },
        (error) => {
          console.error(error);
        }
      );
    }
    return (
        <div className="match-grid">
            <h1>Here is the map of all users</h1>
            <div className="display-map">
          <React.StrictMode>
            <ChakraProvider theme={theme}>
              <MapContainer coordinates={matchesPlusCoordinates}/>
            </ChakraProvider>
          </React.StrictMode>
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
