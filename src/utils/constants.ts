// App information
export const APP_NAME = 'Bulgaria Weather App';
export const APP_VERSION = '0.1.0';

// API configuration
export const WEATHER_API_BASE_URL = 'https://www.meteosource.com/api/v1/free/point';
export const WEATHER_API_KEY = '2ngddry55ncpfh0z2f26cuod45gj2dbjacpe8a7l'; // Replace with your actual API key

// Weather icon mappings
export const WEATHER_ICONS = {
  sunny: 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png',
  cloudy: 'https://cdn-icons-png.flaticon.com/512/414/414927.png',
  partly_cloudy: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
  rainy: 'https://cdn-icons-png.flaticon.com/512/3351/3351979.png',
  stormy: 'https://cdn-icons-png.flaticon.com/512/1959/1959338.png',
  snowy: 'https://cdn-icons-png.flaticon.com/512/642/642000.png',
  foggy: 'https://cdn-icons-png.flaticon.com/512/4005/4005901.png',
  default: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png'
};

// Weather condition to icon mapping
export const CONDITION_TO_ICON = {
  'sunny': 'sunny',
  'clear': 'sunny',
  'ясно': 'sunny',
  'слънчево': 'sunny',
  'cloudy': 'cloudy',
  'облачно': 'cloudy',
  'partly cloudy': 'partly_cloudy',
  'частично облачно': 'partly_cloudy',
  'rain': 'rainy',
  'дъжд': 'rainy',
  'thunderstorm': 'stormy',
  'гръмотевична буря': 'stormy',
  'snow': 'snowy',
  'сняг': 'snowy',
  'fog': 'foggy',
  'мъгла': 'foggy'
};

// Major cities in Bulgaria
export const MAJOR_CITIES = [
  'Sofia',
  'Plovdiv',
  'Varna',
  'Burgas',
  'Ruse',
  'Stara Zagora',
  'Pleven',
  'Sliven',
  'Dobrich',
  'Shumen'
];

// Regions in Bulgaria
export const REGIONS = [
  'Plovdiv',
  'Varna',
  'Burgas',
  'Ruse',
  'Stara Zagora',
  'Pleven',
  'Sliven',
  'Dobrich',
  'Shumen',
  'Blagoevgrad',
  'Veliko Tarnovo',
  'Vidin',
  'Vratsa',
  'Gabrovo',
  'Kardzhali',
  'Kyustendil',
  'Lovech',
  'Montana',
  'Pazardzhik',
  'Pernik',
  'Razgrad',
  'Silistra',
  'Smolyan',
  'Targovishte',
  'Haskovo',
  'Borovets',
  'Bansko',
  'Karlovo'
]; 