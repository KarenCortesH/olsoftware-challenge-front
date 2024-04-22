import React, { useState, useEffect } from 'react';
import sunny from '../assets/sunny.jpg';
import cloudy from '../assets/cloudy.jpg';
import rainy from '../assets/rainy.jpg';
import defaultImg from '../assets/default.jpg'; // Cambiado el nombre de la importación para evitar conflictos con la palabra reservada 'default'

const WeatherImage = ({ city }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const apiKey = '9169f93ced248be4d821292aaa11022f';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => setWeather(data.weather[0].main))
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
            // Agrega más casos para otras condiciones meteorológicas según sea necesario
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
