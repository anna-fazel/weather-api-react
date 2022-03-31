import "./App.css";
import React, { useState } from "react";
import useRequest from "./useRequest";
import Forecast from "./Forecast";

function App() {
  const [searchResult, setSearchResult] = useState("");
  const [search, setSearch] = useState("");
  const [showTemp, setShowTemp] = useState();
  const [showHum, setShowHum] = useState();
  

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_KEY}&q=${searchResult}&days=10&aqi=yes&alerts=no`;
  const { data } = useRequest(url);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchResult(search);
    setSearch("");
  };

  
  return (
    <div className="app">
      <h2 className="title">Weather App</h2>
      <div className="search">
          <form onSubmit={onSubmit}>
          <input
            className="search-box"
            type="text"
            placeholder="location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor="">Options: </label>
          <label htmlFor="">Tempreture</label>
          <input
            className="checks"
            type="checkbox"
            id="temp"
            name="temo"
            onChange={() => setShowTemp(!showTemp)}
          />
          <label htmlFor="">Humidity</label>
          <input
            className="checks"
            type="checkbox"
            id="hum"
            name="hum"
            onChange={() => setShowHum(!showHum)}
          />
          
        </form>
      </div>

      {Object.keys(data).length !== 0 && (
        <>
          <h3 className="title">Current Weather</h3>
          <div className="result box-shadow">
          
              <img
                src={data.current.condition.icon}
                alt={data.current.condition.text}
              />
              <h5>{data.current.condition.text}</h5>
                     <h3>
                {data.location.name}, {data.location.country}
              </h3>

              {showTemp ? (
                <div className="temp">
                  {data.current ? (
                    <h4>Tempreture {data.current.temp_c}&deg;c</h4>
                  ) : null}
                </div>
              ) : null}

              {showHum ? (
                <div className="humidity">
                  {data.current ? (
                    <h4>Humidity {data.current.humidity}%</h4>
                  ) : null}
                </div>
              ) : null}
            </div>
          

          <Forecast data={data.forecast} />
        </>
      )}
    </div>
  );
}

export default App;
