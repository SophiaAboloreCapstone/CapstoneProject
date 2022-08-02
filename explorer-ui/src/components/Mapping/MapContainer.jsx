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
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import MatchCard from "../MatchGrid/MatchCard/MatchCard";
import MatchDisplay from "../MatchGrid/MatchCard/MatchDisplay";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
  Autocomplete,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();
import { useRef, useState, useEffect } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
// const { REACT_APP_GOOGLE_MAPS_API_KEY } = require("./config");
// import { REACT_APP_GOOGLE_MAPS_API_KEY} from require('config');
const libraries = ["places"];
function MapContainer({ coordinates, currLocation}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0",
    libraries,
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [showingInfoWindow, setshowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState();
  const [selectedPlace, setSelectedPlace] = useState();
  const [activeProfile, setActiveProfile] = useState(false);
  const [currProfile, setCurrProfile] = useState(null);
  const [attractionCoords, setAttractionCoords] = useState([])
  const origin = currLocation.position
  const originString= currLocation.string;
  const onMarkerClick = (user, marker) => {
    setActiveProfile(true);
    calculateRouteBetweenUsers(user.user.address);
    setSelectedPlace(user.user.address);
    setActiveMarker(marker);
    setshowingInfoWindow(true);
    setCurrProfile(user);
    generateAttractionCoordinates(user)
    console.log("curr profile is changing state: ", currProfile)

  };
  // const onMouseOver = (profile, marker) => {
  //   console.log("user address: ", profile.address)
  //   setSelectedPlace(profile.user.address);
  //   setActiveMarker(marker);
  //   setshowingInfoWindow(true);
  //   setCurrProfile(profile)
  //   // console.log("user is: ", user);
  //   // setActiveProfile(user);
  //   // calculateRouteBetweenUsers(user.address)
  // };
  const onClose = async (e) => {
    if (showingInfoWindow) {
      setshowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <></>
    // return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log("route is :", results)
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  async function calculateRouteBetweenUsers(profileLocation) {
  console.log("called")
    if (originString  === "" || String(profileLocation) === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: currLocation.string,
      destination: profileLocation,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    console.log("route is :", results)
    setDirectionsResponse(results);
    // setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);
  }

  const generateAttractionCoordinates = (currProfile) => {
    let attractions = currProfile.user.preferenceInfo.attractions;
    console.log("profile I'm pulling attractions from: ", currProfile)
    if (attractions) {
      for (let i = 0; i < attractions.length; i++) {
        if(( attractions[i] != null || attractions[i]!="")){ //&& profiles[i].preferenceInfo.visibility =="yes"){
        Geocode.fromAddress(attractions[i]).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            setAttractionCoords(attractionCoords => [...attractionCoords,  {lat, lng}])
          },
          (error) => {
            console.error(error);
          }
        );
        }
      }
      // Get latitude & longitude from address.
    }
    console.log("got attractions: ", attractionCoords)
  };

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <div className="map-container">
      {/* <ChakraProvider theme={theme}></ChakraProvider> */}
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"

    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={origin}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
           <Marker 
              position={currLocation.position} 
              icon="http://maps.google.com/mapfiles/ms/icons/pink-dot.png"
                />
          {coordinates != null &&
            coordinates.map((profile, idx) => {
              // TODO: Figure out a central location to pass in here
               // Maybe take in the users location when they register
              return (
                <div className="user-marker">
                  <Marker
                    position={profile.position}
                    // onClick={onMarkerClick(profile.user)}
                    name={profile.user.username}
                    key={idx}
                    // onMouseOver={() => onMouseOver(profile, idx)}
                    onClick={()=> onMarkerClick(profile, idx)}
                  />
                  {activeProfile != false
                    ?attractionCoords.map((coords, idx) => 
                    {
                      return(
                        <Marker
                    position={coords}
                    icon="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                />
                      )
                    })
                    :<></>
                  }
          </div>

            );
          })}
          <div className="info-window">
                  {currProfile != null
          ?<InfoWindow
                  position={currProfile.position}
                  marker={activeMarker}
                  visible={showingInfoWindow}
                  color={"black"}
                  onClose={onClose}
                  icon={currProfile.user.picture}>
                  
                  <div>
                    <img src={currProfile.user.picture} ></img>
                    <h2>{currProfile.user.username} is at {selectedPlace}!</h2>
                  </div>
                </InfoWindow>
          :<></>
          }
                </div>    
          
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
           {/* <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={onClose}
          >
            <div>
              <h4>{selectedPlace}</h4>
            </div>
          </InfoWindow> */}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete color={"black"}>
              <Input type="text" placeholder="Origin" color={"black"} ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete color={"black"}>
              <Input
                type="text"
                placeholder="Destination"
                color={"black"}
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme="pink" type="submit" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
            bg={"black"}
              aria-label="center back"
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text color={"black"}>Distance: {distance} </Text>
          <Text color={"black"}>Duration: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            bg={"black"}
            isRound
            onClick={() => {
              map.panTo(origin);
              map.setZoom(15);
            }}
          />
        </HStack>
      </Box>
    </Flex>
     {activeProfile != false
      ? <MatchDisplay name={currProfile.user.name} age={currProfile.user.age} bio={currProfile.user.bio} picture={currProfile.user.picture} country={currProfile.user.country} accomodation={currProfile.user.accomodations} preferences={currProfile.user.preferenceInfo.attractions}/>
      : <></>
      }
      
    </div>
  );
}

export default MapContainer;
// import React, {  useState , Component } from "react";
// import "./Mapping.css";
// import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
// import { useEffect } from "react";
// // import React, { useState } from 'react'
// const mapStyles = {
//   position: "absolute",
//   width: "50%",
//   height: "50%",
// };

// function MapContainer({otherUsers}) {
//   // constructor(props){
//   //   super(props)
//   //   this.state{

//   //   }
//   // }

// const [showingInfoWindow, setshowingInfoWindow] = useState(false);
// const [activeMarker, setActiveMarker] = useState({})
// const [selectedPlace, setSelectedPlace] = useState({})
// const profiles = otherUsers
// const cntr = {lat: 48.856614,
//   lng: 2.3522219}
// // useEffect(() =>{
// //   const onMarkerClick(props, marker) =>{
// //     setSelectedPlace(props)
// //     setActiveMarker(marker)
// //     setshowingInfoWindow(true)
// //     }
// // }, [])
// useEffect(() =>{
// const onMarkerClick = (props, marker) =>{
//   setSelectedPlace(props)
//   setActiveMarker(marker)
//   setshowingInfoWindow(true)
//   }
//   const onClose = (e) => {
//     if (showingInfoWindow) {
//         setshowingInfoWindow(false);
//         setActiveMarker(null)
//     }
//   }; onClose()
// }, [])
//     // setState({
//     //   selectedPlace: props,
//     //   activeMarker: marker,
//     //   showingInfoWindow: true,
//     // });
// //   useEffect(() =>{
// //   const onClose = async(e) => {
// //     if (showingInfoWindow) {
// //         setshowingInfoWindow(false);
// //         setActiveMarker(null)
// //     }
// //   }
// // }, []);
// console.log("all other users: ",otherUsers)
// console.log("center: ",cntr)
//     return (
//       <Map
//         google={Map.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={{lat: 37.36883 , lng: -122.0363496}}
//       >
//         {otherUsers != null ? (
//           otherUsers.map((profile, idx) => {
//             return (
//               <div className="profile-marker">
//                 {profile != null
//                 ?
//                 <div> <Marker
//                 position={profile.position}
//                   onClick={() => onMarkerClick(profile.user.address, idx)}
//                   name={profile.user.username}
//                 />
//                 <InfoWindow
//                   marker={activeMarker}
//                   visible={showingInfoWindow}
//                   onClose={onClose}
//                 >
//                   <div>
//                     <h4>{selectedPlace}</h4>
//                   </div>
//                 </InfoWindow>
//                 </div>
//                 : <h1>No profiles to generate a map from</h1>
//           }
//               </div>
//             );
//           })
//         ) : (
//           <></>
//         )}
//       </Map>
//     );
//   }

// // export class MapContainer extends Component {
// //   // constructor(props){
// //   //   super(props)
// //   //   this.state{

// //   //   }
// //   // }
// //   state = {
// //     showingInfoWindow: false, // Hides or shows the InfoWindow
// //     activeMarker: {}, // Shows the active marker upon click
// //     selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
// //   };
// //   onMarkerClick = (props, marker, e) =>
// //     setState({
// //       selectedPlace: props,
// //       activeMarker: marker,
// //       showingInfoWindow: true,
// //     });

// //   onClose = (props) => {
// //     if (state.showingInfoWindow) {
// //     setState({
// //         showingInfoWindow: false,
// //         activeMarker: null,
// //       });
// //     }
// //   };

// //   render() {
// //     return (
// //       <Map
// //         google={this.props.google}
// //         zoom={14}
// //         style={mapStyles}
// //         initialCenter={this.props.center}
// //       >
// //         {this.props.allCoordsAndMatches != null ? (
// //           allCoordsAndMatches.map((profile, idx) => {
// //             return (
// //               <div className="profile-marker">
// //                 <Marker
// //                 position={profile.position}
// //                   onClick={this.onMarkerClick}
// //                   name={profile.user.username}
// //                 />
// //                 <InfoWindow
// //                   marker={this.state.activeMarker}
// //                   visible={this.state.showingInfoWindow}
// //                   onClose={this.onClose}
// //                 >
// //                   <div>
// //                     <h4>{this.state.selectedPlace.name}</h4>
// //                   </div>
// //                 </InfoWindow>
// //               </div>
// //             );
// //           })
// //         ) : (
// //           <></>
// //         )}
// //       </Map>
// //     );
// //   }
// // }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0",
// })(MapContainer);
