import * as React from "react";
'use strict';

import * as config from '../../config';
import budgets from '../../data/budget_ranges.json';
import countries from '../../data/countries.json';
import employmentJSON from '../../data/employment_fields.json';
import interestsJSON from '../../data/interests.json';
import months from '../../data/months.json';
import Activities from '../Activities/Activities';
import Footer from '../Home/Footer/Footer';
import NavBar from '../Home/NavBar/NavBar';
import Loading from '../Loading/Loading';
import axios from 'axios';
// import * as React from 'react';
import {useEffect, useState} from 'react';
import Geocode from 'react-geocode';
import Resizer from 'react-image-file-resizer';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
Geocode.setApiKey("AIzaSyA4B7q2I3Alla6f8udR0Nr-_3vB8lW5Te0");
import './ProfileView.css';

// Page Components
const MainContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 250vh;
  width: 30vw;
  background: #f7a9e3;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 250vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 250vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 250vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 250vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 250vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 50vw;
    height: 250vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const INTERESTS_DATA = interestsJSON.interests;
const EMPLOYMENT_DATA = employmentJSON.employment;
const BUDGET_RANGE_DATA = budgets.ranges;
const COUNTRY_LIST = countries.list;
const MONTH_LIST = months.list;

export default function ProfileView({
  handleCreateProfile,
  handleLogout,
  isLoggedIn,
  profileCreated,
  profileEdited,
}) {
  const [profileFormFields, setProfileFormFields] = useState({
    username: null,
    bio: null,
    age: null,
    country: null,
    travelMonth: null,
    accomodations: null,
    address: null,

    interests: [],
    attractions: [],
    occupation: null,
    budget: null,
    currLocation: null,
    visibility: null,

    employement: null,
    touristAttractions: [],

    position: {lat: null, lng: null},
    region: null,
  });

  const profileImageRef = React.createRef();

  const [location, setLocation] = useState(null);
  const [croppedImg, setCroppedImg] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [interests, setInterests] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [picture, setPicture] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const profileInfoResponse = await axios.get(
          `${config.API_BASE_URL}/profileInfo`,
        );
        const matchesResponse = await axios.get(
          `${config.API_BASE_URL}/matches`,
        );
        // use the response to set some state
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (profileFormFields.currLocation !== null) {
      Geocode.fromAddress(profileFormFields.currLocation).then(
        response => {
          const {lat, lng} = response.results[0].geometry.location;
          setProfileFormFields({
            ...profileFormFields,
            position: {lat, lng},
          });
        },
        error => {
          setError(error);
        },
      );
    }
    console.log("location changed: ", profileFormFields.currLocation)
  }, [profileFormFields.currLocation]);

  const handleSubmit = async event => {

    console.log("submitting")
    event.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      // update API to parse everything from preference info object pass in
      // or can do the values separate i.e username: profileFormFields.username
      const res = await axios.post(
        `${config.API_BASE_URL}/profileInfo`,
        {
          ...profileFormFields,
          picture: picture,
          // profileImageRef.current.files[0].name,
          preferenceInfo: profileFormFields,
        },
        {maxContentLength: Infinity, maxBodyLength: Infinity}, // is this needed ?
      );

      handleCreateProfile(res.data.profile);
      navigate('/profileDisplay');
    } catch (e) {
      setError(e); // parse out info from error object / do something when this is set !
    } finally {
      setIsSaving(false);
    }
  };

  const fileChangedHandler = event => {
    // fxn is unused ?
    event.preventDefault();
    const file = event.target.files[0];
    if (file != null) {
      setError(null);
      try {
        Resizer.imageFileResizer(
          file,
          300,
          300,
          'JPEG',
          70,
          0,
          uri => {
            setPicture(uri);
          },
          'base64',
          200,
          200,
        );
        // getBase64(croppedImg);
      } catch (err) {
        setError(err); // parse out info from error object / do something when this is set !
      }
    }
  };

  const handleChange = event => {

    console.log("event: ", event.target.value)
    setProfileFormFields({
      ...profileFormFields,
      [event.target.name]: event.target.value,
    });
  };

    // Update the state array for the users attractions interests
const handleAttractionsSelected =(event, attraction)=> {
  event.preventDefault()
  setAttractions([...attractions, attraction])
  setProfileFormFields({
    ...profileFormFields, touristAttractions: attractions
  })
  console.log("touristAttractions: ", attractions)
  }
  const handleInterestsSelected =(interest)=> {
    setInterests([...interests, interest])
    setProfileFormFields({
      ...profileFormFields, interests: interests
    })
    console.log("profileFormFields: ",profileFormFields)
    }

  return (
    <div className="profile-view">
      <NavBar handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
      <div className="profile">
        {!profileCreated && (
          <MainContainer>
            <form onSubmit={async event => await handleSubmit(event)}>
              <div className="profile-creation">
                <h2 className="profile-title">Set up your profile</h2>
                <label>
                  <span>Profile Picture</span>
                  <input ref={profileImageRef} type="file" onChange={(event) => fileChangedHandler(event)}/>
                </label>
                <label>
                  <span>Full Name</span>
                  <input
                    className="profile-input"
                    name="username"
                    onChange={handleChange}
                    placeholder="Full Name"
                    type="text"
                    value={profileFormFields.username}
                  />
                </label>
                <label>
                  <span>Age</span>
                  <input
                    className="profile-input"
                    name="age"
                    onChange={handleChange}
                    placeholder="Age"
                    type="text"
                    value={profileFormFields.age}
                  />
                </label>
                <label>
                  <span>Bio</span>
                  <input
                    className="profile-input"
                    name="bio"
                    onChange={handleChange}
                    placeholder="Tell us something about yourself"
                    type="text"
                    value={profileFormFields.bio}
                  />
                </label>
                <label>
                  <span>Address</span>
                  <input
                    className="profile-input"
                    name="address"
                    onChange={handleChange}
                    placeholder="This can be as broad or as specific as you'd like"
                    type="text"
                    value={profileFormFields.address}
                  />
                </label>
                <label>
                  <span>Country</span>
                  <select
                    className="profile-choices"
                    name="country"
                    onChange={handleChange}
                    value={profileFormFields.country}>
                    {COUNTRY_LIST.map((country, idx) => (
                      <option
                        key={`${country.name}_${idx}`}
                        value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Month</span>
                  <select
                    className="profile-choices"
                    name="travelMonth"
                    onChange={handleChange}
                    value={profileFormFields.travelMonth}>
                    {MONTH_LIST.map((month, idx) => (
                      <option key={`${month}_${idx}`} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Where are you going?</span>
                  <input
                    className="profile-input"
                    name="currLocation"
                    onChange={handleChange}
                    type="text"
                    value={profileFormFields.currLocation}
                  />
                </label>
                <label>
                  <span>Accomodations</span>
                  <select
                    className="profile-choices"
                    name="accomodations"
                    onChange={handleChange}
                    value={profileFormFields.accomodations}>
                    <option value="hotel">Hotel</option>
                    <option value="motel">Motel</option>
                    <option value="hostel">Hostel</option>
                  </select>
                </label>
                <label>
                  <span>What best describes the field you work in?</span>
                  <select
                    className="profile-choices"
                    name="occupation"
                    onChange={handleChange}
                    value={profileFormFields.occupation}>
                    {EMPLOYMENT_DATA.map((occupation, idx) => (
                      <option key={`${occupation}_${idx}`} value={occupation}>
                        {occupation}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Select the following interests that apply to you</span>
                  <div className="grid">
                    {INTERESTS_DATA.map((interest, idx) => (
                      <div key={`${interest.id}_${idx}`}>
                        <button
                          type="button"
                          className="card"
                          onClick={event => {
                            // call the fxn and set the state from result
                            handleInterestsSelected(interest.id)
                          }}>
                          {interest.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </label>
                {profileFormFields.currLocation && (
                  <label>
                    <span>
                      Select the following tourist attractions that interest you
                    </span>
                    <Activities
                      handleAttractionsSelected={handleAttractionsSelected}
                      latitude={profileFormFields.position.lat}
                      longitude={profileFormFields.position.lng}
                      region={profileFormFields.currLocation}
                    />
                  </label>
                )}
                <label>
                  <span>
                    Please select the range of your budget for this trip
                  </span>
                  <select
                    className="profile-choices"
                    name="budget"
                    onChange={handleChange}
                    value={profileFormFields.budget}>
                    {BUDGET_RANGE_DATA.map((range, idx) => (
                      <option key={`${range}_${idx}`} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>
                    Would you like to share your location with all travellers
                    near you
                  </span>
                  <select
                    className="profile-choices"
                    name="visibility"
                    onChange={handleChange}
                    required
                    value={profileFormFields.visibility}>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </label>
                <button className="profile-complete" type="submit">
                  Complete Profile and View Matches
                </button>
                
              </div>
              
            </form>
          </MainContainer>
        )}
      </div>
      {error && <div>render something when error</div>}
    </div>
  );
}