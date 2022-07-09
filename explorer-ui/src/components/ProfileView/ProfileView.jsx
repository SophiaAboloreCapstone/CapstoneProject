import * as React from "react";
import "./ProfileView.css";
import axios from "axios";
import * as config from "../../config";
// import {
//     Link
//   } from "react-router-dom";

export default function ProfileView({handleCreateProfile}) {
  const picture = React.createRef();
  const bio = React.createRef();
  const country = React.createRef();
  const travelMonth = React.createRef();
  const accomodations = React.createRef();
  const [profileInfo, setProfile] = React.useState({});
  const handleSubmit = (event) => {
    event.preventDefault();
    setProfile({})
    const profile = async () => {
      try {
        console.log("Profile created");
        const res = await axios.post(`${config.API_BASE_URL}/profileInfo`, {
          picture: picture.current.value,
          bio: bio.current.value,
          country: country.current.value,
          travelMonth: travelMonth.current.value,
          accomodations: accomodations.current.value,
        });
        // handleCreateProfile(res.data.profile);
        handleCreateProfile(res.data.profileInfo);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    profile();
  };
  React.useEffect(() => {
    const fetchProfileInfo = (async () => {
      try {
        const res = await axios.get(`${config.API_BASE_URL}/profileInfo`);
        setProfile(res.data.profileInfo[res.data.profileInfo.length - 1]);
        console.log(
          "profile :", profileInfo
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  console.log("this is your profile: ", profileInfo)
  // console.log("bio :", profile.bio)
  // console.log("accomodation: ", profile.accomodations)
  // console.log("travel month: ", profile.travelMonth)
  return (
    <div className="profile">
      {profileInfo == null ? (
        <form onSubmit={handleSubmit}>
          <div className="title">Login</div>
          <label>
            <span>Profile Picture</span>
            <input
              type="file"
              ref={picture}
              id="picture"
              name="picture"
              //   onChange={onChangePicture}
              accept="image/*"
            ></input>
          </label>
          <label>
            <span>Bio</span>
            <input ref={bio}></input>
          </label>
          <label>
            <span>Country</span>
            <input ref={country}></input>
          </label>
          <label>
            <span>Month</span>
            <input ref={travelMonth}></input>
          </label>
          <label>
            <span>Accomodations</span>
            <input ref={accomodations}></input>
          </label>
          <button type="submit">Create Profile</button>
        </form>
      ) : (
        <div className="profileDisplay">
          <img className="profile-picture" src={profileInfo.picture}></img>
          <h2>Bio: {profileInfo.bio}</h2>
          <h2>Country: {profileInfo.country}</h2>
          <h2>Month: {profileInfo.travelMonth}</h2>
          <button type="click">See Matches</button>
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="title">Login</div>
            <label>
              <span>Profile Picture</span>
              <input
                type="file"
                ref={picture}
                defaultValue={profileInfo.picture}
                id="picture"
                name="picture"
                //   onChange={onChangePicture}
                accept="image/*"
              ></input>
            </label>
            <label>
              <span>Bio</span>
              <input defaultValue={profileInfo.bio} ref={bio}></input>
            </label>
            <label>
              <span>Country</span>
              <input defaultValue={profileInfo.country} ref={country}></input>
            </label>
            <label>
              <span>Month</span>
              <input
                defaultValue={profileInfo.travelMonth}
                ref={travelMonth}
              ></input>
            </label>
            <label>
              <span>Accomodations</span>
              <input
                defaultValue={profileInfo.accomodations}
                ref={accomodations}
              ></input>
            </label>
            <button type="submit">Edit Profile</button>
          </form>
        </div>
      )}
    </div>
  );
}
