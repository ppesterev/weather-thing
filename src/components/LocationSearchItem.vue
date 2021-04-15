<template>
  <div class="search-result">
    <h3 class="search-result__title">{{ this.searchResult.title }}</h3>
    <span class="search-result__position">{{
      this.getCoordinateString()
    }}</span>
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
      return `${latt.toFixed(2)}${NS}, ${long.toFixed(2)}${EW}`;
    }
  }
};
</script>

<style scoped></style>
