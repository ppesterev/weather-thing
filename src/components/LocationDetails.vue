<template>
  <div class="location-details">
    <h2 class="location-details__title">
      {{ location.title }}, {{ location.parent.title }}
    </h2>
    <ForecastDay
      class="location-details__current-weather"
      :forecastDay="currentWeather"
    />
    <ul class="location-details__forecast">
      <li
        class="location-details__forecast-day"
        v-for="day in forecast"
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
  },

  computed: {
    currentWeather() {
      return this.location?.forecast[0] || null;
    },

    forecast() {
      return this.location?.forecast.slice(1) || null;
    }
  }
};
</script>

<style scoped>
.location-details {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 4fr;
  grid-gap: 20px 10px;

  padding: 10px;
}

.location-details__title {
  grid-row: 1;
  grid-column: 1/ -1;

  margin: 0;
}

.location-details__current-weather {
  grid-row: 2;
  grid-column: 1;

  padding: 10px;

  border-right: 1px solid grey;
}

.location-details__forecast {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 10px 5px;

  margin: 0;
  padding: 0;
  list-style: none;
}

.location-details__forecast-day {
  padding: 10px;

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  box-shadow: 1px 1px 5px -2px grey;
}
</style>
