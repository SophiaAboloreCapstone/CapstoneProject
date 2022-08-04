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
        </div>
    )
}