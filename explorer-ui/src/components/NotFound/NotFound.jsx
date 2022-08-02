import * as React from "react"
import "./NotFound.css"
import { Link } from "react-router-dom"
export default function NotFound() {
  return (
    <div class="not-found">
      <div className="not-found-container">
        <img className="not-found-img" src="https://cdn.dribbble.com/users/1285274/screenshots/3162565/robot_movie.gif"></img>
        <h2 className="not-found-h2">404</h2>
        <h3 className="not-found-h3">Oops, nothing here...</h3>
        <p className="not-found-p">Please Check the URL</p>
        <p className="not-found-p">Otherwise, <Link to="/">Click here </Link> to redirect to homepage.</p>
      </div>
    </div>
  )
}
