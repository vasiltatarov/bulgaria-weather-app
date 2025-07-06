import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from './constants';
import type { Location, WeatherApiResponse, WeatherData } from '../types';

/**
 * Fetch weather data for a specific location
 * @param location The location to fetch weather for
 * @returns Processed weather data
 */
export const fetchWeatherData = async (location: Location): Promise<{
  currentWeather: WeatherData;
  forecast: WeatherData[];
}> => {
  try {
    // Build API URL with query parameters
    const params = new URLSearchParams({
      place_id: location.name.toLowerCase(),
      sections: 'current,hourly',
      timezone: 'auto',
      language: 'en',
      units: 'metric',
      key: WEATHER_API_KEY
    });
    
    const response = await fetch(`${WEATHER_API_BASE_URL}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data: WeatherApiResponse = await response.json();
    
    // Process current weather data
    const currentWeather: WeatherData = {
      location: location.name,
      temperature: data.current.temperature,
      conditions: data.current.summary,
      windSpeed: data.current.wind.speed,
      humidity: 0, // Not directly provided in the API, would need another source
      pressure: 0, // Not directly provided in the API, would need another source
    };
    
    // Process hourly forecast data (next 6 hours)
    const forecast: WeatherData[] = [];
    
    if (data.hourly && data.hourly.data.length > 0) {
      // Take only the next 6 hours
      const hourlyData = data.hourly.data.slice(0, 6);
      
      hourlyData.forEach(hour => {
        const date = new Date(hour.date);
        
        forecast.push({
          location: location.name,
          temperature: hour.temperature,
          conditions: hour.summary,
          time: date.getHours().toString().padStart(2, '0'),
          windSpeed: hour.wind.speed
        });
      });
    }
    
    return {
      currentWeather,
      forecast
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    
    // Return mock data in case of error
    return getMockWeatherData(location.name);
  }
};

/**
 * Get mock weather data for testing or when API fails
 * @param locationName The location name
 * @returns Mock weather data
 */
export const getMockWeatherData = (locationName: string) => {
  const currentWeather: WeatherData = {
    location: locationName,
    temperature: 28,
    conditions: 'Sunny',
    humidity: 45,
    pressure: 1013,
    windSpeed: 3
  };
  
  const forecast: WeatherData[] = [
    { location: locationName, temperature: 28, conditions: 'Sunny', time: '14' },
    { location: locationName, temperature: 29, conditions: 'Sunny', time: '15' },
    { location: locationName, temperature: 30, conditions: 'Partly Cloudy', time: '16' },
    { location: locationName, temperature: 29, conditions: 'Partly Cloudy', time: '17' },
    { location: locationName, temperature: 27, conditions: 'Partly Cloudy', time: '18' },
    { location: locationName, temperature: 25, conditions: 'Clear', time: '19' }
  ];
  
  return { currentWeather, forecast };
}; 