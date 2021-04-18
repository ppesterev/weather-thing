<template>
  <div class="map-container">
    <div id="leaflet-map"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// this is entirely leaflet's fault
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

export default {
  props: {
    trackedLocations: Array
  },

  data() {
    return { leafletMap: null };
  },

  computed: {
    markers: function() {
      return this.trackedLocations.map((tracked) => {
        const { latt, long } = tracked.location.coords;
        const marker = L.marker([latt, long], {
          title: tracked.location.title
        });
        marker.on("click", () => console.log(tracked.location.title));
        return marker;
      });
    }
  },

  watch: {
    markers: {
      handler(newMarkers, oldMarkers) {
        oldMarkers.forEach((marker) => marker.remove());
        newMarkers.forEach((marker) => marker.addTo(this.leafletMap));
      }
    }
  },

  mounted() {
    this.leafletMap = L.map("leaflet-map", { center: [0, 0], zoom: 2 });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
      foo: "bar",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.leafletMap);
    this.markers.forEach((marker) => marker.addTo(this.leafletMap));
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
