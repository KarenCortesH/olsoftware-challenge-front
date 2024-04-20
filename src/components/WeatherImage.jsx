import React, { useState, useEffect } from 'react';

const WeatherImage = ({ city }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        // Hacer una solicitud a la API de OpenWeatherMap para obtener la información del clima
        const apiKey = '9169f93ced248be4d821292aaa11022f';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => setWeather(data.weather[0].main))
            .catch(error => console.error('Error fetching weather data:', error));
    }, [city]);

    // Función para seleccionar la imagen según la condición meteorológica
    const selectImage = () => {
        switch (weather) {
            case 'Clear':
                return 'sunny.jpg';
            case 'Clouds':
                return 'cloudy.jpg';
            case 'Rain':
                return 'rainy.jpg';
            // Agrega más casos para otras condiciones meteorológicas según sea necesario
            default:
                return 'default.jpg';
        }
    };

    return (
        <div className="weather-image">
            {weather && <img src={selectImage()} alt="Weather" />}
        </div>
    );
};

export default WeatherImage;
