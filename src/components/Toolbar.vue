<template>
  <div class="toolbar">
    <SearchBar v-if="!$mq.collapseLists" class="toolbar__search" />
    <ListSwitch v-else />

    <BaseToggle
      :options="tempScaleOptions"
      :selectedOption="tempScale"
      @change="setTempScale({ tempScale: $event })"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { TempScale } from "../const";
import BaseToggle from "./BaseToggle.vue";
import ListSwitch from "./ListSwitch";
import SearchBar from "./SearchBar";

export default {
  components: {
    SearchBar,
    ListSwitch,
    BaseToggle
  },

  computed: {
    ...mapState({
      tempScale: (state) => state.tempScale
    }),

    tempScaleOptions: () => [
      { value: TempScale.C, label: "°C" },
      { value: TempScale.F, label: "°F" }
    ]
  },

  methods: {
    ...mapMutations(["setTempScale"])
  }
};
</script>

<style scoped>
.toolbar {
  padding: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;

  background-color: steelblue;
}
</style>
