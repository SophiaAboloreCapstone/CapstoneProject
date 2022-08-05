import * as React from "react"
import "./Grid.css"
import Card from "../Card/Card";

export default function Grid({eventData}) {
    return (
        <div className="activities-grid">
        {eventData != null && eventData.length > 0 ? (
            eventData.map((event, idx) => {
              return (
                <Card
                  name={event.name}
                  points={event.point}
                  kinds={event.kinds}
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
