import * as React from "react";
import { useState, } from "react";
import { useNavigate} from "react-router-dom";
import "./Preferences.css";
import NavBar from "../../Home/NavBar/NavBar";
import Activities from "../../Activities/Activities";
import interestsJSON from "../../../data/interests.json";
import employmentJSON from "../../../data/employment_fields.json";
import budgets from "../../../data/budget_ranges.json";
import axios from "axios";
import * as config from "../../../config";
import Geocode from "react-geocode";
import Loading from "../../Loading/Loading"
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
export default function Preferences({ isLoggedIn, handleLogout}) {
  let interestsArr = interestsJSON.interests;
  let employment_fields = employmentJSON.employment;
  let budgestsArr = budgets.ranges;
  const [preferenceInfo, setPreferenceInfo] = useState({
    interests: new Set(),
    attractions: new Set(),
    occupation: "",
    budget: "",
    currLocation: "",
    visibility: "",
  });
  const [loading, setLoading] = useState(false);
  const [employment, setEmployment] = useState();
  const [interests, setInterests] = useState([]);
  const [touristAttractions, setTouristAttractions] = useState([]);
  const [currLocation, setCurrLocation] = useState(null);
  const [budget, setBudget] = useState();
  const [visibility, setVisibility] = useState(null);
  const [position, setPosition] = useState({ lat: null, lng: null });
  const navigate = useNavigate();
  const budgetOption = React.createRef();
  const visibilityOption = React.createRef();
  const employmentOption = React.createRef();
  const region = React.createRef();

  //TODO: Figure out how to set all the states at once? and add useEffects to all the function calls
  // Update the state array for the users interests
  function handleInterestSelected(event, interest) {
    event.preventDefault();
    setPreferenceInfo({
      interests: interests,
      attractions: preferenceInfo.attractions,
      occupation: preferenceInfo.occupation,
      budget: preferenceInfo.budget,
      currLocation: preferenceInfo.currLocation,
      visibility: preferenceInfo.visibility,
    });
    setInterests((interests) => [...interests, interest]);
  }

  // Update the state array for the users attractions interests
  function handleAttractionsSelected(event, attraction) {
    event.preventDefault();
    setPreferenceInfo({
      interests: preferenceInfo.interests,
      attractions: touristAttractions,
      occupation: preferenceInfo.occupation,
      budget: preferenceInfo.budget,
      currLocation: preferenceInfo.currLocation,
      visibility: preferenceInfo.visibility,
    });
    setTouristAttractions((touristAttractions) => [
      ...touristAttractions,
      attraction,
    ]);
  }

  // Update the state array for the users attractions interests
  function handleOccupationsSelected(event, occupation) {
    event.preventDefault();
    setPreferenceInfo({
      interests: preferenceInfo.interests,
      attractions: preferenceInfo.attractions,
      occupation: employment,
      budget: preferenceInfo.budget,
      currLocation: preferenceInfo.currLocation,
      visibility: preferenceInfo.visibility,
    });
    setEmployment(occupation.current.value);
  }

  // Update the state array for the users attractions interests
  function handleBudgetSelected(event, selectedBudget) {
    event.preventDefault();
    setPreferenceInfo({
      interests: preferenceInfo.interests,
      attractions: preferenceInfo.attractions,
      occupation: preferenceInfo.occupation,
      budget: budget,
      currLocation: preferenceInfo.currLocation,
      visibility: preferenceInfo.visibility,
    });
    setBudget(selectedBudget.current.value);
  }

  // Update the state array for the users attractions interests
  function handleVisibilitySelected(event, visibililityChoice) {
    event.preventDefault();
    setPreferenceInfo({
      interests: preferenceInfo.interests,
      attractions: preferenceInfo.attractions,
      occupation: preferenceInfo.occupation,
      budget: preferenceInfo.budget,
      currLocation: preferenceInfo.currLocation,
      visibility: visibilityOption.current.value,
    });
    setVisibility(visibililityChoice.current.value);
  }
  // Update the state array for the users attractions interests
  function handleLocationSet(event, region) {
    event.preventDefault();
    setPreferenceInfo({
      interests: preferenceInfo.interests,
      attractions: preferenceInfo.attractions,
      occupation: preferenceInfo.employment,
      budget: preferenceInfo.budget,
      currLocation: currLocation,
      visibility: preferenceInfo.visibility,
    });
    setCurrLocation(region.current.value);

    // Get latitude & longitude from address.
    Geocode.fromAddress(region.current.value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setPosition({ lat: lat, lng: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  }

// Send the profile information to the database
  function handleSubmit(event) {
    setLoading(true)
    event.preventDefault();
    const preferences = async () => {
      try {
        const res = await axios.post(
          `${config.API_BASE_URL}/profileInfo`,
          {
            preferenceInfo: preferenceInfo,
          },
          { maxContentLength: Infinity, maxBodyLength: Infinity }
        );
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    preferences();
    navigate("/profileDisplay")
  }

  // RETURN
  return (
    <div className="preferences">
      {!loading
      ? (<div>
         <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <div className="questionaire">  
        <div className="employment">
          <h3>What best describes the field you work in?</h3>
          <select
            id="occupation"
            name="occupation"
            ref={employmentOption}
            onClick={(event) =>
              handleOccupationsSelected(event, employmentOption)
            }
          >
            {employment_fields.map((occupation, idx) => (
              <option key={idx}>{occupation}</option>
            ))}
          </select>
        </div>
        <div className="interests">
          <h3>Select the following interests that apply to you</h3>
          <div className="grid">
            {interestsArr.map((interest, idx) => (
              <div key={idx}>
                <button
                  className="card"
                  id={interest}
                  onClick={(event) =>
                    handleInterestSelected(event, interest.id)
                  }
                >
                  {interest.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="curr-location">
          <form
            className="set-location"
            onClick={(event) =>
              handleLocationSet(event, region)
            }
          >
            <h3>Where are you currently located</h3>
            <span>Region</span>
            <input ref={region} className="country"></input>
            <button type="click">Save Region</button>
          </form>
        </div>
        {currLocation ? (
          <div className="tourist-attractions">
            <h3>Select the following tourist attractions that interest you</h3>
            <Activities
              region={currLocation}
              latitude={position.lat}
              longitude={position.lng}
              handleAttractionsSelected={handleAttractionsSelected}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="budget">
          <h3>Please select the range of your budget for this trip</h3>
          <select
            id="budgest-range"
            name="budgest-range"
            ref={budgetOption}
            onClick={(event) => handleBudgetSelected(event, budgetOption)}
          >
            {budgestsArr.map((range, idx) => (
              <option key={idx}>{range}</option>
            ))}
          </select>
        </div>
        <div className="visibility-preference">
          <h3>
            Would you like to share your location with all travellers near you
          </h3>
          <select
            id="visibility"
            name="visibility"
            ref={visibilityOption}
            onClick={(event) =>
              handleVisibilitySelected(event, visibilityOption)
            }
            required
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <button className="profile-complete" type="click" onClick={(event) => handleSubmit(event)}>
          Complete Profile and View Matches
        </button>
      </div>)
      : (<div>
        <Loading loading={loading}/>
      </div>)
      }
      
    </div>
  );
}