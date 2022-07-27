import * as React from "react"
import "./ActivityGrid.css"
import ActivityCard from "../ActivityCard/ActivityCard";
import {
    Link
} from "react-router-dom";

export default function ActivityGrid({eventData}) {
    return (
        <div className="activities-grid">
        {eventData != [] ? (
            eventData.map((event, idx) => {
              return (
                <ActivityCard
                  name={event.name}
                  // image={xip.image}
                  // address={xip.address}
                  points={event.point}
                  kinds={event.kinds}
                  // wikiextract={xip.wikipedia_extracts}
                  key={idx}
                />
              );
            })
          ) : (
            <p>Sorry no activities available</p>
          )}
          </div>
    )
}
