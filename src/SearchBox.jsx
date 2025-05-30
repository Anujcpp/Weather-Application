import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./SearchBox.css";
import { useState } from "react";
export default function searchBox({updateInfo}) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "65a1b9b4dc7722e2aef92cc08a4126e3";

  let getWeatherInfo = async () => {
    try{
    let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    let jsonResponse = await response.json();
    console.log(jsonResponse);
    let result = {
        city : city,
        Feels_Like : jsonResponse.main.feels_like,
        Humadity : jsonResponse.main.humidity,
        Temperature : jsonResponse.main.temp,
        MinTemp : jsonResponse.main.temp_min,
        MaxTemp : jsonResponse.main.temp_max,
        Weather : jsonResponse.weather[0].description,
    };
    console.log(result)
    return result;
  }
  catch(err){
    throw err;
  }
  }
 
  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    try{
    event.preventDefault();
    console.log(city);
    setCity("");
    let newInfo = await getWeatherInfo();
    updateInfo(newInfo);
    } catch(err){
      setError(true);
    }
  };

  return (
    <div className="Searchbox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="standard-basic"
          label="City Name"
          variant="standard"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" endIcon={<SendIcon />} type="submit">
          Search
        </Button>
        {error && <p style={{color:"red"}}>No such place found</p>}
      </form>
    </div>
  );
}
