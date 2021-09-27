<template>
  <div class="list-switch">
    <label>
      <input
        type="radio"
        name="list-switch"
        :value="DisplayedList.SEARCH"
        :checked="displayedList === DisplayedList.SEARCH"
        @change="switchDisplayedList({ displayedList: DisplayedList.SEARCH })"
      />
      Search
    </label>
    <label>
      <input
        type="radio"
        name="list-switch"
        :value="DisplayedList.TRACKED"
        :checked="displayedList === DisplayedList.TRACKED"
        @change="switchDisplayedList({ displayedList: DisplayedList.TRACKED })"
      />
      Tracked locations
    </label>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { DisplayedList } from "../const";
export default {
  computed: {
    ...mapState({
      displayedList: (state) => state.displayedList
    }),
    DisplayedList: () => DisplayedList
  },

  methods: {
    ...mapMutations(["switchDisplayedList"])
  }
};
</script>

<style scoped></style>
