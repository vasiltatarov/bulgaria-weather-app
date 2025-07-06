// Location types
export interface Location {
  id: string;
  name: string;
  region?: string;
  isFavorite?: boolean;
}

// Weather types - to be expanded in future steps
export interface WeatherData {
  location: string;
  temperature: number;
  conditions: string;
  humidity?: number;
  pressure?: number;
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