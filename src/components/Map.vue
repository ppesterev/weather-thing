<template>
  <div class="map-container">
    <div id="leaflet-map"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
export default {
  mounted() {
    this.leafletMap = L.map("leaflet-map", { center: [55, 83], zoom: 10 });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
      foo: "bar",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.leafletMap);
  },

  data() {
    return { leafletMap: null };
  }
};
</script>

<style scoped>
.map-container {
  display: grid;
  position: relative;
  z-index: 0;
  overflow: hidden;
}

.map-container::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  pointer-events: none;
  box-shadow: inset 2px 2px 3px 0 rgba(0, 0, 0, 0.2),
    inset -2px -2px 3px 0 rgba(255, 255, 255, 0.6);
}

#leaflet-map {
  z-index: -5;
}
</style>
