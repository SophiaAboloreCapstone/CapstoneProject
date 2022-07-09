import * as React from "react"
import "./MatchGrid.css"
export default function MatchGrid({matches}) {
    return (
        <div className="match-grid">
            <h1>Here are your matches!</h1>
            {matches != null
            ?<></>
            :<></>
            }
        </div>
    )
}
