import * as React from "react";
import Style from "./ProfileDisplay.css";

import { useState, useEffect , useContext, useRef} from "react";
import MatchGrid from "../../MatchGrid/MatchGrid";
import MapContainer from "../../Mapping/MapContainer";
import Geocode from "react-geocode";
import Navbar from "../../Home/NavBar/NavBar"
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
import { Button } from '@material-ui/core';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { makeStyles } from '@material-ui/core/styles';
// import { ThemeContext } from "./ThemeContext"
import { themeData } from './ThemeData'
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaBlogger,
} from 'react-icons/fa';

import { ChakraProvider, theme } from "@chakra-ui/react";
export default function ProfileDisplay({profiles, userProfile}) {
  const [matchesPlusCoordinates, setMatchesPlusCoordinates] = useState([]);
  const [matches, setMatches] = useState([]);
  const [rankedMatches, setRankedMatches] = useState([])
  const [matchesLoadingComplete, setMatchesLoadingComplete] = useState(false)
  const [matchesSortingComplete, setMatchesSortingComplete] = useState(false)
  const [coordsLoaded, setCoordsLoaded] = useState(false)
  const [userCoordinates, setUserCoordinates] = useState([]);
  const [theme, setTheme] = useState(themeData.theme)
  useEffect(() => {
    getMatches(profiles); 
    setMatchesLoadingComplete(true)
    getCurrLocation(userProfile)
  }, [profiles, userProfile, matchesLoadingComplete, matchesSortingComplete, coordsLoaded,])

  useEffect(() =>{
    rankMatches(matches)
    setMatchesSortingComplete(true)
    getCoordinates(rankedMatches)
  }, [matches])

  // Get the list of matches
    const getMatches = () => {
      const profilesToAdd = new Set();
      for (let i = 0; i <Object.keys(profiles).length; i++) {
        if (
          profiles[i].country === userProfile.country 
          &&
          profiles[i].travelMonth == userProfile.travelMonth &&
          profiles[i].accomodation == userProfile.accomodation
        ) {
          profilesToAdd.add(profiles[i])
        }
      }
      setMatches([...matches, ...profilesToAdd])
      
    };
  
      // Calculate the intersections between interests and attractions
    function findIntersections(match){
      if(match.preferenceInfo.interests && userProfile.preferenceInfo.interests){
        let interstIntersection = userProfile.preferenceInfo.interests.filter(x => match.preferenceInfo.interests.includes(x));
        let attractionIntersection = userProfile.preferenceInfo.attractions.filter(y =>  match.preferenceInfo.attractions.includes(y));
        return {"interestIntersection": interstIntersection, "attractionIntersection": attractionIntersection, "match": match};
      }
      return {"interestIntersection": {}, "attractionIntersection": {}, "match": match};
    }
    
    // Rank the matches based off number of intersections in descending order 
    const rankMatches = (matches) =>{
      if(matches){
      // Create a state to keep track of the intersection data and iterate through each match to get that data
      const matchesToRank = []
      matches.forEach((match) => matchesToRank.push(findIntersections(match)))
      matchesToRank.sort((a, b) => b.attractionIntersection.length - a.attractionIntersection.length)
      setRankedMatches(matchesToRank)
      }
    }

    // Get latitude & longitude position based off the address of each match
    const getCoordinates = (rankedMatches) => {
      if (rankedMatches) {
        for (let i = 0; i < rankedMatches.length; i++) {
          if(rankedMatches[i].match.address != null || rankedMatches[i].match.address !="" ){
          
          Geocode.fromAddress(rankedMatches[i].match.address).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              setMatchesPlusCoordinates(matchesPlusCoordinates => [...matchesPlusCoordinates, {id: i, position: {lat, lng}, user: matches[i]}])
              
            },
            (error) => {
              console.error(error);
            }
          );
        }
        }
        setCoordsLoaded(true);
      }
    };

    // Get the latitude and longitude position of the logged in user to use as the center position in the map
    function getCurrLocation(userProfile){
      Geocode.fromAddress(userProfile.address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setUserCoordinates({"string": userProfile.address, "position": {lat, lng}})
        },
        (error) => {
          console.error(error);
        }
      );
     
    }
   
    // Landing page

    const useStyles = makeStyles((t) => ({
        resumeBtn: {
            color: theme.primary,
            borderRadius: '30px',
            textTransform: 'inherit',
            textDecoration: 'none',
            width: '150px',
            fontSize: '1rem',
            fontWeight: '500',
            height: '50px',
            fontFamily: 'var(--primaryFont)',
            border: `3px solid ${theme.primary}`,
            transition: '100ms ease-out',
            '&:hover': {
                backgroundColor: theme.tertiary,
                color: theme.secondary,
                border: `3px solid ${theme.tertiary}`,
            },
            [t.breakpoints.down('sm')]: {
                width: '180px',
            },
        },
        contactBtn: {
            backgroundColor: theme.primary,
            color: theme.secondary,
            borderRadius: '30px',
            textTransform: 'inherit',
            textDecoration: 'none',
            width: '150px',
            height: '50px',
            fontSize: '1rem',
            fontWeight: '500',
            fontFamily: 'var(--primaryFont)',
            border: `3px solid ${theme.primary}`,
            transition: '100ms ease-out',
            '&:hover': {
                backgroundColor: theme.secondary,
                color: theme.tertiary,
                border: `3px solid ${theme.tertiary}`,
            },
            [t.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
    }));

    const classes = useStyles();


  // Display the logged in users profile information, then a list of their matches, 
  // and then a map of their matches locations
  return (
    <div className="dashboard">
       <Navbar isLoggedIn={true}/> 
       <div className='landing'>
            <div className='landing--container'>
                <div
                    className='landing--container-left'
                    style={{ backgroundColor: theme.primary }}
                >
                </div>
                <img
                    src={userProfile.picture}
                    alt=''
                    className='landing--img'
                    style={{
                        opacity: `${'1'}`,
                        borderColor: theme.secondary,
                    }}
                />
                <div
                    className='landing--container-right'
                    style={{ backgroundColor: theme.secondary }}
                >
                    <div
                        className='lcr--content'
                        style={{ color: theme.tertiary }}
                    >
                        <h6>Destination: {userProfile.country}</h6>
                        <h1>{userProfile.username}</h1>
                        <p>Bio: {userProfile.bio}</p>
                        <h6>I'd love to visit:</h6>
                        <ul className="interest-ul">
                        {userProfile.preferenceInfo.attractions.map((interest, idx)=>
                        <li className="interest-display" key={idx}>{interest}</li>
                        )}
                        </ul>

                        <div className='lcr-buttonContainer'>
                        </div>
                    </div>
                </div>
            </div>
        {/* </div> */}
</div>
      <MatchGrid matches={rankedMatches} userProfile={userProfile} />
      <ChakraProvider theme={theme} >
      <MapContainer  coordinates={matchesPlusCoordinates} currLocation ={userCoordinates}/>
      </ChakraProvider>
    </div>
  );
}
