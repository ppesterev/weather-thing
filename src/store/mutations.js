const mutations = {
  startSearch(state) {
    state.search.isLoading = true;
  },

  startDistanceSearch(state, { coords }) {
    state.search.isLoading = true;
    state.search.distanceSearchOrigin = coords;
  },

  finishSearch(state, { results }) {
    state.search.isLoading = false;
    state.search.results = results;
  },

  addTrackedLocation(state, { location, index }) {
    const isTracked = state.trackedLocations.find(
      (tracked) => tracked.woeid === location.woeid
    );
    if (isTracked) {
      return;
    }
    state.trackedLocations.splice(index, 0, location);
  },

  removeTrackedLocation(state, { woeid }) {
    state.trackedLocations = state.trackedLocations.filter(
      (tracked) => tracked.woeid === woeid
    );
  },

  viewLocation(state, { woeid }) {
    state.viewedLocation =
      (woeid &&
        state.trackedLocations.find((tracked) => tracked.woeid === woeid)) ||
      null;
  }
};

export default mutations;
