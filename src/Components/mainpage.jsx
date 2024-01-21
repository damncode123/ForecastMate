import React, { useState } from "react";
import "../Styles/searchbar.css";
import axios from "axios";

const Mainpage = () => {
  const [value, setValue] = useState('Delhi');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const fetchData = async () => {
    try {
      const apiKey = "324bc569408a44a8a12131056242001";
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${value}`;
      const response = await axios.get(apiUrl);
      const responseData = response.data;

      // Check if the search value matches the location data
      if (responseData.location.name.toLowerCase() === value.toLowerCase()) {
        setData(responseData);
        setError(null); // Reset error state on successful fetch
      } else {
        setData(null);
        setError({ message: "Please enter a valid location." });
      }
    } catch (error) {
      setData(null);
      setError(error);
    }
  };

  const handleClick = () => {
    fetchData();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-800">
      <div className="flex flex-col w-full max-w-md bg-purple-700 rounded-lg border border-purple-700 text-white p-8">
        <h1 className="text-3xl font-bold text-[#00171f] mb-4">
          Seize the Weather, Shape Your Day!
        </h1>
        <div className="flex flex-col md:flex-row justify-center items-center mb-4">
          <input
            placeholder="Search Location"
            onChange={handleChange}
            value={value}
            type="text"
            name="text"
            className="input text-black p-2 border border-gray-300 rounded-md mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
          />
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md"
            onClick={handleClick}
          >
            Search
          </button>
        </div>
        {data && (
          <div className="p-4 rounded-md mt-4">
            <h2 className="text-2xl font-semibold mb-2">
              Current Weather in {data.location.name}, {data.location.country}
            </h2>
            <p className="text-xl">Temperature: {data.current.temp_c} &#8451;</p> <br />
            <p className="text-xl ml-52">Condition: {data.current.condition.text}</p> <br />
            <p className="text-xl">Humidity: {data.current.humidity}%</p> <br />
            <p className="text-xl ml-52">Wind Speed: {data.current.wind_kph} km/h</p>
          </div>
        )}
        {error && <div className="text-red-500 mt-4">{error.message}</div>}
      </div>
    </div>
  );
};

export default Mainpage;
