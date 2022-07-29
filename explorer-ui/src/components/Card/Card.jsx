import * as React from "react"
import "./Card.css"
import {
    Link
} from "react-router-dom";

// import {useState} from React
export default function Card({name, handleAttractionsSelected}) {
    
    return (
        <div className="activity-card">
            <button className="activity" onClick={(event) => handleAttractionsSelected(event, name)}>{name}</button>
            {/* <h4>{address.neighbourhood} {address.state} {address.country}</h4> */}
            {/* <p>{kinds}</p> */}
            {/* <img className="activity-img" src={image} ></img> */}
        </div>
    )
}