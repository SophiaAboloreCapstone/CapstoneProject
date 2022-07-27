import * as React from "react"
import "./ActivityCard.css"
import {
    Link
} from "react-router-dom";

export default function ActivityCard({name, points, kinds}) {
    return (
        <div className="activity-card">
            <h3>{name}</h3>
            {/* <h4>{address.neighbourhood} {address.state} {address.country}</h4> */}
            <p>{kinds}</p>
            {/* <img className="activity-img" src={image} ></img> */}
        </div>
    )
}
