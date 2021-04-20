<template>
  <div class="tracked-locations">
    <div class="tracked-locations__filters"></div>
    <ul class="tracked-locations__list">
      <li
        class="tracked-locations__item"
        v-for="trackedItem in trackedLocations"
        :key="trackedItem.location.woeid"
      >
        <TrackedLocation
          :location="trackedItem.location"
          :weather="trackedItem.forecast ? trackedItem.forecast[0] : null"
          :isLoading="trackedItem.isLoading"
          @untrack-location="$emit('untrack-location', $event)"
          @expand-location="$emit('expand-location', $event)"
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

<style scoped>
.tracked-locations__filters {
  background-color: rgb(173, 207, 235);
  height: 40px;
}

.tracked-locations__list {
  margin: 0;
  padding: 5px;
  list-style: none;
}
</style>
