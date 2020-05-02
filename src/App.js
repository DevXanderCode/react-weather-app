import React, { useState } from "react";

const api = {
  key: "0fd5c3dfae61e3978e62cf9c009149d9",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  // query the Api and set the weather state to the result of the query
  const search = async (event) => {
    if (event.key === "Enter") {
      const resp = await fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
      );
      const result = await resp.json();

      setWeather(result);
      setQuery("");
      console.log(result);
    }
  };
  //get the current Date.
  const dateBuilder = (d) => {
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  // to decide the className depending on the weather of the location so as to change the background image accordingly.
  const decideClass =
    typeof weather.main !== "undefined"
      ? weather.weather[0].main === "Sunny"
        ? "app warm"
        : weather.weather[0].main === "Clouds"
        ? "app cloud"
        : weather.weather[0].main === "Rain"
        ? "app rainy"
        : weather.weather[0].main === "Clear"
        ? "app clear"
        : "app"
      : "app";

  return (
    <div className={typeof weather.main != "undefined" ? decideClass : "app"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
