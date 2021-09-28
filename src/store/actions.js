import { nanoid } from "nanoid";
import { searchLocation, searchByDistance, getLocationDetails } from "../api";
import { getItem, Key } from "../storage";

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
      .then((location) => {
        const updatedLocation = { ...location, isLoading: false };
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
  },

  loadTrackedLocations({ commit }) {
    const setLoadingStatus = (status) => (location) => ({
      ...location,
      isLoading: status
    });

    const trackedLocations = getItem(Key.TRACKED_LOCATIONS) || [];
    commit("setTrackedLocations", {
      locations: trackedLocations.map(setLoadingStatus(true))
    });

    Promise.all(
      trackedLocations.map((location) => getLocationDetails(location.woeid))
    )
      .then((updatedLocations) =>
        commit("setTrackedLocations", {
          locations: updatedLocations.map(setLoadingStatus(false))
        })
      )
      .catch(() =>
        commit("setTrackedLocations", {
          locations: trackedLocations.map(setLoadingStatus(false))
        })
      );
  },

  loadTempScale({ commit }) {
    const tempScale = getItem(Key.TEMP_SCALE);
    if (!tempScale) {
      return;
    }
    commit("setTempScale", { tempScale });
  }
};

export default actions;
