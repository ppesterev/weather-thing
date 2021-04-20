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
        v-for="result in this.searchResults"
        :key="result.woeid"
      >
        <LocationSearchItem
          :searchResult="result"
          @track-location="$emit('track-location', $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { debounce } from "../utils";
import { searchLocation, searchByDistance } from "../api";

import LocationSearchItem from "./LocationSearchItem.vue";

const SEARCH_INPUT_DELAY = 600;

export default {
  components: { LocationSearchItem },

  props: {
    distanceSearch: Object
  },

  data: () => ({
    searchFieldText: "",
    isTyping: false,
    isFetching: false,
    searchWillBeDiscarded: false,
    searchResults: null
  }),

  watch: {
    distanceSearch: function({ latt, long }) {
      this.searchFieldText = `${latt}, ${long}`;
      this.requestSearch({ latt, long });
    }
  },

  methods: {
    requestSearch: debounce(function(term) {
      this.isTyping = false;
      this.isFetching = true;
      this.searchResults = null;

      let searchAPIFunction = searchLocation;
      if (term.latt && term.long) {
        searchAPIFunction = searchByDistance;
      }
      searchAPIFunction(term).then((results) => {
        if (!this.searchWillBeDiscarded) {
          this.searchResults = results;
        }
        this.searchWillBeDiscarded = false;
        this.isFetching = false;
      });
    }, SEARCH_INPUT_DELAY),

    onSearchTermChanged(term) {
      this.searchFieldText = term;
      if (!term) {
        this.isTyping = false;
        return;
      }
      this.isTyping = true;
      if (this.isFetching) {
        this.searchWillBeDiscarded = true;
      }
      this.requestSearch(term);
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
  margin: 0;
  padding: 5px;
  list-style: none;
}
</style>
