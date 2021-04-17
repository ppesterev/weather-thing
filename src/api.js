import axios from "axios";

const PROXY_URL = "https://thingproxy.freeboard.io/fetch/";
const BASE_URL = "https://www.metaweather.com/api/";

const getFullUrl = (endpoint) => `${PROXY_URL}${BASE_URL}${endpoint}`;

export const searchLocation = (str) => {
  return axios
    .get(getFullUrl("location/search"), { params: { query: str } })
    .then((response) =>
      response.data.map((result) => ({
        title: result.title,
        woeid: result.woeid,
        coords: {
          latt: parseFloat(result.latt_long.split(",")[0]),
          long: parseFloat(result.latt_long.split(",")[1])
        }
      }))
    );
};

export const getLocationDetails = (woeid) => {
  return axios.get(getFullUrl(`location/${woeid}`)).then((response) => ({
    location: {
      woeid,
      title: response.data.title,
      coords: {
        latt: parseFloat(response.data.latt_long.split(",")[0]),
        long: parseFloat(response.data.latt_long.split(",")[1])
      }
    },
    weather: response.data.consolidated_weather.map((weatherDay) => ({
      date: new Date(weatherDay.applicable_date),
      temp: weatherDay.the_temp,
      weatherType: weatherDay.weather_state_name,
      icon: `${BASE_URL}static/img/weather/${weatherDay.weather_state_abbr}.svg`
    }))
  }));
};
