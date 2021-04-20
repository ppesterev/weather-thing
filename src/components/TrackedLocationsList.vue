<template>
  <div
    class="tracked-locations"
    dropzone
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="$event.preventDefault()"
    @drop="onDrop"
  >
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
  },
  methods: {
    onDragEnter(evt) {
      evt.preventDefault();
      evt.target.classList.add("tracked-locations--insert");
    },
    onDragLeave(evt) {
      evt.preventDefault();
      evt.target.classList.remove("tracked-locations--insert");
    },
    onDrop(evt) {
      evt.target.classList.remove("tracked-locations--insert");
      this.$emit(
        "track-location",
        JSON.parse(evt.dataTransfer.getData("application/json")).location
      );
    }
  }
};
</script>

<style scoped>
.tracked-locations--insert::after {
  content: "drop here";
}

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
