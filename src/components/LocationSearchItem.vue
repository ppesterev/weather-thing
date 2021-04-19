<template>
  <div class="search-result" draggable @dragstart="$emit('drag-search-result')">
    <h3 class="search-result__title">{{ searchResult.location.title }}</h3>
    <span class="search-result__position">{{
      searchResult.distance
        ? `${Math.floor(searchResult.distance / 1000)} km`
        : this.getCoordinateString()
    }}</span>
    <button @click="$emit('track-location', searchResult.location)">
      Track
    </button>
  </div>
</template>

<script>
export default {
  props: {
    searchResult: Object
  },

  methods: {
    getCoordinateString() {
      if (!this.searchResult) {
        return;
      }

      const { latt, long } = this.searchResult.location.coords;

      const NS = latt > 0 ? "N" : "S";
      const EW = long > 0 ? "E" : "W";
      const fixedLatt = Math.abs(latt).toFixed(2);
      const fixedLong = Math.abs(long).toFixed(2);
      return `${fixedLatt} ${NS}, ${fixedLong} ${EW}`;
    }
  }
};
</script>

<style scoped>
.search-result {
  position: relative;
  padding: 5px;

  background-color: rgba(255, 255, 255, 0.808);
  box-shadow: inset 0 5px 10px -8px slategrey;
  cursor: grab;
}

.search-result:hover {
  box-shadow: inset 0 4px 10px -9px slategrey;
}

.search-result:active {
  box-shadow: inset 0 3px 12px -10px slategrey;
  left: 1px;
}

.search-result__title {
  margin: 0 0 5px 0;

  font-size: 1em;
}

.search-result__position {
  font-size: 0.8rem;
  font-style: italic;
  color: grey;
}
</style>
