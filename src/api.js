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
    },
    parent: locationData.parent ? parseLocation(locationData.parent) : null
  };
};

const parseWeather = (weatherData) => ({
  id: weatherData.id,
  date: new Date(weatherData.applicable_date),
  temp: weatherData.the_temp,
  minTemp: weatherData.min_temp,
  maxTemp: weatherData.max_temp,
  weatherType: weatherData.weather_state_name,
  wind: {
    speed: weatherData.wind_speed,
    direction: weatherData.wind_direction_compass
  },
  humidity: weatherData.humidity,
  predictability: weatherData.predictability,
  icon: `https://www.metaweather.com/static/img/weather/${weatherData.weather_state_abbr}.svg`
});

export const searchLocation = (str) => {
  return axios
    .get(getFullUrl("location/search"), { params: { query: str } })
    .then((response) => response.data.map(parseLocation));
};

export const searchByDistance = (coords) => {
  return axios
    .get(getFullUrl("location/search"), {
      params: { lattlong: `${coords.latt},${coords.long}` }
    })
    .then((response) =>
      response.data.map((result) => ({
        ...parseLocation(result),
        distance: result.distance
      }))
    );
};

export const getLocationDetails = (woeid) => {
  return axios.get(getFullUrl(`location/${woeid}`)).then((response) => ({
    ...parseLocation(response.data),
    forecast: response.data.consolidated_weather
      .map(parseWeather)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }));
};
