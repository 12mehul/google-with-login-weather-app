import React, { useState } from "react";

const Weather = () => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [show, setShow] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data) {
        setShow(true);
        setWeatherData(data);
      }
    } catch (error) {
      console.lg("Error fetching weather data:", error);
    }
  };

  // Convert temperatures from Kelvin to Celsius and Fahrenheit
  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(1);
  const kelvinToFahrenheit = (temp) =>
    (((temp - 273.15) * 9) / 5 + 32).toFixed(1);

  return (
    <div>
      <input
        type="text"
        placeholder="Please enter the city name"
        onChange={(e) => setCity(e.target.value)}
        className="w-full border-2 text-base border-blue-600 rounded-md p-3 focus:outline-none hover:border-blue-500"
      />
      <div className="mt-5 flex items-center justify-center">
        <button
          className="w-80 text-xl font-normal bg-blue-500 text-white py-3 rounded-md hover:bg-blue-400"
          onClick={fetchData}
        >
          Submit
        </button>
      </div>
      {show && (
        <>
          {weatherData && (
            <div className="max-w-md p-8 mx-auto mt-16 rounded-lg bg-slate-100 text-gray-800 border shadow-md">
              <div className="flex justify-between space-x-8">
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-semibold">{weatherData.name}</h1>
                  <div className="text-gray-700 mb-4">
                    {weatherData?.weather?.map((item, index) => (
                      <div key={index}>
                        <p className="text-xl">{item.main}</p>
                        <p className="capitalize text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    ))}
                    <p className="mt-2 text-lg font-semibold">
                      Feels like: {weatherData?.main?.feels_like} K
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      Min/Max Temp: {weatherData?.main?.temp_min} K /{" "}
                      {weatherData?.main?.temp_max} K
                    </p>
                  </div>
                </div>
                <span className="font-bold text-xl">
                  {kelvinToCelsius(weatherData?.main.temp)}°C /{" "}
                  {kelvinToFahrenheit(weatherData?.main.temp)}°F
                </span>
              </div>
              <div className="flex flex-col text-gray-600 mt-2 text-lg font-semibold">
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Pressure: {weatherData.main.pressure} hPa</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                <p>Cloudiness: {weatherData.clouds.all}%</p>
                <p>Visibility: {weatherData.visibility} m</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
