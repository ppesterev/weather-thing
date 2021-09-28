<template>
  <div class="location-details">
    <h2 class="location-details__title">
      {{ location.title }}, {{ location.parent.title }}
    </h2>
    <ForecastDay
      class="location-details__current-weather"
      :forecastDay="currentWeather"
      isToday
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
  grid-template-columns: 1fr 4fr;
  grid-template-areas:
    "title title"
    "current forecast";
  grid-gap: 20px 10px;

  padding: 10px;
}

@media (max-width: 560px) {
  .location-details {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "current"
      "forecast";
  }
}

.location-details__title {
  grid-area: title;

  margin: 0;
}

.location-details__current-weather {
  grid-area: current;
  min-width: 240px;

  padding-right: 3px;

  font-size: 18px;

  border-right: 1px solid grey;
}

@media (max-width: 560px) {
  .location-details__current-weather {
    border: none;
  }
}

.location-details__forecast {
  grid-area: forecast;
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
