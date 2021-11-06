<template>
  <BaseToggle
    :options="listOptions"
    :selectedOption="displayedList"
    @change="switchDisplayedList({ displayedList: $event })"
  />
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { DisplayedList } from "../const";
import BaseToggle from "./BaseToggle.vue";
export default {
  components: {
    BaseToggle
  },

  computed: {
    ...mapState({
      displayedList: (state) => state.displayedList,
      trackedLocationsCount: (state) => state.trackedLocations.length
    }),
    listOptions: function() {
      return [
        { value: DisplayedList.SEARCH, label: "Search" },
        {
          value: DisplayedList.TRACKED,
          label: `Tracked (${this.trackedLocationsCount})`
        }
      ];
    }
  },

  methods: {
    ...mapMutations(["switchDisplayedList"])
  }
};
</script>

<style scoped></style>
