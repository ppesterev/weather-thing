<template>
  <div class="toolbar">
    <SearchBar class="toolbar__search" />
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
  padding: 5px;

  color: white;

  background-color: steelblue;
}
</style>
