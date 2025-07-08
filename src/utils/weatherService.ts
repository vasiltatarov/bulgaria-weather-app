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
  dailyForecast: WeatherData[];
}> => {
  try {
    // Build API URL with query parameters
    const params = new URLSearchParams({
      place_id: location.name.toLowerCase(),
      sections: 'current,hourly,daily',
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
      cloudCover: data.current.cloud_cover, // Using cloud_cover instead of humidity
      precipitation: data.current.precipitation.total, // Using precipitation instead of pressure
    };
    
    // Process hourly forecast data (next 12 hours)
    const forecast: WeatherData[] = [];
    
    if (data.hourly && data.hourly.data.length > 0) {
      // Take only the next 12 hours
      const hourlyData = data.hourly.data.slice(0, 12);
      
      hourlyData.forEach(hour => {
        const date = new Date(hour.date);
        
        forecast.push({
          location: location.name,
          temperature: hour.temperature,
          conditions: hour.summary,
          time: date.getHours().toString().padStart(2, '0'),
          windSpeed: hour.wind.speed,
          cloudCover: hour.cloud_cover.total,
          precipitation: hour.precipitation.total
        });
      });
    }
    
    // Process daily forecast data (7 days)
    const dailyForecast: WeatherData[] = [];
    
    if (data.daily && data.daily.data.length > 0) {
      // Take up to 7 days
      const dailyData = data.daily.data.slice(0, 7);
      
      dailyData.forEach(day => {
        const date = new Date(day.day);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        dailyForecast.push({
          location: location.name,
          temperature: day.all_day.temperature,
          temperatureMin: day.all_day.temperature_min,
          temperatureMax: day.all_day.temperature_max,
          conditions: day.summary,
          date: dayName,
          cloudCover: day.all_day.cloud_cover.total,
          precipitation: day.all_day.precipitation.total,
          windSpeed: day.all_day.wind.speed
        });
      });
    }
    
    return {
      currentWeather,
      forecast,
      dailyForecast
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
    cloudCover: 0, // Updated from humidity
    precipitation: 0, // Updated from pressure
    windSpeed: 3
  };
  
  const forecast: WeatherData[] = [
    { location: locationName, temperature: 28, conditions: 'Sunny', time: '14', cloudCover: 0, precipitation: 0 },
    { location: locationName, temperature: 29, conditions: 'Sunny', time: '15', cloudCover: 0, precipitation: 0 },
    { location: locationName, temperature: 30, conditions: 'Partly Cloudy', time: '16', cloudCover: 30, precipitation: 0 },
    { location: locationName, temperature: 29, conditions: 'Partly Cloudy', time: '17', cloudCover: 40, precipitation: 0 },
    { location: locationName, temperature: 27, conditions: 'Partly Cloudy', time: '18', cloudCover: 35, precipitation: 0 },
    { location: locationName, temperature: 25, conditions: 'Clear', time: '19', cloudCover: 10, precipitation: 0 },
    { location: locationName, temperature: 23, conditions: 'Clear', time: '20', cloudCover: 5, precipitation: 0 },
    { location: locationName, temperature: 21, conditions: 'Clear', time: '21', cloudCover: 0, precipitation: 0 },
    { location: locationName, temperature: 20, conditions: 'Clear', time: '22', cloudCover: 0, precipitation: 0 },
    { location: locationName, temperature: 19, conditions: 'Clear', time: '23', cloudCover: 0, precipitation: 0 },
    { location: locationName, temperature: 18, conditions: 'Clear', time: '00', cloudCover: 0, precipitation: 0 },
    { location: locationName, temperature: 17, conditions: 'Clear', time: '01', cloudCover: 0, precipitation: 0 }
  ];
  
  const dailyForecast: WeatherData[] = [
    { location: locationName, temperature: 28, temperatureMin: 22, temperatureMax: 30, conditions: 'Sunny', date: 'Mon', cloudCover: 0, precipitation: 0 },
    { location: locationName, temperature: 27, temperatureMin: 21, temperatureMax: 29, conditions: 'Sunny', date: 'Tue', cloudCover: 10, precipitation: 0 },
    { location: locationName, temperature: 26, temperatureMin: 20, temperatureMax: 28, conditions: 'Partly Cloudy', date: 'Wed', cloudCover: 30, precipitation: 0 },
    { location: locationName, temperature: 25, temperatureMin: 19, temperatureMax: 27, conditions: 'Cloudy', date: 'Thu', cloudCover: 60, precipitation: 0 },
    { location: locationName, temperature: 24, temperatureMin: 18, temperatureMax: 26, conditions: 'Rain', date: 'Fri', cloudCover: 80, precipitation: 5 },
    { location: locationName, temperature: 23, temperatureMin: 17, temperatureMax: 25, conditions: 'Partly Cloudy', date: 'Sat', cloudCover: 40, precipitation: 0 },
    { location: locationName, temperature: 25, temperatureMin: 19, temperatureMax: 27, conditions: 'Sunny', date: 'Sun', cloudCover: 10, precipitation: 0 }
  ];
  
  return { currentWeather, forecast, dailyForecast };
}; 