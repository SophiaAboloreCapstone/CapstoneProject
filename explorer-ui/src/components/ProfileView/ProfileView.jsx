import * as React from "react";
import "./ProfileView.css";
import axios from "axios";
import * as config from "../../config";
import countries from "../../data/countries.json";
import months from "../../data/months.json";
import Footer from "../Home/Footer/Footer";
import NavBar from "../Home/NavBar/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import Loading from "../Loading/Loading";
import styled from "styled-components";
import Activities from "../Activities/Activities";
import interestsJSON from "../../data/interests.json";
import employmentJSON from "../../data/employment_fields.json";
import budgets from "../../data/budget_ranges.json";
import Geocode from "react-geocode";
export default function ProfileView({
  handleCreateProfile,
  profileCreated,
  profileEdited,
  isLoggedIn,
  handleLogout,
}) {
  const [picture, setPicture] = React.useState("");
  const username = React.createRef();
  const bio = React.createRef();
  const age = React.createRef();
  const country = React.createRef();
  const travelMonth = React.createRef();
  const accomodations = React.createRef();
  const address = React.createRef();
  const location = React.createRef();
  let [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

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
  // const [loading, setLoading] = useState(false);
  const [employment, setEmployment] = useState();
  const [interests, setInterests] = useState([]);
  const [touristAttractions, setTouristAttractions] = useState([]);
  const [currLocation, setCurrLocation] = useState(null);
  const [budget, setBudget] = useState();
  const [visibility, setVisibility] = useState(null);
  const [position, setPosition] = useState({ lat: null, lng: null });
  // const navigate = useNavigate();
  const budgetOption = React.createRef();
  const visibilityOption = React.createRef();
  const employmentOption = React.createRef();
  const region = React.createRef();

  let countryList = countries.list;
  let monthList = months.list;

  const handleSubmit = (event) => {
    event.preventDefault();
    // setProfile({});
    const profile = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${config.API_BASE_URL}/profileInfo`,
          {
            picture: picture,
            age: age.current.value,
            location: location.current.value,
            username: username.current.value,
            bio: bio.current.value,
            address: address.current.value,
            country: country.current.value,
            travelMonth: travelMonth.current.value,
            accomodations: accomodations.current.value,
            preferenceInfo: preferenceInfo,
          },
          { maxContentLength: Infinity, maxBodyLength: Infinity }
        );
        handleCreateProfile(res.data.profile);
        console.log("submitting");
        navigate("/profileDisplay");
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    profile();
  };

  const [croppedImg, setCroppedImg] = React.useState();
  const fileChangedHandler = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          300,
          300,
          "JPEG",
          70,
          0,
          (uri) => {
            console.log("uri:", uri);
            setPicture(uri);
          },
          "base64",
          200,
          200
        );
        // getBase64(croppedImg);
      } catch (err) {
        console.log(err);
      }
    }
  };

  React.useEffect(() => {
    const fetchProfileInfo = (async () => {
      try {
        const res = await axios.get(`${config.API_BASE_URL}/profileInfo`);
        // setProfile(res.data.profileInfo[res.data.profileInfo.length - 1]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  React.useEffect(() => {
    const fetchProfiles = (async () => {
      try {
        const res = await axios.get(`${config.API_BASE_URL}/matches`);
        // setProfiles(res.data.profiles);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
  useEffect(() => {
      // Update the state array for the users attractions interests
  function handleLocationSet(event) {
    event.preventDefault();
    setCurrLocation(location.current.value);
    console.log("region: ", location.current.value)
    setPreferenceInfo({
      interests: preferenceInfo.interests,
      attractions: preferenceInfo.attractions,
      occupation: preferenceInfo.employment,
      budget: preferenceInfo.budget,
      currLocation: currLocation,
      visibility: preferenceInfo.visibility,
    });
   
    

    // Get latitude & longitude from address.
    Geocode.fromAddress(location.current.value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setPosition({ lat: lat, lng: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  }
    
  }, [location])


  // // Send the profile information to the database
  //   function handleSubmit(event) {
  //     setLoading(true)
  //     event.preventDefault();
  //     const preferences = async () => {
  //       try {
  //         const res = await axios.post(
  //           `${config.API_BASE_URL}/profileInfo`,
  //           {
  //             preferenceInfo: preferenceInfo,
  //           },
  //           { maxContentLength: Infinity, maxBodyLength: Infinity }
  //         );
  //       } catch (err) {
  //         alert(err);
  //         console.log(err);
  //       }
  //     };
  //     preferences();
  //     navigate("/profileDisplay")
  //   }

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

  return (
    <div className="profile-view">
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="profile">
        {/* <form onSubmit={(event) => handleSubmit(event)}> */}
          {!profileCreated ? (
            <div className="profile-creation">
              {!loading ? (
                <div>
                  <MainContainer>
                    <form className="profile-view-form" onSubmit={(event) => handleSubmit(event)}>
                      <h2 className="profile-title">Set up your profile</h2>
                      <label>
                        <span>Profile Picture</span>
                        <input
                          type="file"
                          id="profile-picture"
                          name="picture"
                          accept="image/*"
                        ></input>
                      </label>
                      <label>
                        <span>Full Name</span>
                        <input
                          className="profile-input"
                          placeholder="Full Name"
                          ref={username}
                        ></input>
                      </label>
                      <label>
                        <span>Age</span>
                        <input
                          className="profile-input"
                          placeholder="Your age"
                          ref={age}
                        ></input>
                      </label>
                      <label>
                        <span>Bio</span>
                        <input
                          className="profile-input"
                          placeholder="Tell us something about yourself"
                          ref={bio}
                        ></input>
                      </label>
                      <label>
                        <span>Address</span>
                        <input
                          className="profile-input"
                          placeholder="This can be as broad or as specific as you'd like"
                          ref={address}
                        ></input>
                      </label>
                      <label>
                        <span>Country</span>
                        <select
                          className="profile-choices"
                          ref={country}
                          id="country"
                          name="country"
                        >
                          {countryList.map((country, idx) => (
                            <option value={country.name} key={idx}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Month</span>
                        <select
                          className="profile-choices"
                          ref={travelMonth}
                          id="month"
                        >
                          {monthList.map((month, idx) => (
                            <option value={month}>{month}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Destination</span>
                        <input
                          className="profile-input"
                          placeholder="What region will you be travelling to?"
                          ref={location}
                        ></input>
                      </label>
                      <label>
                        <span>Accomodations</span>
                        <select
                          className="profile-choices"
                          ref={accomodations}
                          id="accomodations"
                          name="accomodations"
                          // onChange={(event) => handleLocationSet(event)}
                        >
                          <option value="hotel">Hotel</option>
                          <option value="motel">Motel</option>
                          <option value="hostel">Hostel</option>
                        </select>
                      </label>
                      <label>
                        <span>What best describes the field you work in?</span>
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
                      </label>
                      <label>
                      {/* <div className="interests"> */}
                              <span>
                                Select the following interests that apply to you
                              </span>
                              <div className="grid">
                                {interestsArr.map((interest, idx) => (
                                  <div key={idx}>
                                    <button
                                      className="card"
                                      id={interest}
                                      onClick={(event) =>
                                        handleInterestSelected(
                                          event,
                                          interest.id
                                        )
                                      }
                                    >
                                      {interest.name}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            {/* </div> */}
                      </label>
                      <label>
                              {/* <form
                                className="set-location"
                                onClick={(event) =>
                                  handleLocationSet(event, region)
                                }
                              > */}
                                <span>Where are you currently located?</span>
                                {/* <span>Region</span> */}
                                <input ref={region} className="profile-input"
                                  // onChange={(event) => handleLocationSet(event, region)}
                                ></input>
                                <button type="click">Save Region</button>
                              {/* </form> */}
                            </label>
                            {currLocation ? (
                              <label>
                                <span>
                                  Select the following tourist attractions that
                                  interest you
                                </span>
                                <Activities
                                  region={currLocation}
                                  latitude={position.lat}
                                  longitude={position.lng}
                                  handleAttractionsSelected={
                                    handleAttractionsSelected
                                  }
                                />
                              </label>
                            ) : (
                              <></>
                            )}
                             <label>
                              <span>
                                Please select the range of your budget for this
                                trip
                              </span>
                              <select
                                id="budgest-range"
                                name="budgest-range"
                                ref={budgetOption}
                                onClick={(event) =>
                                  handleBudgetSelected(event, budgetOption)
                                }
                              >
                                {budgestsArr.map((range, idx) => (
                                  <option key={idx}>{range}</option>
                                ))}
                              </select>
                            </label>
                            <label>
                              <span>
                                Would you like to share your location with all
                                travellers near you
                              </span>
                              <select
                                id="visibility"
                                name="visibility"
                                ref={visibilityOption}
                                onClick={(event) =>
                                  handleVisibilitySelected(
                                    event,
                                    visibilityOption
                                  )
                                }
                                required
                              >
                                <option>Yes</option>
                                <option>No</option>
                              </select>
                            </label>
                            <button
            className="profile-complete"
            type="submit"
            onSubmit={(event) => handleSubmit(event)}
          >
            Complete Profile and View Matches
          </button>
                    </form>
                  </MainContainer>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div>
              <Loading loading={loading} />
            </div>
          )}
          
        {/* </form> */}
      </div>
    </div>
  );
}
