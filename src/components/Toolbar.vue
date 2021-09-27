<template>
  <div class="toolbar">
    <SearchBar v-if="!$mq.collapseLists" class="toolbar__search" />
    <ListSwitch v-else />
  </div>
</template>

<script>
import ListSwitch from "./ListSwitch";
import SearchBar from "./SearchBar";

export default {
  components: {
    SearchBar,
    ListSwitch
  }
};
</script>

<style scoped>
.toolbar {
  display: flex;

  color: white;

  background-color: steelblue;
}
</style>
