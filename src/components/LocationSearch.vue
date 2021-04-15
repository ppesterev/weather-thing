<template>
  <div class="location-search">
    <input
      class="location-search__field"
      type="search"
      @input="onSearchTermChanged($event.target.value)"
    />
    <span v-if="this.isTyping">Waiting...</span>
    <ul class="location-search__list"></ul>
  </div>
</template>

<script>
import { debounce } from "../utils";
import { searchLocation } from "../api";

const SEARCH_INPUT_DELAY = 600;

export default {
  data: () => ({
    isTyping: false,
    searchResults: null
  }),

  methods: {
    requestSearch: debounce(function(term) {
      this.isTyping = false;
      searchLocation(term).then((results) => (this.searchResults = results));
    }, SEARCH_INPUT_DELAY),

    onSearchTermChanged(term) {
      if (!term) {
        this.isTyping = false;
        return;
      }
      this.isTyping = true;
      this.requestSearch(term);
    }
  }
};
</script>

<style lang="scss" scoped></style>
