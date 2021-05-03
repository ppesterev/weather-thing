<template>
  <div class="location-search">
    <div class="location-search__bar">
      <input
        class="location-search__field"
        type="search"
        :value="searchFieldText"
        @input="onSearchTermChanged($event.target.value)"
      />
      <SearchIcon size="1x" class="location-search__search-icon" />
      <SearchStatusIndicator :isLoading="isFetching" :isTyping="isTyping" />
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

import { SearchIcon } from "vue-feather-icons";

import LocationSearchItem from "./LocationSearchItem.vue";
import SearchStatusIndicator from "./SearchStatusIndicator";

const SEARCH_INPUT_DELAY = 600;

export default {
  components: { LocationSearchItem, SearchStatusIndicator, SearchIcon },

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
  position: relative;
  display: grid;
  grid-template-columns: 1fr 40px;
  place-items: center;
  padding: 5px;

  color: white;

  background-color: steelblue;
}

.location-search__field {
  padding: 5px 8px 5px 24px;

  font: inherit;
  color: inherit;

  background-color: rgb(34, 65, 90);
  border: none;
  border-radius: 5px;
  outline: none;
}

.location-search__search-icon {
  position: absolute;
  left: 10px;
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
