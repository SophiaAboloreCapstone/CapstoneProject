import * as React from "react"
import { useState, useEffect } from "react"
import "./Preferences.css"
import Activities from "../../Activities/Activities"
export default function Preferences() {
const [preferenceInfo, setPreferenceInfo] = useState({});
const [employment, setEmployment] = useState(null);
const [interests, setInterests] = useState(null);
const [touristAttractions, setTouristAttractions] = useState(null);
const [currLocation, setCurrLocation] = useState(null);
const [budget, setBudget] = useState(null);
const [visibility, setVisibility] = useState(null);
    return (
        <div className="preferences">
            <div className="employment">
            <h3>What best describes the field you work in?</h3>
            </div>
            <div className="interests">
            <h3>Select the following interests that apply to you</h3>
            </div>
            <div className="tourist-attractions">
                <h3>Which of the following tourist attractions interest you?</h3>
            </div>
            <div className="curr-location">
                <h3>Where are you currently located</h3>
            </div>
            <div className="budget">
                <h3>Please select the range of your budget for this trip</h3>
            </div>
            <div className="visibility-preference">
                <h3>Would you like to share your location with all travellers near you</h3>
            </div>
        </div>
    )
}
