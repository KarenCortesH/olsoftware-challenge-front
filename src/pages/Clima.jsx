import React, { useState, useEffect } from 'react';
import WeatherImage from '../components/WeatherImage';

const Clima = () => {
    const [city, setCity] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
            } else {
                console.error('La geolocalización no es compatible con este navegador.');
            }
        };

        const successCallback = (position) => {
            console.log('Ubicación del usuario:', position.coords.latitude, position.coords.longitude);
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        };

        const errorCallback = (error) => {
            console.error('Error al obtener la ubicación:', error);
        };

        getLocation();
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            const apiKey = '9169f93ced248be4d821292aaa11022f'; // Reemplaza 'TU_API_KEY' con tu propia clave API de OpenWeatherMap
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Datos de la ciudad:', data);
                    setCity(data.name);
                })
                .catch(error => console.error('Error fetching city data:', error));
        }
    }, [latitude, longitude]);

    // console.log('Ciudad:', city);

    return (
        <div>
            {city && <WeatherImage city={city} />}
        </div>
    );
};

export default Clima;
