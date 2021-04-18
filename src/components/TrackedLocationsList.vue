<template>
  <div>
    <ul>
      <li
        v-for="trackedItem in trackedLocations"
        :key="trackedItem.location.woeid"
      >
        <TrackedLocation
          :location="trackedItem.location"
          :weather="trackedItem.forecast ? trackedItem.forecast[0] : null"
          :isLoading="trackedItem.isLoading"
        />
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
