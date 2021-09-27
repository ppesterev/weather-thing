<template>
  <div class="list-switch">
    <BaseButton class="list-switch__btn" @click="displaySearch" value="Search">
      Search
    </BaseButton>
    <BaseButton
      class="list-switch__btn"
      @click="displayTracked"
      value="Tracked locations"
    >
      Tracked locations
    </BaseButton>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { DisplayedList } from "../const";
import BaseButton from "./BaseButton.vue";
export default {
  components: { BaseButton },
  computed: {
    ...mapState({
      displayedList: (state) => state.displayedList
    })
  },

  methods: {
    ...mapMutations(["switchDisplayedList"]),
    displaySearch() {
      this.switchDisplayedList({ displayedList: DisplayedList.SEARCH });
    },
    displayTracked() {
      this.switchDisplayedList({ displayedList: DisplayedList.TRACKED });
    }
  }
};
</script>

<style scoped></style>
