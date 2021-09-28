<template>
  <div class="search">
    <input
      class="search__field"
      type="search"
      :value="searchFieldText"
      @input="onSearchTermChanged($event.target.value)"
    />
    <SearchIcon size="1x" class="search__icon" />
    <SearchStatusIndicator
      class="search__spinner"
      :isLoading="isFetching"
      :isTyping="isTyping"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import { debounce, coordsToString } from "../utils";

import { SearchIcon } from "vue-feather-icons";

import SearchStatusIndicator from "./SearchStatusIndicator";

const SEARCH_INPUT_DELAY = 600;

export default {
  components: {
    SearchIcon,
    SearchStatusIndicator
  },

  data: () => ({
    searchFieldText: "",
    isTyping: false
  }),

  computed: {
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
.search {
  position: relative;
  display: grid;
  place-items: center stretch;
  grid-template-columns: 1fr 40px;

  padding: 5px;

  color: white;
  background-color: steelblue;
}

.search__field {
  min-width: 100px;
  padding: 5px 8px 5px 24px;

  font: inherit;
  color: inherit;

  background-color: rgb(34, 65, 90);
  border: none;
  border-radius: 5px;
  outline: none;
}

.search__icon {
  position: absolute;
  left: 10px;
}

.search__spinner {
  place-self: center;
}
</style>
