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
export default function MatchGrid({ matches , userProfile}) {
  // const [matchesPlusCoordinates, setMatchesPlusCoordinates] = useState([]);
  // const [matches, setMatches] = useState([]);
  // const [rankedMatches, setRankedMatches] = useState([])
  // const [sorted, setSorted] = useState([])
  // const [matchesLoadingComplete, setMatchesLoadingComplete] = useState(false)
  // const [userCoordinates, setUserCoordinates] = useState([]);
  const [loadingComplete, setLoadingComplete] = useState(false)
useEffect(() => {
    setLoadingComplete(true)
}, [matches])
// useEffect(() => {
//   getMatches(profiles); 
//   rankMatches(matches)
//   getCoordinates(profiles);
//   getUserCoords(userProfile)
// }, [profiles, matchesLoadingComplete])
//   // TODO: Create a function that filters through the list of users to get the matches of this specific user
//   const getMatches = () => {
//     console.log("getting matches")
//     const profilesToAdd = [];
//     for (let i = 0; i <Object.keys(profiles).length; i++) {
//       console.log("user country: ", userProfile.country),
//         console.log("profile country: ", profiles[i].country)
//       if (
//         profiles[i].country === userProfile.country 
//         &&
//         profiles[i].travelMonth == userProfile.travelMonth &&
//         profiles[i].accomodation == userProfile.accomodation
//       ) {
//         console.log("it's a match!")
//         console.log("profiles[i]: ", profiles[i])
//         profilesToAdd.push(profiles[i])
//       }
//     }
//     setMatches([...matches, ...profilesToAdd])
//     setMatchesLoadingComplete(true)
//     console.log("profilesToAdd: ", profilesToAdd)
    
//   };

//     // Calculate the intersections between interests and attractions
//   function findIntersections(match){
//     console.log("find intersections")
//     console.log("match.preferenceInfo.interest: ", match.preferenceInfo.interests)
//     console.log("userProfile.preferenceInfo.interest: ", userProfile.preferenceInfo.interests)
//     let interstIntersection = userProfile.preferenceInfo.interests.filter(x => match.preferenceInfo.interests.includes(x));
//     console.log("intersection: ", interstIntersection)
//     let attractionIntersection = userProfile.preferenceInfo.attractions.filter(y =>  match.preferenceInfo.attractions.includes(y));
//     return {"interestIntersection": interstIntersection, "attractionIntersection": attractionIntersection, "match": match};
//   }
  
//   const rankMatches = (matches) =>{
//     console.log("rank matches")
//     console.log("matches are: ", matches)
//     if(matches){
//     // Create a state to keep track of the intersection data and iterate through each match to get that data
//     // matches.forEach(setRankedMatches(rankedMatches => [...rankedMatches, findIntersections]))
//     matches.forEach((match) => setRankedMatches(rankedMatches => [...rankedMatches, findIntersections(match)]))
//     console.log("ranked matches: ", rankedMatches)
//     // Sort the matches in descending order based off the length of the 
//     // attraction and interest intersection arrays
//     setSorted(rankedMatches.sort((a, b) => b.attractionIntersection.length - a.attractionIntersection.length))
//     console.log("sorted array: ", sorted)
//     }
//   }

 
//   const getCoordinates = (matches) => {
//       if (matches) {
//         for (let i = 0; i < matches.length; i++) {
//           if(matches[i].address != null || matches[i].address !="" ){
          
//           Geocode.fromAddress(matches[i].address).then(
//             (response) => {
//               const { lat, lng } = response.results[0].geometry.location;
//               setMatchesPlusCoordinates([...matchesPlusCoordinates, {id: i, position: {lat, lng}, user: matches[i]}])
              
//             },
//             (error) => {
//               console.error(error);
//             }
//           );
//         }
//         }
//         // Get latitude & longitude from address.
//       }
//     };
//     const getUserCoords = (user) => 
//     {Geocode.fromAddress(user.address).then(
//       (response) => {
//         const { lat, lng } = response.results[0].geometry.location;
//         setUserCoordinates( {id: 0, position: {lat, lng}, user: user})
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "", // Add your API key
//   });


  // return (
  //   <div className="match-grid">
  //     <h1>Here are your matches!</h1>
  //     {matches != [] ? (
  //       matches.map((sortedMatch, idx) => {
  //         return (
  //           <MatchCard
  //             name={sortedMatch.match.name}
  //             bio={sortedMatch.match.bio}
  //             picture={sortedMatch.match.picture}
  //             country={sortedMatch.match.country}
  //             accomodation={sortedMatch.match.accomodation}
  //             key={idx}
  //           />
  //         );
  //       })
  //     ) : (
  //         <h1> Sorry we couldn't find any matches for you!</h1>
  //     )}
  //   </div>
  // );


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
