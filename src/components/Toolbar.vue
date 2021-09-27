<template>
  <div class="toolbar">
    <SearchBar v-if="!$mq.collapseLists" class="toolbar__search" />
  </div>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
  components: {
    SearchBar
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
