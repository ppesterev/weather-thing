const mutations = {
  startSearch(state) {
    state.search.isLoading = true;
  },

  startDistanceSearch(state, { coords }) {
    state.search.isLoading = true;
    state.search.distanceSearchOrigin = coords;
  },

  cancelSearch(state) {
    if (state.search.isLoading) {
      state.search.isCancelled = true;
    }
  },

  finishSearch(state, { results }) {
    if (!state.search.isCancelled) {
      state.search.results = results;
    }
    state.search.isLoading = false;
    state.search.isCancelled = false;
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

  updateTrackedLocation(state, { location }) {
    const index = state.trackedLocations.findIndex(
      (tracked) => tracked.woeid === location.woeid
    );
    if (index === -1) {
      return;
    }
    state.trackedLocations[index] = location;
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
