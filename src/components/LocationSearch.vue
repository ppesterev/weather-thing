<template>
  <div class="location-search">
    <div class="location-search__bar">
      <input
        class="location-search__field"
        type="search"
        :value="searchFieldText"
        @input="onSearchTermChanged($event.target.value)"
      />
      <span v-if="this.isTyping">Typing...</span>
      <span v-else-if="this.isFetching">Fetching...</span>
    </div>
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
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";

import { coordsToString, debounce } from "../utils";

import LocationSearchItem from "./LocationSearchItem.vue";

const SEARCH_INPUT_DELAY = 600;

export default {
  components: { LocationSearchItem },

  data: () => ({
    searchFieldText: "",
    isTyping: false
  }),

  computed: {
    ...mapGetters({
      results: "getUntrackedSearchResults"
    }),

    ...mapState({
      isFetching: (state) => state.search.isLoading,
      distanceSearchOrigin: (state) => state.search.distanceSearchOrigin
    })
  },

  methods: {
    ...mapMutations(["cancelSearch"]),
    ...mapActions(["search", "distanceSearch"]),

    requestSearch: debounce(function(term) {
      this.isTyping = false;
      this.search({ term });
    }, SEARCH_INPUT_DELAY),

    onSearchTermChanged(term) {
      this.searchFieldText = term;
      if (!term) {
        this.isTyping = false;
        return;
      }
      this.isTyping = true;
      this.cancelSearch();
      this.requestSearch(term);
    }
  },

  watch: {
    distanceSearchOrigin: function(newCoords) {
      this.searchFieldText = coordsToString(newCoords);
    }
  }
};
</script>

<style scoped>
.location-search {
  overflow: hidden;
}

.location-search__bar {
  background-color: rgb(173, 207, 235);
  height: 40px;
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
