<template>
  <div class="app">
    <div class="app__panel app__main-panel">
      <LocationSearch
        class="app__location-search"
        :distanceSearch="distanceSearchTerm"
        @track-location="onLocationTracked"
      />
      <TrackedLocationsList
        class="app__tracked-list"
        :trackedLocations="trackedLocations"
        @track-location="onLocationTracked"
        @untrack-location="onLocationUntracked"
        @expand-location="onLocationExpanded"
      />
      <WorldMap
        class="app__map"
        :trackedLocations="trackedLocations"
        @expand-location="onLocationExpanded"
        @search-by-distance="onSearchByDistance"
      />
    </div>
    <LocationDetails
      v-if="expandedLocation"
      class="app__panel app__location-details"
      :location="expandedLocation.location"
      :forecast="expandedLocation.forecast"
      :isLoading="expandedLocation.isLoading"
    />
    <footer class="app__panel app__footer">
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

    onLocationTracked(location, index) {
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
      if (index === -1) {
        this.trackedLocations = [...this.trackedLocations, newTrackedLocation];
      } else {
        const updatedLocations = this.trackedLocations.slice();
        updatedLocations.splice(index, 0, newTrackedLocation);
        this.trackedLocations = updatedLocations;
      }
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
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}

body {
  margin: 0;

  background-color: #87aad2;
  background-image: url("../img/clouds.jpg");
  background-size: cover;
}

.app {
  display: grid;
  justify-content: center;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: minmax(auto, 1400px);
  grid-template-areas:
    "main"
    "details"
    "footer";
  grid-gap: 10px;

  min-height: 100vh;
  padding: 0 10px;

  background-color: rgba(245, 245, 245, 0.7);
}

.app__panel {
  background-color: rgba(237, 243, 245, 0.7);
  box-shadow: 2px 2px 12px -5px rgb(54, 75, 119);
}

.app__main-panel {
  grid-area: main;
  display: grid;
  grid-template-columns: 2fr 2fr 5fr;
  grid-template-rows: minmax(auto, 500px);
  grid-template-areas: "search tracked map";

  border-radius: 0 0 10px 10px;
  overflow: hidden;
}

.app__map {
  grid-area: map;
  max-height: 100%;
}

.app__location-search {
  grid-area: search;
}

.app__tracked-list {
  grid-area: tracked;
}

.app__location-details {
  grid-area: details;
  align-self: flex-start;
  border-radius: 10px;
}

.app__footer {
  grid-area: footer;
  padding: 10px;

  border-radius: 10px 10px 0 0;
}
</style>
