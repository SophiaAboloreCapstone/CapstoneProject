import * as React from "react"
import "./RegisterForm.css"
import axios from "axios"
import * as config from '../../config'

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

    return (
        <div className="register">
        <form onSubmit={handleSubmit}>
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
        </form>   
        </div>     
    )
}