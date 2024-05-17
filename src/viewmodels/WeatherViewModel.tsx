import { useState, useEffect } from 'react';
import { WeatherData } from './WeatherData';
import { fetchWeatherData } from '../services/WeatherService';

export const useWeatherViewModel = () => {
  const [cities] = useState([
    { name: 'New York', latitude: 40.71, longitude: -74.01 },
    { name: 'Dallas', latitude: 32.78, longitude: -96.81 },
    { name: 'Miami', latitude: 25.77, longitude: -80.19 },
  ]);
  const [temperatureUnit, setTemperatureUnit] = useState('metric');
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(unit => (unit === 'metric' ? 'imperial' : 'metric'));
  };

  useEffect(() => {
    fetchWeatherData(cities, temperatureUnit)
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, [cities, temperatureUnit]);

  return {
    cities,
    temperatureUnit,
    weatherData,
    toggleTemperatureUnit,
  };
};
