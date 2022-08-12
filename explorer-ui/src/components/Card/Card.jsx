import * as React from "react"
import "./Card.css"

// import {useState} from React
export default function Card({name, handleAttractionsSelected}) {
    
    return (
        <div className="activity-card">
            <button type="click" className="activity" onClick={(event) => handleAttractionsSelected(event, name)}>{name}</button>
        </div>
    )
}