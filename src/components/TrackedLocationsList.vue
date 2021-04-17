<template>
  <div>
    <ul>
      <li v-for="location in trackedLocations" :key="location.woeid">
        <TrackedLocation :location="location" />
      </li>
    </ul>
  </div>
</template>

<script>
import TrackedLocation from "./TrackedLocation.vue";
export default {
  components: { TrackedLocation },
  props: {
    trackedLocations: Array
  }
};
</script>

<style scoped></style>
