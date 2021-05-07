<template>
  <div class="map-container">
    <div id="leaflet-map"></div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
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
  data() {
    return { leafletMap: null };
  },

  computed: {
    ...mapState({
      trackedLocations: (state) => state.trackedLocations
    }),

    markers: function() {
      return this.trackedLocations.map((tracked) => {
        const { latt, long } = tracked.coords;
        const marker = L.marker([latt, long], {
          title: tracked.title
        });
        marker.on("click", () => {
          this.viewLocation({ woeid: tracked.woeid });
        });
        return marker;
      });
    }
  },

  methods: {
    ...mapActions(["search"]),

    ...mapMutations(["viewLocation"]),

    fitMapToMarkers() {
      if (!this.trackedLocations || this.trackedLocations.length === 0) {
        this.leafletMap.setView([10, 10], 2);
        return;
      }

      const latitudes = this.trackedLocations
        .map((tracked) => tracked.coords.latt)
        .sort((a, b) => a - b);
      const longitudes = this.trackedLocations
        .map((tracked) => tracked.coords.long)
        .sort((a, b) => a - b);

      const [minLatt, maxLatt] = [
        latitudes[0],
        latitudes[latitudes.length - 1]
      ];

      const [minLong, maxLong] = [
        longitudes[0],
        longitudes[longitudes.length - 1]
      ];

      this.leafletMap.fitBounds(
        [
          [minLatt, minLong],
          [maxLatt, maxLong]
        ],
        { maxZoom: 10 }
      );
    }
  },

  watch: {
    markers: {
      handler(newMarkers, oldMarkers) {
        oldMarkers.forEach((marker) => marker.remove());
        newMarkers.forEach((marker) => marker.addTo(this.leafletMap));
        this.fitMapToMarkers();
      }
    }
  },

  mounted() {
    this.leafletMap = L.map("leaflet-map", {
      center: [10, 10],
      zoom: 2,
      doubleClickZoom: false
    });
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19
      }
    ).addTo(this.leafletMap);
    this.markers.forEach((marker) => marker.addTo(this.leafletMap));
    this.fitMapToMarkers();
    this.leafletMap.on(
      "dblclick",
      function(evt) {
        const { lat, lng } = evt.latlng;
        this.search({ coords: { latt: lat, long: lng } });
      }.bind(this)
    );
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
  box-shadow: inset 10px 0 15px -15px rgb(20, 39, 63);
}

#leaflet-map {
  min-height: 500px;
  z-index: -5;
}
</style>
