import axios from "axios";

const PROXY_URL = "https://thingproxy.freeboard.io/fetch/";
const BASE_URL = "https://www.metaweather.com/api/";

const getFullUrl = (endpoint) => `${PROXY_URL}${BASE_URL}${endpoint}`;

export const searchLocation = (str) => {
  return axios
    .get(getFullUrl("location/search"), { params: { query: str } })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      return err;
    });
};
