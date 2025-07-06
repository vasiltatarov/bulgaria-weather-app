import { useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import LocationSelector from './components/LocationSelector'
import WeatherCard from './components/WeatherCard'
import type { Location, WeatherData } from './types'

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Mock weather data for demonstration
  const mockWeatherData: WeatherData = {
    location: selectedLocation?.name || 'Пловдив',
    temperature: 36,
    conditions: 'Незначителна облачност',
    humidity: 24,
    pressure: 1012,
    windSpeed: 2
  };
  
  // Mock forecast data
  const mockForecast: WeatherData[] = [
    { location: '', temperature: 36, conditions: 'облачно', time: '16' },
    { location: '', temperature: 37, conditions: 'облачно', time: '17' },
    { location: '', temperature: 34, conditions: 'облачно', time: '18' },
    { location: '', temperature: 34, conditions: 'облачно', time: '19' },
    { location: '', temperature: 34, conditions: 'облачно', time: '20' },
    { location: '', temperature: 33, conditions: 'слънчево', time: '21' }
  ];

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    // In future steps, we'll use this location to fetch weather data
  };

  return (
    <Layout>
      <LocationSelector onLocationSelect={handleLocationSelect} />
      {selectedLocation ? (
        <WeatherCard 
          currentWeather={{...mockWeatherData, location: selectedLocation.name}}
          forecast={mockForecast}
        />
      ) : (
        <WeatherCard 
          currentWeather={mockWeatherData}
          forecast={mockForecast}
        />
      )}
    </Layout>
  )
}

export default App
