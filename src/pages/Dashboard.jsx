import React, { useState } from 'react'
import WeatherImage from '../components/WeatherImage'

export const Dashboard = () => {
    const [city, setCity] = useState('Bogota');
    return (
        <div>
            <WeatherImage city={city} />
        </div>
    )
}
