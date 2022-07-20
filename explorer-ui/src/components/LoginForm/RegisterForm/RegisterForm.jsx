import * as React from "react"
import "./RegisterForm.css"
import axios from "axios"
import * as config from "../../../config"
import styled from "styled-components";
import { Link } from "react-router-dom";
import Footer from "../../Home/Footer/Footer";
import NavBar from "../../Home/NavBar/NavBar";
export default function RegisterForm({ handleLogin }) {
    const username = React.createRef();
    const password = React.createRef();
    const age = React.createRef();
    const email = React.createRef();

    const handleSubmit = event => {
        event.preventDefault();

        const register = async () => {
            try {
                const res = await axios.post(`${config.API_BASE_URL}/register`, {
                    "username" : username.current.value,
                    "password" : password.current.value,
                    "age": age.current.value,
                    "email": email.current.value
                    })
                handleLogin(res.data.user)    
            } catch (err) {
                alert(err)
                console.log(err)
            }
        }
        register()
    }


// Page Components
const MainContainer = styled.div`

margin-left: auto;
margin-right: auto;
display: flex;
align-items: center;
flex-direction: column;
height: 80vh;
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
height: 90vh;
hr {
  margin-bottom: 0.3rem;
}
h4 {
  font-size: small;
}
}
@media only screen and (min-width: 360px) {
width: 80vw;
height: 90vh;
h4 {
  font-size: small;
}
}
@media only screen and (min-width: 411px) {
width: 80vw;
height: 90vh;
}

@media only screen and (min-width: 768px) {
width: 80vw;
height: 80vh;
}
@media only screen and (min-width: 1024px) {
width: 70vw;
height: 50vh;
}
@media only screen and (min-width: 1280px) {
width: 30vw;
height: 80vh;
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
<div className="register">
    <MainContainer>
      <h2 className="welcome-text">Welcome</h2>
      <div className="register-form-input-container">
        <div className="input-container">
        <input className="register-input" ref={email} type="email" placeholder="Email" />
        </div>
        <div className="input-container">
        <input className="register-input" ref={username} type="text" placeholder="Username" />
        </div>
        <div className="input-container">
        <input className="register-input" ref={age} type="text" placeholder="Age" />
        </div>
        <div className="input-container">
        <input className="register-input" ref={password} type="password" placeholder="Password" />
        </div>
      </div>
      <div className="register-button-container">
        <button className="register-page-button" onClick={handleSubmit} content="register">Register</button>
      </div>
      <HorizontalRule />
      <h3 className="register-prompt"> Already have an account?</h3>
      <div className="register-button-container">
      <Link to="/login">
        <button className="register-page-button"  content="Login">Login</button>
        </Link>
      </div>
    </MainContainer>
    <Footer />
        {/* <form onSubmit={handleSubmit}>
            <div className="title">Register</div>
            <label>
                <span>Email</span>
                <input type="email" ref={email}></input>
            </label>
            <label>
                <span>Username</span>
                <input ref={username}></input>
            </label>
            <label>
                <span>Password</span>
                <input type="password" ref={password}></input>
            </label>
            <label>
                <span>Age</span>
                <input ref={age}></input>
            </label>
            <button type="submit">Register</button>
        </form>    */}
        </div>     
    )
}