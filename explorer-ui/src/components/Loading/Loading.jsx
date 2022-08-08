import * as React from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({loading}) {
    const [color, setColor] = React.useState("#ffffff");
  return (
    <div className="loading">
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={{
          display: "block",
          margin: "0 auto",
          borderColor: "pink",
        }}
        size={150}
      />
    </div>
  );
}
