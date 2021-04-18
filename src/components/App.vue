<template>
  <div class="app">
    <LocationSearch
      class="app__panel app__location-search"
      v-on:track-location="onLocationTracked"
    />
    <TrackedLocationsList
      class="app__panel app__tracked-list"
      :trackedLocations="trackedLocations"
    />
    <Map class="app__panel app__map" :trackedLocations="trackedLocations" />
    <div class="app__panel app__location-details"></div>
    <footer class="app__footer">&copy; ppesterev</footer>
  </div>
</template>

<script>
import LocationSearch from "./LocationSearch.vue";
import TrackedLocationsList from "./TrackedLocationsList.vue";
import Map from "./Map.vue";

import { getLocationDetails } from "../api";

export default {
  name: "App",
  components: { LocationSearch, Map, TrackedLocationsList },
  data: () => ({
    trackedLocations: []
  }),
  methods: {
    onLocationTracked(location) {
      const newTrackedLocation = { location, forecast: null, isLoading: true };
      this.trackedLocations.push(newTrackedLocation);
      getLocationDetails(location.woeid).then((details) => {
        newTrackedLocation.forecast = details.forecast;
        newTrackedLocation.isLoading = false;
      });
    }
  }
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  font-family: "Segoe UI", Verdana, sans-serif;
}

body {
  margin: 0;
  height: 100vh;
  background-color: whitesmoke;
}

.app {
  display: grid;
  grid-template-rows: 5fr 2fr auto;
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-areas:
    "search tracked map"
    "details details details"
    "footer footer footer";
  grid-gap: 10px;

  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 10px;

  background-color: whitesmoke;
}

.app__panel {
  background-color: whitesmoke;
  border-radius: 5px;
  box-shadow: inset 2px 2px 3px -1px rgba(0, 0, 0, 0.2),
    inset -2px -2px 3px -1px rgba(255, 255, 255, 0.6);
}

.app__map {
  grid-area: map;
}

.app__location-search {
  grid-area: search;
}

.app__tracked-list {
  grid-area: tracked;
}

.app__location-details {
  grid-area: details;
}

.app__footer {
  grid-area: footer;
}
</style>
