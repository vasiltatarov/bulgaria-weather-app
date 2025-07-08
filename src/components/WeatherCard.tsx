import React from 'react';
import type { WeatherData } from '../types';
import { WEATHER_ICONS, CONDITION_TO_ICON } from '../utils/constants';

interface WeatherCardProps {
  currentWeather: WeatherData;
  forecast?: WeatherData[];
  dailyForecast?: WeatherData[];
}

// Helper function to get the appropriate icon based on weather conditions
const getWeatherIcon = (conditions: string): string => {
  const conditionLower = conditions.toLowerCase();
  
  // Check if any of the condition keys match the current conditions
  for (const [key, value] of Object.entries(CONDITION_TO_ICON)) {
    if (conditionLower.includes(key.toLowerCase())) {
      return WEATHER_ICONS[value as keyof typeof WEATHER_ICONS];
    }
  }
  
  // Default icon if no match is found
  return WEATHER_ICONS.default;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ currentWeather, forecast, dailyForecast }) => {
  return (
    <>
      <div className="weather-card fade-in">
        <div className="weather-card-header">
          <h2 className="location-name">{currentWeather.location}</h2>
          <div className="weather-date-time">
            {new Date().toLocaleString('bg-BG', { 
              hour: '2-digit', 
              minute: '2-digit',
              day: '2-digit',
              month: 'long'
            })}
          </div>
        </div>
        
        <div className="current-weather">
          <div className="weather-icon-temp">
            <div className="weather-icon">
              <img 
                src={getWeatherIcon(currentWeather.conditions)} 
                alt={currentWeather.conditions}
                className="weather-icon-img"
              />
            </div>
            <div className="temperature">
              <span className="temp-value">{Math.round(currentWeather.temperature)}</span>
              <span className="temp-unit">°C</span>
            </div>
          </div>
          <div className="weather-description">
            <p>{currentWeather.conditions}</p>
          </div>
        </div>

        {forecast && forecast.length > 0 && (
          <div className="forecast-section">
            <h3>Почасова прогноза</h3>
            <div className="forecast-items">
              {forecast.map((item, index) => (
                <div key={index} className="forecast-item slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="forecast-time">{item.time}</div>
                  <div className="forecast-icon">
                    <img 
                      src={getWeatherIcon(item.conditions)} 
                      alt={item.conditions}
                      className="forecast-icon-img"
                    />
                  </div>
                  <div className="forecast-temp">{Math.round(item.temperature)}°C</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Облачност:</span>
            <span className="detail-value">{currentWeather.cloudCover || '0'}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Валежи:</span>
            <span className="detail-value">{currentWeather.precipitation || '0'} мм</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Вятър:</span>
            <span className="detail-value">{currentWeather.windSpeed || '2'} м/с</span>
          </div>
        </div>
      </div>

      {dailyForecast && dailyForecast.length > 0 && (
        <div className="weather-card weekly-forecast-card fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="weather-card-header">
            <h2 className="section-title">7-дневна прогноза</h2>
          </div>
          <div className="daily-forecast-items">
            {dailyForecast.map((item, index) => (
              <div key={index} className="daily-forecast-item slide-in" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <div className="forecast-day">{item.date}</div>
                <div className="forecast-icon">
                  <img 
                    src={getWeatherIcon(item.conditions)} 
                    alt={item.conditions}
                    className="forecast-icon-img small"
                  />
                </div>
                <div className="forecast-temp-range">
                  <span className="temp-max">{Math.round(item.temperatureMax || item.temperature)}°</span>
                  <span className="temp-min">{Math.round(item.temperatureMin || (item.temperature - 5))}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherCard; 