import * as React from "react";
import { useState, useEffect } from "react";
import MatchGrid from "../../MatchGrid/MatchGrid";
import MapContainer from "../../Mapping/MapContainer";
import Geocode from "react-geocode";
import "../ProfileDisplay/ProfileDisplay.css"
import Navbar from "../../Home/NavBar/NavBar"
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
import { makeStyles } from '@material-ui/core/styles';
import { themeData } from './ThemeData'
import { ChakraProvider, theme } from "@chakra-ui/react";
export default function ProfileDisplay({profiles, userProfile, handleLogout}) {
  console.log("profile; ", userProfile )
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

      if(profiles !== null && Object.keys(profiles).length > 0){
      Object.values(profiles).forEach(profile => {
        if (
          profile.country === userProfile.country 
          &&
          profile.travelMonth === userProfile.travelMonth &&
          profile.accomodation === userProfile.accomodation
        ) {
          profilesToAdd.add(profile)
        }
      }
        )
      setMatches([...matches, ...profilesToAdd])
    }
    };
  
      // Calculate the intersections between interests and attractions
    function findIntersections(match){
      if((match.interests !== null && userProfile.interests !== null) && (match.interests !== null && userProfile.interests !== null)){
        const interstIntersection = userProfile.interests.filter(x => match.interests.includes(x));
        const attractionIntersection = userProfile.touristAttractions.filter(y =>  match.touristAttractions.includes(y));
        return {"interestIntersection": interstIntersection, "attractionIntersection": attractionIntersection, "match": match};
      }
      return {"interestIntersection": {}, "attractionIntersection": {}, "match": match};
    }
    
    // Rank the matches based off number of intersections in descending order 
    const rankMatches = (matches) =>{
      if(matches !== null && matches.length > 0){
      // Create a state to keep track of the intersection data and iterate through each match to get that data
      const matchesToRank = []
      console.log(matches)
      matches.forEach((match) => matchesToRank.push(findIntersections(match)))
      matchesToRank.sort((a, b) => b.attractionIntersection.length - a.attractionIntersection.length)
      setRankedMatches(matchesToRank)
      }
    }

    // Get latitude & longitude position based off the address of each match
    const getCoordinates = async(rankedMatches) => {
      if (rankedMatches !== null && rankedMatches.length > 0) {
        rankedMatches.forEach(async rankedMatch =>{
         if(rankedMatch.match.address !== null || rankedMatch.match.address !=="" ){
          try{
            const response = await Geocode.fromAddress(rankedMatch.match.address);
            const res = response.results[0].geometry;
              const { lat, lng } = res.location;
              setMatchesPlusCoordinates(matchesPlusCoordinates => [...matchesPlusCoordinates, {position: {lat, lng}, user: rankedMatch.match}])
              
          }
          catch(error){
            console.error(error);
          }
        }
        }
        )
        setCoordsLoaded(true);
      }
    };

    // Get the latitude and longitude position of the logged in user to use as the center position in the map
    function getCurrLocation(userProfile){
      Geocode.fromAddress(userProfile.address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setUserCoordinates({"name": userProfile.address, "position": {lat, lng}})
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
       <Navbar isLoggedIn={true} handleLogout={handleLogout}/> 
       {userProfile !== {} && userProfile !== null}
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
                        {userProfile.touristAttractions.map((interest, idx)=>
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
