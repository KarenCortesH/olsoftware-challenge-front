import React, { useState, useEffect } from 'react';
import sunny from '../assets/sunny.jpg';
import cloudy from '../assets/cloudy.jpg';
import rainy from '../assets/rainy.jpg';
import defaultImg from '../assets/default.jpg';

const WeatherImage = ({ city }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const apiKey = '9169f93ced248be4d821292aaa11022f'; // Reemplaza 'TU_API_KEY' con tu propia clave API de OpenWeatherMap
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.weather && data.weather.length > 0) {
                    setWeather(data.weather[0].main);
                } else {
                    console.error('No se encontraron datos meteorológicos para la ciudad:', city);
                }
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }, [city]);

    const selectImage = () => {
        switch (weather) {
            case 'Clear':
                return sunny;
            case 'Clouds':
                return cloudy;
            case 'Rain':
                return rainy;
            default:
                return defaultImg;
        }
    };

    return (
        <div className="weather-image">
            {weather && <img src={selectImage()} alt="Weather" />}
        </div>
    );
};

export default WeatherImage;
