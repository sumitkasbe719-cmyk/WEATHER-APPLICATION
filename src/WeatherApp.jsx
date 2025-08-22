import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
import "./WeatherApp.css";
import CloudIcon from '@mui/icons-material/Cloud';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelslike: 37.67,
        humidity: 62,
        temp: 31.99,
        tempMax: 31.99,
        tempMin: 31.99,
        weather: "overcast clouds"
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    let appClass = weatherInfo.humidity > 75 ? "weatherApp rainy" : weatherInfo.temp <= 20 ? "weatherApp cold" : "weatherApp hot";

    return (
        <div className={appClass} style={{ textAlign: "center" }}>
            <h2 className="heading" > <CloudIcon className="heading" /> Weather App</h2>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    )
}