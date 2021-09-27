<template>
  <div class="location-search">
    <SearchBar v-if="$mq.collapseLists" class="location-search__bar" />

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
import SearchBar from "./SearchBar.vue";

export default {
  components: { LocationSearchItem, SearchBar },

  computed: {
    ...mapGetters({
      results: "getUntrackedSearchResults"
    })
  }
};
</script>

<style scoped>
.location-search {
  display: grid;
  place-content: start stretch;
}

.location-search__bar {
  margin: 3px;
  border-radius: 5px;
}

.location-search__list {
  max-height: 100%;
  overflow-y: auto;
  display: grid;
  align-content: flex-start;
  grid-gap: 5px;

  margin: 0;
  padding: 5px;
  list-style: none;
}
</style>
