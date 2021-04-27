<template>
  <div class="location-details">
    <h2>{{ location.title }}, {{ location.parent.title }}</h2>
    <ul class="location-details__forecast">
      <li
        class="location-details__forecast-day"
        v-for="day in location.forecast"
        :key="day.id"
      >
        <ForecastDay :forecastDay="day" />
      </li>
    </ul>
  </div>
</template>

<script>
import ForecastDay from "./ForecastDay.vue";
export default {
  components: { ForecastDay },

  props: {
    location: Object
  }
};
</script>

<style scoped>
.location-details {
  padding: 10px;
}

.location-details__forecast {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px 5px;

  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
