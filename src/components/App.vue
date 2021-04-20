<template>
  <div class="app">
    <LocationSearch
      class="app__panel app__location-search"
      :distanceSearch="distanceSearchTerm"
      @track-location="onLocationTracked"
    />
    <TrackedLocationsList
      class="app__panel app__tracked-list"
      :trackedLocations="trackedLocations"
      @untrack-location="onLocationUntracked"
      @expand-location="onLocationExpanded"
    />
    <WorldMap
      class="app__panel app__map"
      :trackedLocations="trackedLocations"
      @expand-location="onLocationExpanded"
      @search-by-distance="onSearchByDistance"
    />
    <LocationDetails
      class="app__panel app__location-details"
      v-if="expandedLocation"
      :location="expandedLocation.location"
      :forecast="expandedLocation.forecast"
      :isLoading="expandedLocation.isLoading"
    />
    <footer class="app__footer">
      <div>&copy; ppesterev</div>
      <div>
        Weather data kindly provided by
        <a href="https://www.metaweather.com/">MetaWeather</a>
      </div>
    </footer>
  </div>
</template>

<script>
import LocationSearch from "./LocationSearch.vue";
import TrackedLocationsList from "./TrackedLocationsList.vue";
import WorldMap from "./WorldMap.vue";
import LocationDetails from "./LocationDetails.vue";

import { getLocationDetails } from "../api";

export default {
  name: "App",

  components: {
    LocationSearch,
    WorldMap,
    TrackedLocationsList,
    LocationDetails
  },

  data: () => ({
    distanceSearchTerm: null,
    trackedLocations: [],
    expandedLocation: null
  }),

  methods: {
    onSearchByDistance(coords) {
      this.distanceSearchTerm = coords;
    },

    onLocationTracked(location) {
      const id = location.woeid;
      if (
        this.trackedLocations.find((tracked) => tracked.location.woeid === id)
      ) {
        return;
      }
      const newTrackedLocation = {
        location,
        forecast: null,
        isLoading: true,
        addedOn: Date.now()
      };
      this.trackedLocations = [...this.trackedLocations, newTrackedLocation];
      this.updateTrackedLocation(newTrackedLocation);
    },

    onLocationUntracked(woeid) {
      this.trackedLocations = this.trackedLocations.filter(
        (tracked) => tracked.location.woeid !== woeid
      );
    },

    onLocationExpanded(woeid) {
      const expandedLocation = this.trackedLocations.find(
        (tracked) => tracked.location.woeid === woeid
      );
      if (expandedLocation) {
        this.expandedLocation = expandedLocation;
      }
    },

    updateTrackedLocation(tracked) {
      tracked.isLoading = true;
      getLocationDetails(tracked.location.woeid).then((details) => {
        tracked.location = details.location;
        tracked.forecast = details.forecast;
        tracked.isLoading = false;
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
  background-image: url("../img/clouds.jpg");
  background-size: cover;
}

.app {
  display: grid;
  grid-template-rows: auto 500px 1fr auto;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "search tracked"
    "map map"
    "details details"
    "footer footer";

  height: 100%;
  margin: 0 auto;

  background-color: rgba(245, 245, 245, 0.795);
}

@media (min-width: 1200px) {
  .app {
    grid-template-rows: 500px 1fr auto;
    grid-template-columns: 1fr 1fr 3fr;
    grid-template-areas:
      "search tracked map"
      "details details details"
      "footer footer footer";
  }
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
