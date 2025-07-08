import React from 'react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  currentWeather: WeatherData;
  forecast?: WeatherData[];
  dailyForecast?: WeatherData[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ currentWeather, forecast, dailyForecast }) => {
  return (
    <>
      <div className="weather-card">
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
              {/* Weather icon based on conditions */}
              {currentWeather.conditions.includes('слънч') || currentWeather.conditions.includes('ясно') || 
               currentWeather.conditions.toLowerCase().includes('sunny') || currentWeather.conditions.toLowerCase().includes('clear') ? (
                <span className="icon sunny">☀️</span>
              ) : currentWeather.conditions.includes('облач') || currentWeather.conditions.toLowerCase().includes('cloud') ? (
                <span className="icon cloudy">⛅</span>
              ) : currentWeather.conditions.includes('дъжд') || currentWeather.conditions.toLowerCase().includes('rain') ? (
                <span className="icon rainy">🌧️</span>
              ) : (
                <span className="icon">⛅</span>
              )}
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
                <div key={index} className="forecast-item">
                  <div className="forecast-time">{item.time}</div>
                  <div className="forecast-icon">
                    {item.conditions.includes('слънч') || item.conditions.includes('ясно') || 
                     item.conditions.toLowerCase().includes('sunny') || item.conditions.toLowerCase().includes('clear') ? (
                      <span className="icon small sunny">☀️</span>
                    ) : item.conditions.includes('облач') || item.conditions.toLowerCase().includes('cloud') ? (
                      <span className="icon small cloudy">⛅</span>
                    ) : item.conditions.includes('дъжд') || item.conditions.toLowerCase().includes('rain') ? (
                      <span className="icon small rainy">🌧️</span>
                    ) : (
                      <span className="icon small">⛅</span>
                    )}
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
        <div className="weather-card weekly-forecast-card">
          <div className="weather-card-header">
            <h2 className="section-title">7-дневна прогноза</h2>
          </div>
          <div className="daily-forecast-items">
            {dailyForecast.map((item, index) => (
              <div key={index} className="daily-forecast-item">
                <div className="forecast-day">{item.date}</div>
                <div className="forecast-icon">
                  {item.conditions.includes('слънч') || item.conditions.includes('ясно') || 
                   item.conditions.toLowerCase().includes('sunny') || item.conditions.toLowerCase().includes('clear') ? (
                    <span className="icon small sunny">☀️</span>
                  ) : item.conditions.includes('облач') || item.conditions.toLowerCase().includes('cloud') ? (
                    <span className="icon small cloudy">⛅</span>
                  ) : item.conditions.includes('дъжд') || item.conditions.toLowerCase().includes('rain') ? (
                    <span className="icon small rainy">🌧️</span>
                  ) : (
                    <span className="icon small">⛅</span>
                  )}
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