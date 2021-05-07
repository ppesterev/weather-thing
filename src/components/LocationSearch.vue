<template>
  <div class="location-search">
    <ul class="location-search__list">
      <li
        class="location-search__item"
        v-for="result in this.results"
        :key="result.woeid"
      >
        <LocationSearchItem :searchResult="result" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LocationSearchItem from "./LocationSearchItem.vue";

export default {
  components: { LocationSearchItem },

  computed: {
    ...mapGetters({
      results: "getUntrackedSearchResults"
    })
  }
};
</script>

<style scoped>
.location-search {
  overflow-y: auto;
}

.location-search__list {
  display: grid;
  align-content: flex-start;
  grid-gap: 5px;

  margin: 0;
  padding: 5px;
  list-style: none;
}
</style>
