import { nanoid } from "nanoid";
import { searchLocation, searchByDistance, getLocationDetails } from "../api";

const actions = {
  search({ commit }, { term, coords }) {
    const requestId = nanoid(6);

    commit("startSearch", { coords, requestId });
    const apiAction = coords ? searchByDistance(coords) : searchLocation(term);

    apiAction
      .then((results) => commit("finishSearch", { results, requestId }))
      .catch(() => commit("finishSearch", { results: [], requestId }));
  },

  trackLocation({ commit }, { location, index }) {
    const newTrackedLocation = { ...location, isLoading: true };
    commit("addTrackedLocation", { location: newTrackedLocation, index });

    getLocationDetails(location.woeid)
      .then(({ location, forecast }) => {
        const updatedLocation = { ...location, forecast, isLoading: false };
        commit("updateTrackedLocation", { location: updatedLocation });
      })
      .catch(() => {
        commit("updateTrackedLocation", {
          location: {
            ...newTrackedLocation,
            isLoading: false
          }
        });
      });
  }
};

export default actions;
