import * as React from "react";
import "./ProfileView.css";
import axios from "axios";
import * as config from "../../config";
import countries from "../../data/countries.json";
import months from "../../data/months.json";
import Footer from "../Home/Footer/Footer";
import NavBar from "../Home/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import Resizer from "react-image-file-resizer";
import Loading from "../Loading/Loading";
import styled from "styled-components";

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
          },
          { maxContentLength: Infinity, maxBodyLength: Infinity }
        );
        handleCreateProfile(res.data.profile);
        navigate("/preferences");
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
// Page Components
const MainContainer = styled.div`
margin-left: auto;
margin-right: auto;
display: flex;
align-items: center;
flex-direction: column;
height: 100vh;
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
  height: 100vh;
  hr {
    margin-bottom: 0.3rem;
  }
  h4 {
    font-size: small;
  }
}
@media only screen and (min-width: 360px) {
  width: 80vw;
  height: 100vh;
  h4 {
    font-size: small;
  }
}
@media only screen and (min-width: 411px) {
  width: 80vw;
  height: 100vh;
}

@media only screen and (min-width: 768px) {
  width: 80vw;
  height: 100vh;
}
@media only screen and (min-width: 1024px) {
  width: 70vw;
  height: 100vh;
}
@media only screen and (min-width: 1280px) {
  width: 50vw;
  height: 100vh;
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
        {!profileCreated ? (
          <div className="profile-creation">
            {!loading ? (
              <div>
                <MainContainer>
                <form className="profile-view-form" onSubmit={handleSubmit}>
                  <h2 className="profile-title">Set up your profile</h2>
                  <label>
                    <span>Profile Picture</span>
                    <input
                      type="file"
                      id="profile-picture"
                      name="picture"
                      accept="image/*"
                      onChange={fileChangedHandler}
                    ></input>
                  </label>
                  <label>
                    <span>Full Name</span>
                    <input className="profile-input" placeholder="Full Name" ref={username}></input>
                  </label>
                  <label>
                    <span>Age</span>
                    <input className="profile-input" placeholder="Your age" ref={age}></input>
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
                    <select className="profile-choices" ref={country} id="country" name="country">
                      {countryList.map((country, idx) => (
                        <option value={country.name} key={idx}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Month</span>
                    <select className="profile-choices" ref={travelMonth} id="month">
                      {monthList.map((month, idx) => (
                        <option value={month}>{month}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>Accomodations</span>
                    <select className="profile-choices"
                      ref={accomodations}
                      id="accomodations"
                      name="accomodations"
                    >
                      <option value="hotel">Hotel</option>
                      <option value="motel">Motel</option>
                      <option value="hostel">Hostel</option>
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
                  {/* </div> */}
                  <div className="profile-button-container">
                  <button className="profile-page-button" type="submit">Create Profile</button>
                  </div>
                </form>
                </MainContainer>
                <Footer />
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
      </div>
    </div>
  );
}
  