<template>
  <div class="tracked-locations" @dragend="dropPosition = null">
    <div class="tracked-locations__filters"></div>
    <ul
      :class="
        `tracked-locations__list ${
          dropPosition === -1 ? 'tracked-locations__list--drop-target' : ''
        }`
      "
      dropzone
      @dragenter.self="dropPosition = -1"
      @dragleave="dropPosition = null"
      @dragover.prevent
      @drop="onDrop"
    >
      <li
        v-for="(trackedItem, index) in trackedLocations"
        :key="trackedItem.location.woeid"
        :class="
          `tracked-locations__item ${
            dropPosition === index ? 'tracked-locations__item--drop-target' : ''
          }`
        "
        dropzone
        @dragleave="
          (evt) => {
            if (evt.target === evt.currentTarget) {
              return;
            }
            evt.stopPropagation();
          }
        "
        @dragenter.stop="dropPosition = index"
        @drop.stop="onDrop"
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

  data() {
    return {
      dropPosition: null
    };
  },

  methods: {
    onDrop(evt) {
      this.$emit(
        "track-location",
        JSON.parse(evt.dataTransfer.getData("application/json")).location,
        this.dropPosition
      );
      this.dropPosition = null;
    }
  }
};
</script>

<style scoped>
.tracked-locations {
  display: grid;
  grid-template-rows: minmax(40px, auto) 1fr;
}

.tracked-locations__list--drop-target::after,
.tracked-locations__item--drop-target::before {
  content: "";
  display: grid;

  height: 80px;
  margin: 5px;

  background-color: rgba(70, 131, 180, 0.05);
  border: 2px dashed steelblue;
  border-radius: 10px;
}

.tracked-locations__filters {
  background-color: rgb(173, 207, 235);
  height: 40px;
}

.tracked-locations__list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
