<template>
  <div class="search-result" draggable @dragstart="onDragged">
    <h3 class="search-result__title">{{ searchResult.location.title }}</h3>
    <span class="search-result__position">{{
      searchResult.distance
        ? `${Math.floor(searchResult.distance / 1000)} km`
        : this.coordinateString
    }}</span>
    <button @click="$emit('track-location', searchResult.location)">
      Track
    </button>
  </div>
</template>

<script>
import { coordsToString } from "../utils";

export default {
  props: {
    searchResult: Object
  },

  computed: {
    coordinateString() {
      return coordsToString(this.searchResult.location.coords);
    }
  },

  methods: {
    onDragged(evt) {
      evt.dataTransfer.setData(
        "application/json",
        JSON.stringify(this.searchResult)
      );
    }
  }
};
</script>

<style scoped>
.search-result {
  position: relative;
  padding: 5px;

  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  cursor: grab;
}

.search-result:hover {
  color: white;
  background-color: rgba(70, 131, 180, 0.8);
}

.search-result:active {
  box-shadow: 0 3px 12px -5px slategrey;
  top: -2px;
  left: -1px;
}

.search-result__title {
  margin: 0 0 5px 0;

  font-size: 1em;
}

.search-result__position {
  font-size: 0.9rem;
  /* font-style: italic; */
  color: grey;
}

.search-result:hover .search-result__position {
  color: white;
}
</style>
