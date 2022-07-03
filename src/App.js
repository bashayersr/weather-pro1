import React, { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";
import StartApp from "./components/StartApp";
import Weather from "./components/Weather";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Terms from "./components/terms";

const Api_Key = "76c3fd65b934ee98ec68e14b83d9c173";
function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(undefined);
  const [icon, setIcon] = useState(undefined);
  const [main, setMain] = useState(undefined);
  const [celsius, setCelsius] = useState(undefined);
  const [temp_max, setTempMax] = useState(null);
  const [temp_min, setTempMin] = useState(null);
  const [descriptoin, setDescriptoin] = useState("");
  const [error, setError] = useState(false);

  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog",
  };
  const calCelsius = (temp) => {
    let cell = Math.floor(temp - 273.15);
    return cell;
  };
  function get_WeatherIcon(icons, rangled) {
    switch (true) {
      case rangled >= 200 && rangled <= 232:
        setIcon(icons.Thunderstorm);
        break;
      case rangled >= 300 && rangled <= 321:
        setIcon(icons.Drizzle);
        break;
      case rangled >= 500 && rangled <= 531:
        setIcon(icons.Rain);
        break;
      case rangled >= 600 && rangled <= 622:
        setIcon(icons.Snow);
        break;
      case rangled >= 701 && rangled <= 781:
        setIcon(icons.Atmosphere);
        break;
      case rangled === 800:
        setIcon(icons.Clear);
        break;
      case rangled >= 801 && rangled <= 804:
        setIcon(icons.Clouds);
        break;

      default:
        setIcon(icons.Clouds);
    }
  }
  const getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );
      const response = await api_call.json();
      setCity(`${response.name}, ${response.sys.country}`);
      setCelsius(calCelsius(response.main.temp));
      setTempMax(calCelsius(response.main.temp_max));
      setTempMin(calCelsius(response.main.temp_min));
      setDescriptoin(response.weather[0].description);
      setIcon(weatherIcon.Thunderstorm);
      get_WeatherIcon(weatherIcon, response.weather[0].id);
      console.log(response);
    } else {
      setError(true);
    }
  };
  return (
    <Router>
      <Navbar projectName="Weather" />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <StartApp loadweather={getWeather} error={error} />
              <Weather
                city={city}
                country={country}
                celsius={celsius}
                temp_min={temp_min}
                temp_max={temp_max}
                descriptoin={descriptoin}
                weatherIcon={icon}
              />
            </div>
          }
        />

        <Route
          path="/terms"
          element={
            <div className="container ">
              <Terms />
            </div>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;