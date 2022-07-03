import React from "react";
import "../App.css";
function Weather({
  city,
  celsius,
  temp_max,
  temp_min,
  descriptoin,
  weatherIcon,
}) {
  return (
    <div className="container ">
      <div className="card_ p-3">
        <h1>{city}</h1>
        <h5 className="py-4">
          <i className={`wi ${weatherIcon} display-1`} />
        </h5>
        {celsius ? <h1 className="py-2">{celsius}&deg;C</h1> : null}

        {minmaxTemp(temp_max, temp_min)}

        <h4 className="px-4">
          {descriptoin.charAt(0).toUpperCase() + descriptoin.slice(1)}
        </h4>
      </div>
    </div>
  );
}

function minmaxTemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span className="px-4">Min: {min}&deg;</span>
        <span className="px-4">Max: {max}&deg;</span>
      </h3>
    );
  }
}

export default Weather;