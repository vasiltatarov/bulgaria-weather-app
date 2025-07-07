// Location types
export interface Location {
  id: string;
  name: string;
  region?: string;
  isFavorite?: boolean;
}

// Weather API response types based on Meteosource API
export interface WeatherApiResponse {
  lat: string;
  lon: string;
  elevation: number;
  timezone: string;
  units: string;
  current: CurrentWeather;
  hourly?: {
    data: HourlyForecast[];
  };
  daily?: {
    data: DailyForecast[];
  };
}

export interface CurrentWeather {
  icon: string;
  icon_num: number;
  summary: string;
  temperature: number;
  wind: {
    speed: number;
    angle: number;
    dir: string;
  };
  precipitation: {
    total: number;
    type: string;
  };
  cloud_cover: number;
}

export interface HourlyForecast {
  date: string;
  weather: string;
  icon: number;
  summary: string;
  temperature: number;
  wind: {
    speed: number;
    dir: string;
    angle: number;
  };
  cloud_cover: {
    total: number;
  };
  precipitation: {
    total: number;
    type: string;
  };
}

export interface DailyForecast {
  day: string;
  weather: string;
  icon: number;
  summary: string;
  all_day: {
    weather: string;
    icon: number;
    temperature: number;
    temperature_min: number;
    temperature_max: number;
    wind: {
      speed: number;
      dir: string;
      angle: number;
    };
    cloud_cover: {
      total: number;
    };
    precipitation: {
      total: number;
      type: string;
    };
  };
  morning: any | null;
  afternoon: any | null;
  evening: any | null;
}

// Weather types for our application's use
export interface WeatherData {
  location: string;
  temperature: number;
  conditions: string;
  cloudCover?: number;
  precipitation?: number;
  windSpeed?: number;
  time?: string;
  date?: string;
}

// User preferences
export interface UserPreferences {
  units: 'metric' | 'imperial';
  language: string;
  theme: 'light' | 'dark';
} 