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
          lat: parseFloat(result.latt_long.split(",")[0]),
          long: parseFloat(result.latt_long.split(",")[1])
        }
      }))
    );
};
