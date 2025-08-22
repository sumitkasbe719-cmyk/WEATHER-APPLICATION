import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox( {updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);  

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    let API_KEY = "f90dbc69091ca7928b20ca9d5aeb7a66";

    let getWeather = async () => {
        try {
            let resp = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let json = await resp.json();

        let result = {
            city: json.name,
            temp: json.main.temp,
            tempMin: json.main.temp_min,
            tempMax: json.main.temp_max,
            humidity: json.main.humidity,
            feelsLike: json.main.feels_like,
            weather: json.weather[0].description
        }
        console.log(result)
        return result;
        } catch (err) {
           throw err;
        }
        
    }; 


    let handleChange = (event) => {
        setCity(event.target.value);
    }

    let handleSubmit = async (event) => {
        try {
            event.preventDefault();
        console.log(city);
        setCity("");

        let newInfo = await getWeather();
        updateInfo(newInfo);

        setError(false);

        } catch (error) {
             setError(true);
        }
    }

    return (
        <>
            <div className='SearchBox'>
                <div className="searchContainer">

                    <form onSubmit={handleSubmit}>
                        <TextField id="city" required label="City Name" variant="standard" value={city} onChange={handleChange} /> <br /><br />
                        <Button className='search' type='submit' variant="contained">Search</Button>

                        {error ? <p style={{color: "red"}}>No such place exists!</p> : false }
                    </form>
                </div>
            </div>
        </>
    )
}