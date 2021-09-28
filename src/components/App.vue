<template>
  <div class="app">
    <div class="app__panel app__main-panel">
      <Toolbar class="app__toolbar" />
      <LocationSearch
        v-if="!$mq.collapseLists || isDisplayingSearch"
        class="app__location-search"
      />
      <TrackedLocationsList
        v-if="!$mq.collapseLists || !isDisplayingSearch"
        class="app__tracked-list"
      />
      <WorldMap class="app__map" v-if="!$mq.dropMap" />
    </div>

    <transition>
      <LocationDetails
        v-if="viewedLocation"
        class="app__panel app__location-details"
        :location="viewedLocation"
        :key="viewedLocation.woeid"
      />
    </transition>
    <AppFooter class="app__panel app__footer" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Toolbar from "./Toolbar.vue";
import LocationSearch from "./LocationSearch.vue";
import TrackedLocationsList from "./TrackedLocationsList.vue";
import WorldMap from "./WorldMap.vue";
import LocationDetails from "./LocationDetails.vue";
import AppFooter from "./AppFooter.vue";

import { DisplayedList } from "../const";

export default {
  name: "App",

  components: {
    Toolbar,
    LocationSearch,
    WorldMap,
    TrackedLocationsList,
    LocationDetails,
    AppFooter
  },

  computed: {
    ...mapState({
      viewedLocation: (state) => state.viewedLocation,
      isDisplayingSearch: (state) =>
        state.displayedList === DisplayedList.SEARCH
    })
  },

  methods: {
    ...mapActions(["loadTrackedLocations"])
  },

  mounted() {
    this.loadTrackedLocations();
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
  overflow-x: hidden;
}

.app__panel {
  background-color: rgba(237, 243, 245, 0.7);
  box-shadow: 2px 2px 12px -5px rgb(54, 75, 119);
}

.app__main-panel {
  grid-area: main;
  display: grid;
  grid-template-columns: 3fr 3fr 7fr;
  grid-template-rows: auto minmax(auto, 500px);
  grid-template-areas:
    "toolbar toolbar map"
    "search tracked map";

  border-radius: 0 0 10px 10px;
  overflow: hidden;
}

.app__toolbar {
  grid-area: toolbar;
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

.app__location-details.v-enter {
  transform: translateX(120%);
}

.app__location-details.v-leave-to {
  transform: translateX(-120%);
}
.app__location-details.v-enter-active,
.app__location-details.v-leave-active {
  transition: all 0.5s ease;
}

.app__footer {
  grid-area: footer;

  border-radius: 10px 10px 0 0;
}

@media (max-width: 900px) {
  .app__main-panel {
    grid-template-columns: 6fr 7fr;
    grid-template-areas:
      "toolbar map"
      "list map";
  }

  .app__location-search,
  .app__tracked-list {
    grid-area: list;
  }
}

@media (max-width: 560px) {
  .app__main-panel {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "toolbar"
      "list";
  }

  .app__location-search,
  .app__tracked-list {
    max-height: 400px;
  }
}
</style>
