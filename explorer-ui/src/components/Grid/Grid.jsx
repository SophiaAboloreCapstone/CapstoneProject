import * as React from "react"
import "./Grid.css"
import Card from "../Card/Card";
import {
    Link
} from "react-router-dom";

export default function Grid({eventData}) {
    return (
        <div className="activities-grid">
        {eventData != [] ? (
            eventData.map((event, idx) => {
              return (
                <Card
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
