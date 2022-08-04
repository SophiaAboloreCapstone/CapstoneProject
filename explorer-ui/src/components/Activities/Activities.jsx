// This function calls API methods by fetch function (you can use XMLHttpRequest or $.ajax instead):
import Grid from "../Grid/Grid";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./Activities.css"
import AttractionContainer from "./AttractionContainer";
//You should get your API key at https://opentripmap.io
const apiKey = "5ae2e3f221c38a28845f05b66afc7a4b942f1b2a702f9c54e864e3c6";
  // Init global variables for paging:

  const pageLength = 10; // number of objects per page

  let lon; // place longitude
  let lat; // place latitude

  let offset = 0; // offset from first object in the list
  let count; // total objects count


export default function Activities({region, latitude, longitude, handleAttractionsSelected}) {
  const [eventData, setEventData] = useState([]);
  const [xid, setXID] = useState([]);
  const [events, setEvents] = useState([]);

// Fetch data from the open trips maps API
  function apiGet(method, query) {
    return new Promise(function (resolve, reject) {
      var otmAPI =
        "https://api.opentripmap.com/0.1/en/places/" +
        method +
        "?apikey=" +
        apiKey;
      if (query !== undefined) {
        otmAPI += "&" + query;
      }
      fetch(otmAPI)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    });
  }

  // This block uses the placename from input textbox and gets place location from API. If place was found it calls list loading function:

  // function handleTripSubmit() {
  //   console.log("clicked");
  //   let name = region;
  //   apiGet("geoname", "name=" + name).then(function (data) {
  //     let message = "Name not found";
  //     if (data.status == "OK") {
  //       message = data.name + ", " +region;
  //       lon = longitude;
  //       lat = latitude;
  //       firstLoad();
  //     }
  //   });
  //   // return;
  // }
  // handleTripSubmit()

  // This function gets total objects count within 1000 meters from specified location (lon, lat) and then loads first objects page:

  function firstLoad() {
    apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${longitude}&lat=${latitude}&rate=2&format=count`
    ).then(function (data) {
      count = data.count;
      offset = 0;
      loadList();
    });
  }

  // This function load POI's list page to the left pane. It uses 1000 meters radius for objects search:

  function loadList() {
    apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${longitude}&lat=${latitude}&rate=2&format=json`
    ).then(function (data) {
      console.log("data: ", data);
      data.forEach(element => setEventData(eventData => [...eventData, element]));
      console.log("event data: ", eventData);
    });
  }

 function loadMoreActivities(event){
  event.preventDefault();
  offset += pageLength;
  console.log("offset: ", offset)
  console.log("page length: ", pageLength)
  loadList();
 }

 // useEffect(() => {
      // This function create a list item at the left pane:
const getXID = async(event, id) => {
  event.preventDefault();
  console.log("events are: ",events)
  try{
      const xidData = await apiGet("xid/" + id.xid)
      setXID(xidData);
      console.log("xid list so far: ", xid)
      console.log("xid is: ", xidData); 
    // return xidList
  }
  catch(error){
    console.log(error);
  }
  };

  return (
    <div className="activities">
      <div className="activities-grid">
      {eventData != [] ? (
            eventData.map((event, idx) => {
              return (
                <div className="activities">
                <Card
                  name={event.name}
                  points={event.point}
                  kinds={event.kinds}
                  handleAttractionsSelected={handleAttractionsSelected}
                  key={idx}
                />
                {/* <button className="more-info" type="click" onclick={(event) => getXID(event, event.xid)}>More Info</button> */}
                {xid.xid == event.xid
                ? <AttractionContainer name={xid.name} image={xid.image} description={xid.info.descr} source={xid.wikipedia} />
                : <></>
              }
                </div>
              );
            })
          ) : (
            <p>Sorry no activities available</p>
          )}
      </div>
      <button className="next_button" type="click" onClick={(e) => loadMoreActivities(e)}>
          Load More Attractions
        </button>
    </div>

  );
}
