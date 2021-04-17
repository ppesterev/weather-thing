import axios from "axios";

const PROXY_URL = "https://thingproxy.freeboard.io/fetch/";
const BASE_URL = "https://www.metaweather.com/api/";

const getFullUrl = (endpoint) => `${PROXY_URL}${BASE_URL}${endpoint}`;

const parseLocation = (locationData) => {
  const { title, woeid, latt_long } = locationData;
  const [latt, long] = latt_long.split(",");
  return {
    title,
    woeid,
    coords: {
      latt: parseFloat(latt),
      long: parseFloat(long)
    }
  };
};

const parseWeather = (weatherData) => ({
  date: new Date(weatherData.applicable_date),
  temp: weatherData.the_temp,
  weatherType: weatherData.weather_state_name,
  icon: `https://www.metaweather.com/static/img/weather/${weatherData.weather_state_abbr}.svg`
});

export const searchLocation = (str) => {
  return axios
    .get(getFullUrl("location/search"), { params: { query: str } })
    .then((response) => response.data.map(parseLocation));
};

export const getLocationDetails = (woeid) => {
  return axios.get(getFullUrl(`location/${woeid}`)).then((response) => ({
    ...parseLocation(response.data),
    forecast: response.data.consolidated_weather
      .map(parseWeather)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }));
};
