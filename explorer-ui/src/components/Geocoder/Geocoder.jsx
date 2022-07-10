import * as React from "react"
import "./Geocoder.css"
export default function Geocoder({location}) {
var locationPoint= location;

function initialize() 
{
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(53.3496, -6.3263);
  var mapOptions = 
  {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  codeAddress(locationPoint);//call the function
}

function codeAddress(address) 
{
  geocoder.geocode( {address:address}, function(results, status) 
  {
    if (status == google.maps.GeocoderStatus.OK) 
    {
      map.setCenter(results[0].geometry.location);//center the map over the result
      //place a marker at the location
      var marker = new google.maps.Marker(
      {
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
   }
  });
}
    return (
        <div className="geocoder">
            <div id="map-canvas" style="width:710px; height:300px"></div>
        </div>
    )
}

