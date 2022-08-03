import * as React from "react";
import "./ProfileDisplay.css";
import { useState, useEffect , useRef} from "react";
import MatchGrid from "../../MatchGrid/MatchGrid";
import MapContainer from "../../Mapping/MapContainer";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
import { ChakraProvider, theme } from "@chakra-ui/react";
export default function ProfileDisplay({profiles, userProfile}) {
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
  const [matchesPlusCoordinates, setMatchesPlusCoordinates] = useState([]);
  const [matches, setMatches] = useState([]);
  const [rankedMatches, setRankedMatches] = useState([])
  const [matchesLoadingComplete, setMatchesLoadingComplete] = useState(false)
  const [matchesSortingComplete, setMatchesSortingComplete] = useState(false)
  const [coordsLoaded, setCoordsLoaded] = useState(false)
  const [userCoordinates, setUserCoordinates] = useState([]);
  const [allLoadingComplete, setAllLoadingComplete] = useState(false)
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

  // Display the logged in users profile information, then a list of their matches, 
  // and then a map of their matches locations
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
      <MatchGrid matches={rankedMatches} userProfile={userProfile} />
      <ChakraProvider theme={theme}>
      <MapContainer coordinates={matchesPlusCoordinates} currLocation ={userCoordinates}/>
      </ChakraProvider>
    </div>
  );
}
