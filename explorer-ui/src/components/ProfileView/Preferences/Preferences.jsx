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
  const [preferenceInfo, setPreferenceInfo] = useState({"interests": new Set(), "attractions": new Set(), "occupation": "", "budget": "", "currLocation":"", "visibility": ""});
  const [employment, setEmployment] = useState(null);
  const [interests, setInterests] = useState([]);
  const [touristAttractions, setTouristAttractions] = useState([]);
  const [currLocation, setCurrLocation] = useState(null);
  const [budget, setBudget] = useState();
  const [visibility, setVisibility] = useState(null);

// Update the state array for the users interests
function handleInterestSelected(event, interest) {
    event.preventDefault();
    setInterests(interests => [...interests, interest])
    setPreferenceInfo({"interests": interests, "attractions": preferenceInfo.attractions, "occupation": preferenceInfo.occupation, "budget": preferenceInfo.budget, "currLocation": preferenceInfo.currLocation, "visibility": preferenceInfo.visibility})
    console.log("preferenceInfo: ", preferenceInfo)
    console.log("interests so far: ", interests)
  };

// Update the state array for the users attractions interests
function handleAttractionsSelected(event, attraction) {
    event.preventDefault();
    setTouristAttractions(touristAttractions => [...touristAttractions, attraction])
    setPreferenceInfo({"interests": preferenceInfo.interests, "attractions": touristAttractions, "occupation": preferenceInfo.occupation, "budget": preferenceInfo.budget, "currLocation": preferenceInfo.currLocation, "visibility": preferenceInfo.visibility})
    console.log("preferenceInfo: ", preferenceInfo)
    console.log("attractions so far: ", touristAttractions)
  };

  // Update the state array for the users attractions interests
function handleOccupationsSelected(event, occupation) {
    event.preventDefault();
    setEmployment(occupation)
    setPreferenceInfo({"interests": preferenceInfo.interests, "attractions": preferenceInfo.attractions, "occupation": employment, "budget": preferenceInfo.budget, "currLocation": preferenceInfo.currLocation, "visibility": preferenceInfo.visibility})
    console.log("occupation is: ", employment)
  };

  // Update the state array for the users attractions interests
  function handleBudgetSelected(event, selectedBudget) {
    event.preventDefault();
    setBudget(selectedBudget)
    setPreferenceInfo({"interests": preferenceInfo.interests, "attractions": preferenceInfo.attractions, "occupation": preferenceInfo.occupation, "budget": budget, "currLocation": preferenceInfo.currLocation, "visibility": preferenceInfo.visibility})
    console.log("budget is: ", budget)
  };

    // Update the state array for the users attractions interests
    function handleVisibilitySelected(event, visibililityChoice) {
        event.preventDefault();
        setVisibility(visibililityChoice)
        setPreferenceInfo({"interests": preferenceInfo.interests, "attractions": preferenceInfo.attractions, "occupation": preferenceInfo.occupation, "budget": preferenceInfo.budget, "currLocation": preferenceInfo.currLocation, "visibility": visibility})
        console.log("visibility is: ", visibililityChoice)
      };
  return (
    <div className="preferences">
      {/* <NavBar /> */}
      <div className="questionaire">
        <div className="employment">
          <h3>What best describes the field you work in?</h3>
          <select id="occupation" name="occupation" >
          {
            employment_fields.map((occupation, idx) =>(
                <option on>{occupation}</option>
            ))
          }
          </select>
        </div>
        <div className="interests">
          <h3>Select the following interests that apply to you</h3>
          <div className="grid">
          {
            interestsArr.map((interest, idx) =>(
                <div >
            <button className="card" id={interest} onClick={(event) => handleInterestSelected(event, interest.id)}>{interest.string}</button>
        </div>
            ))
          }
          </div>
        </div>
        <div className="tourist-attractions">
          <h3>Select the following tourist attractions that interest you</h3>
          <Activities country={"Moscow"}  handleAttractionsSelected={handleAttractionsSelected}/>
        </div>
        <div className="curr-location">
          <h3>Where are you currently located</h3>
          <span>Country</span>
          <input className="country"></input>
          <span>State/Province</span>
          <input className="state"></input>
          <span>City/Town</span>
          <input className="city"></input>
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
          <select id="visibility" name="visibility">
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
    </div>
  );
}
