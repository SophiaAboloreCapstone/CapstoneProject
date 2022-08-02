import * as React from "react"
import  "../MatchCard/MatchDisplay.css"
// import {
//   Link
// } from "react-router-dom";

export default function MatchDisplay({ name, bio, picture, country, accomodation }) {
  console.log("creating card")
  return (
    <section className="match-display">
      <div className="match-card">
        <img className="profile-picture" src={picture}></img>
        <h1 className="match-name">{name}</h1>
        <div className="match-country"><p className="country">Travelling to: {country}</p></div>
        <div className="match-accomodation"><p className="accomodation">Preffered Accomodation: {accomodation}</p></div>
        <div className="match-bio"><p className="bio">Bio: {bio}</p></div>
        </div>
    </section>
  )
}