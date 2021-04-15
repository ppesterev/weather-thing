<template>
  <div class="app">
    <LocationSearch
      class="app__panel app__location-search"
      v-on:track-location="onLocationTracked"
    />
    <div class="app__panel app__tracked-list"></div>
    <Map class="app__panel app__map" />
    <div class="app__panel app__location-details"></div>
    <footer class="app__footer">&copy; ppesterev</footer>
  </div>
</template>

<script>
import LocationSearch from "./LocationSearch.vue";
import Map from "./Map.vue";

export default {
  name: "App",
  components: { LocationSearch, Map },
  data: () => ({}),
  methods: {
    onLocationTracked(woeid) {
      console.log(`${woeid} added to tracked locations`);
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

  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 10px;
}

.app__panel {
  background-color: hsl(180, 10%, 95%);
  border-radius: 5px;
  box-shadow: inset 2px 2px 3px 0 rgba(0, 0, 0, 0.2),
    inset -2px -2px 3px 0 rgba(255, 255, 255, 0.6);
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
