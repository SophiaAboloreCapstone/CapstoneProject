import * as React from "react";
import { useState, useEffect } from "react";
import "./Preferences.css";
import NavBar from "../../Home/NavBar/NavBar";
import Activities from "../../Activities/Activities";
import interestsJSON from "../../../data/interests.json"
import employmentJSON from "../../../data/employment_fields.json";
import budgets from "../../../data/budget_ranges.json";
import Card from "../../Card/Card";
export default function Preferences() {
    let interestsArr = interestsJSON.interests;
    let employment_fields = employmentJSON.employment;
    let budgestsArr = budgets.ranges;
    console.log("interestsArr: ", interestsArr)
  const [preferenceInfo, setPreferenceInfo] = useState({});
  const [employment, setEmployment] = useState(null);
  const [interests, setInterests] = useState(null);
  const [touristAttractions, setTouristAttractions] = useState(null);
  const [currLocation, setCurrLocation] = useState(null);
  const [budget, setBudget] = useState(null);
  const [visibility, setVisibility] = useState(null);
  return (
    <div className="preferences">
      {/* <NavBar /> */}
      <div className="questionaire">
        <div className="employment">
          <h3>What best describes the field you work in?</h3>
          <select id="occupation" name="occupation">
          {
            employment_fields.map((occupation, idx) =>(
                <option>{occupation}</option>
            ))
          }
          </select>
        </div>
        <div className="interests">
          <h3>Select the following interests that apply to you</h3>
          <div className="grid">
          {
            interestsArr.map((interest, idx) =>(
                <Card name={interest.string} key={idx} />
            ))
          }
          </div>
        </div>
        <div className="tourist-attractions">
          <h3>Select the following tourist attractions interest you?</h3>
          <Activities country={"Moscow"} />
        </div>
        <div className="curr-location">
          <h3>Where are you currently located</h3>
          <input className="country"></input>
        </div>
        <div className="budget">
          <h3>Please select the range of your budget for this trip</h3>
          <select id="budgest-range" name="budgest-range">
          {
            budgestsArr.map((range, idx) =>(
                <option>{range}</option>
            ))
          }
          </select>
        </div>
        <div className="visibility-preference">
          <h3>
            Would you like to share your location with all travellers near you
          </h3>
        </div>
      </div>
    </div>
  );
}
