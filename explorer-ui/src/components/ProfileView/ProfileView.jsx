import * as React from "react";
import "./ProfileView.css";
import axios from "axios";
import * as config from "../../config";
import countries from "../../data/countries.json";
import months from "../../data/months.json"
import Footer from "../Home/Footer/Footer";
import NavBar from "../Home/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";

export default function ProfileView({
  handleCreateProfile,
  profileCreated,
  profileEdited,
  isLoggedIn, handleLogout
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
  const [profiles, setProfiles] = React.useState([]);
  const navigate = useNavigate();

  let countryList = countries.list;
  let monthList = months.list;


  const handleSubmit = (event) => {
    event.preventDefault();
    // setProfile({});
    const profile = async () => {
      try {
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
          },
          { maxContentLength: Infinity, maxBodyLength: Infinity }
        );
        handleCreateProfile(res.data.profile);
        navigate("/preferences")
        
      } catch (err) {
        alert(err);
        console.log(err);
      }
    };
    profile();
  };

  const [croppedImg, setCroppedImg] = React.useState()
  const fileChangedHandler =(event) => {
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
  }


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
  return (
    <div className="profile-view">
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
    <div className="profile">
      {!profileCreated ? (
        <div className="profile-creation">
          <form className="profile-view-form" onSubmit={handleSubmit}>
            <div className="title">Set up your profile</div>
            <label>
              <span>Username</span>
              <input  placeholder="Username"  ref={username}></input>
            </label>
            <label>
              <span>Age</span>
              <input  placeholder="Your age" ref={age}></input>
            </label>
            <label>
              <span>Profile Picture</span>
              <input
                type="file"
                id="profile-picture"
                name="picture"
                accept="image/*"
                // value={base64code}
                onChange={fileChangedHandler}
              ></input>
            </label>
            <label>
              <span>Bio</span>
              <input  placeholder="Tell us something about yourself" ref={bio}></input>
            </label>
            <label>
              <span>Address</span>
              <input  placeholder="This can be as broad or as specific as you'd like" ref={address}></input>
            </label>
            <label>
              <span>Country</span>
              <select ref={country} id="country" name="country">
                {countryList.map((country, idx) => (
                  <option value={country.name} key={idx}>{country.name}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Month</span>
              <select ref={travelMonth} id="month">
                {monthList.map((month, idx) => (
                  <option value={month}>{month}</option>
                )
                )}
              </select>
            </label>
            <label>
              <span>Accomodations</span>
              <select ref={accomodations} id="accomodations" name="accomodations">
              <option value="hotel">Hotel</option>
              <option value="motel">Motel</option>
              <option value="hostel">Hostel</option>
              </select>
            </label>
            <label>
              <span>Destination</span>
              <input  placeholder="What region will you be travelling to?"  ref={location}></input>
            </label>
            <button type="submit">Create Profile</button>
          </form>
        <Footer />
        </div>
      ) 
      : (
        <></> 
      )
      }

    </div>
    </div>
  );
}
