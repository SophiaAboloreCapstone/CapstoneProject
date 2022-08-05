import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import MatchDisplay from "../MatchGrid/MatchCard/MatchDisplay";
import {
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
import { useRef, useState} from "react";
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

  };

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
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    const res = results.routes[0].legs[0];
    setDistance(res.distance.text);
    setDuration(res.duration.text);
  }
  async function calculateRouteBetweenUsers(profileLocation) {
    if (originString  === "" || String(profileLocation) === "" || profileLocation == null) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: currLocation.string,
      destination: profileLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

  // Get latitude & longitude from address.
  const generateAttractionCoordinates = (currProfile) => {
    let attractions = currProfile.user.preferenceInfo.attractions;
    if (attractions) {
      for (let i = 0; i < attractions.length; i++) {
        if(( attractions[i] != null || attractions[i]!="")){ 
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
    }
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
                    name={profile.user.username}
                    key={idx}
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
            <Autocomplete colorScheme={"black"}>
              <Input type="text" placeholder="Origin" color={"black"} ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete colorScheme={"black"}>
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
