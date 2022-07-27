// This function calls API methods by fetch function (you can use XMLHttpRequest or $.ajax instead):
import ActivityGrid from "../ActivityGrid/ActivityGrid";
import { useState, useEffect } from "react";

import "./Activities.css"
//You should get your API key at https://opentripmap.io
const apiKey = "5ae2e3f221c38a28845f05b66afc7a4b942f1b2a702f9c54e864e3c6";
export default function Activities() {
  const [eventData, setEventData] = useState([]);
  const [xipList, setXIPList] = useState([]);
  // const [events, setEvents] = useState([]);
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

  // Init global variables for paging:

  const pageLength = 10; // number of objects per page

  let lon; // place longitude
  let lat; // place latitude

  let offset = 0; // offset from first object in the list
  let count; // total objects count

  // This block uses the placename from input textbox and gets place location from API. If place was found it calls list loading function:

const  handleTripSubmit= async(event) => {
    event.preventDefault();
    console.log("clicked");
    let name = "Moscow";
    const data = await  apiGet("geoname", "name=" + name)
      let message = "Name not found";
      if (data.status == "OK") {
        message = data.name + ", " + "Moscow";
        lon = 105.3188;
        lat = 61.524;
        firstLoad();
      }
      document.getElementById("info").innerHTML = `${message}`;

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

const loadList = async() => {
    const data = await apiGet(
      "radius",
      `radius=1000&limit=${pageLength}&offset=${offset}&lon=${37.6173}&lat=${55.7558}&rate=2&format=json`
    )
      let list = document.getElementById("list");
      list.innerHTML = "";
      console.log("data: ", data);
      setEventData(data);
      console.log("event data: ", eventData);
      getXIP(eventData)
      // data.forEach(item => list.appendChild(createListItem(item)));
      let nextBtn = document.getElementById("next_button");
      if (count < offset + pageLength) {
        nextBtn.style.visibility = "hidden";
      } else {
        nextBtn.style.visibility = "visible";
        nextBtn.innerText = `Next (${offset + pageLength} of ${count})`;
      }
  }


// useEffect(() => {
      // This function create a list item at the left pane:
const getXIP = async(events) => {
  console.log("events are: ",events)
  try{
    for (let i = 0; i < events.length; i++) {
      console.log(i)
      const xid = await apiGet("xid/" + events[i].xid)
      setXIPList([...xipList, xid]);
      console.log("xip list so far: ", xipList)
      console.log("xip is: ", xid); 
    }
    return 
  }
  catch(error){
    console.log(error);
  }
  };
 
  console.log("xip list is: ", xipList);


  function handleOnA(e) {
    document.querySelectorAll("#list a").forEach(function (item) {
      item.classList.remove("active");
    });
    this.classList.add("active");
    let xid = this.getAttribute("data-id");
    apiGet("xid/" + xid).then((data) => onShowPOI(data));
  }

  function createListItem(item) {
    let a = document.createElement("a");
    a.className = "list-group-item list-group-item-action";
    a.setAttribute("data-id", item.xid);
    a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
                <p class="list-group-item-text">${"entertainment"}</p>`;

    // a.addEventListener("click", function() {
    //   document.querySelectorAll("#list a").forEach(function(item) {
    //     item.classList.remove("active");
    //   });
    //   this.classList.add("active");
    //   let xid = this.getAttribute("data-id");
    //   apiGet("xid/" + xid).then(data => onShowPOI(data));
    // });
    // a.handleOnA("click")
    return a;
  }
  // This function shows preview and description at the right pane:

  function onShowPOI(data) {
    let poi = document.getElementById("poi");
    poi.innerHTML = "";
    if (data.preview) {
      poi.innerHTML += `<img src="${data.preview.source}">`;
    }
    poi.innerHTML += data.wikipedia_extracts
      ? data.wikipedia_extracts.html
      : data.info
      ? data.info.descr
      : "No description";

    poi.innerHTML += `<p><a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p>`;
  }
  // This block process Next page button

  function handleOnClick() {
    offset += pageLength;
    loadList();
  }

  return (
    <div className="activities">
      <form id="search-form">
        <input id="textbox"></input>
        <button type="submit" onClick={handleTripSubmit()}>
          search
        </button>
        <p id="info">Not Null</p>
        <li id="list"></li>
        <button id="next_button" type="click" onClick={(e) => handleOnClick(e)}>
          Next
        </button>
        <div id="poi"></div>
      </form>
      {xipList != null
      ?<ActivityGrid eventData={xipList}/>
      : <></>
}
    </div>

  );
}
