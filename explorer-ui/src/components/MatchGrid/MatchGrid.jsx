import * as React from "react"
import "./MatchGrid.css"
import MatchCard from "../MatchCard/MatchCard"
export default function MatchGrid({matches}) {
    return (
        <div className="match-grid">
            <h1>Here are your matches!</h1>
            {matches != null
            ? matches.map((match, idx) => {
                return (
                    <MatchCard name="Sophia" bio={match.bio} picture={match.picture} country={match.country} accomodation={match.accomodation} />
                // <div className="match" key={idx}>

                //     <h2 className="matchNumber">Match #{idx}</h2>
                //     <h2 className="macthPhoto">{match.picture}</h2>
                //     <h2 className="macthBio">Bio: {match.bio}</h2>
                //     <h2 className="macthDestination">Destination: {match.country}</h2>
                //     <h2 className="macthAccomodation">Accomodation: {match.accomodation}</h2>
                //     </div>

                )
            })
            :<></>
            }
        </div>
    )
}
