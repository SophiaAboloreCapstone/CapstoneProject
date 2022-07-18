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
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'
// const { REACT_APP_GOOGLE_MAPS_API_KEY } = require("./config");
// import { REACT_APP_GOOGLE_MAPS_API_KEY} from require('config');
const center = { lat: 48.8584, lng: 2.2945 }

function MapContainer({coordinates}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:"AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0",
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }
  var marker = new google.maps.Marker({
    position: center,
    title:"Hello World!"
});
marker.setMap(GoogleMap)


  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}>
          <Marker position={center} />
          <Marker position={{ lat: 48.8584, lng: 2.2944 }} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default MapContainer
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
