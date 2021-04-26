import { searchLocation, searchByDistance, getLocationDetails } from "../api";

const actions = {
  search({ commit }, { term }) {
    commit("startSearch");
    searchLocation(term)
      .then((results) => commit("finishSearch", { results }))
      .catch(() => commit("finishSearch", { results: [] }));
  },

  distanceSearch({ commit }, { coords }) {
    commit("startDistanceSearch", { coords });
    searchByDistance(coords)
      .then((results) => commit("finishSearch", { results }))
      .catch(() => commit("finishSearch", { results: [] }));
  },

  trackLocation({ commit }, { location, index }) {
    const newTrackedLocation = { ...location, isLoading: true };
    commit("addTrackedLocation", { newTrackedLocation, index });

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
