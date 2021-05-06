<template>
  <div class="forecast-day">
    <h3 class="forecast-day__date">
      <time :datetime="forecastDay.date.toISOString()">
        {{ title }}
      </time>
    </h3>
    <div class="forecast-day__basic-info">
      <strong class="forecast-day__temp"
        >{{ forecastDay.temp.toFixed(1) }} &deg;C</strong
      >
      <span class="forecast-day__temp-range"
        >{{ forecastDay.minTemp.toFixed(1) }} &hellip;
        {{ forecastDay.maxTemp.toFixed(1) }} &deg;C</span
      >
      <img
        class="forecast-day__icon"
        :src="forecastDay.icon"
        :alt="forecastDay.weatherType"
        width="100"
        height="100"
      />
    </div>
    <div class="forecast-day__confidence">
      Confidence: {{ forecastDay.predictability }}%
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    forecastDay: Object,
    isToday: Boolean
  },

  computed: {
    title() {
      const day = dayjs(this.forecastDay.date);
      const humanDate = day.format("D MMMM");
      if (this.isToday) {
        return `Today, ${humanDate}`;
      }
      return humanDate;
    }
  }
};
</script>

<style scoped>
.forecast-day__date {
  margin: 0 0 20px 0;
}

.forecast-day__basic-info {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 50px auto;
  grid-gap: 5px;
}

.forecast-day__icon {
  grid-row: 1 / span 2;
  grid-column: 1;
  width: 100%;
  height: auto;
}

.forecast-day__temp {
  grid-row: 1;
  grid-column: 2;

  font-size: 1.1em;
}

.forecast-day__temp-range {
  grid-row: 2;
  grid-column: 2;
}

.forecast-day__confidence {
  margin-top: 10px;
  color: grey;
  font-size: 0.9em;
  font-style: italic;
}
</style>
