<template>
  <div class="search-result">
    <h3 class="search-result__title">{{ searchResult.title }}</h3>
    <span class="search-result__position">{{
      this.getCoordinateString()
    }}</span>
    <button @click="$emit('track-location', searchResult.woeid)">
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

      const { latt, long } = this.searchResult.coords;

      const NS = latt > 0 ? "N" : "S";
      const EW = long > 0 ? "E" : "W";
      return `${Math.abs(latt).toFixed(2)} ${NS}, \
${Math.abs(long).toFixed(2)} ${EW}`;
    }
  }
};
</script>

<style scoped>
.search-result {
  padding: 5px;

  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.2);
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
