// This function calls API methods by fetch function (you can use XMLHttpRequest or $.ajax instead):
import Grid from "../Grid/Grid";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./Activities.css"
//You should get your API key at https://opentripmap.io
const apiKey = "5ae2e3f221c38a28845f05b66afc7a4b942f1b2a702f9c54e864e3c6";
  // Init global variables for paging:

  const pageLength = 10; // number of objects per page

  let lon; // place longitude
  let lat; // place latitude

  let offset = 0; // offset from first object in the list
  let count; // total objects count


export default function Activities({country}) {
  const [eventData, setEventData] = useState([]);
  const [xidList, setXIDList] = useState([]);
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

  function handleTripSubmit(event) {
    event.preventDefault();
    console.log("clicked");
    let name = "Moscow";
    apiGet("geoname", "name=" + name).then(function (data) {
      let message = "Name not found";
      if (data.status == "OK") {
        message = data.name + ", " + "Moscow";
        lon = 105.3188;
        lat = 61.524;
        firstLoad();
      }
      document.getElementById("info").innerHTML = `${message}`;
    });
    return;
  }
  // This function gets total objects count within 1000 meters from specified location (lon, lat) and then loads first objects page:

  function firstLoad() {
    apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${37.6173}&lat=${55.7558}&rate=2&format=count`
    ).then(function (data) {
      count = data.count;
      offset = 0;
      document.getElementById(
        "info"
      ).innerHTML += `<p>${count} objects with description in a 1km radius</p>`;
      loadList();
    });
  }

  // This function load POI's list page to the left pane. It uses 1000 meters radius for objects search:

  function loadList() {
    apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${37.6173}&lat=${55.7558}&rate=2&format=json`
    ).then(function (data) {
      console.log("data: ", data);
      data.forEach(element => setEventData(eventData => [...eventData, element]));
      console.log("event data: ", eventData);
    });
  }

 function loadMoreActivities(event){
  offset += pageLength;
  console.log("offset: ", offset)
  console.log("page length: ", pageLength)
  loadList();
 }

 // useEffect(() => {
      // This function create a list item at the left pane:
const getXID = async(events) => {
  console.log("events are: ",events)
  try{
    for (let i = 0; i < events.length; i++) {
      console.log(i)
      const xid = await apiGet("xid/" + events[i].xid)
      setXIDList(xidList => [...xidList, xid]);
      console.log("xid list so far: ", xidList)
      console.log("xid is: ", xid); 
    }
    return xidList
  }
  catch(error){
    console.log(error);
  }
  };

  return (
    <div className="activities">
      <form id="search-form">
        <input id="textbox"></input>
        <button type="submit" onClick={handleTripSubmit}>
          search
        </button>
        <p id="info">Not Null</p>
        <li id="list"></li>
        <div id="poi"></div>
      </form>
      <div className="activities-grid">
      {eventData != [] ? (
            eventData.map((event, idx) => {
              return (
                <Card
                  name={event.name}
                  // image={xid.image}
                  // address={xid.address}
                  points={event.point}
                  kinds={event.kinds}
                  // wikiextract={xid.wikipedia_extracts}
                  key={idx}
                />
              );
            })
          ) : (
            <p>Sorry no activities available</p>
          )}
      </div>
      <button id="next_button" type="click" onClick={(e) => loadMoreActivities(e)}>
          Next
        </button>
      {/* <ActivityGrid eventData={eventData}/> */}
    </div>

  );
}
