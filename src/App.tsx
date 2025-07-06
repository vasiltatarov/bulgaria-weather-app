import { useState, useEffect } from 'react'
import './App.css'
import Layout from './components/Layout'
import LocationSelector from './components/LocationSelector'
import WeatherCard from './components/WeatherCard'
import type { Location, WeatherData } from './types'
import { fetchWeatherData, getMockWeatherData } from './utils/weatherService'

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<{
    currentWeather: WeatherData;
    forecast: WeatherData[];
  }>({
    currentWeather: {
      location: 'София',
      temperature: 28,
      conditions: 'Слънчево',
      humidity: 45,
      pressure: 1013,
      windSpeed: 3
    },
    forecast: []
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load default weather data on first render
  useEffect(() => {
    const defaultLocation: Location = {
      id: 'sofia',
      name: 'Sofia',
    };
    
    handleLocationSelect(defaultLocation);
  }, []);
  
  const handleLocationSelect = async (location: Location) => {
    setSelectedLocation(location);
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      console.error('Failed to fetch weather data:', err);
      setError('Failed to load weather data. Please try again later.');
      
      // Use mock data as fallback
      const mockData = getMockWeatherData(location.name);
      setWeatherData(mockData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <LocationSelector onLocationSelect={handleLocationSelect} />
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => handleLocationSelect(selectedLocation!)}>
            Try Again
          </button>
        </div>
      ) : (
        <WeatherCard 
          currentWeather={weatherData.currentWeather}
          forecast={weatherData.forecast}
        />
      )}
    </Layout>
  )
}

export default App
