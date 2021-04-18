<template>
  <div class="tracked-locations">
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
.tracked-locations {
  padding: 10px;
}

.tracked-locations__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tracked-locations__item {
  margin-bottom: 10px;
}
</style>
