<template>
  <div :class="`forecast-day${isToday ? ' forecast-day--today' : ''}`">
    <h3 class="forecast-day__date">
      <time :datetime="forecastDay.date.toISOString()">
        {{ title }}
      </time>
    </h3>
    <div class="forecast-day__basic-info">
      <strong class="forecast-day__weather-type" v-if="isToday">
        {{ forecastDay.weatherType }}
      </strong>

      <strong class="forecast-day__temp">
        <TemperatureReadout :precision="1" :celciusTemp="forecastDay.temp" />
      </strong>
      <span class="forecast-day__temp-range">
        <TemperatureReadout :precision="1" :celciusTemp="forecastDay.minTemp" />
        &hellip;
        <TemperatureReadout :precision="1" :celciusTemp="forecastDay.maxTemp" />
      </span>
      <img
        class="forecast-day__icon"
        :src="forecastDay.icon"
        :alt="forecastDay.weatherType"
        width="100"
        height="100"
      />
    </div>
    <div class="forecast-day__info">
      <WindIcon class="forecast-day__info-icon" size="1x" aria-label="Wind" />
      {{ forecastDay.wind.speed.toFixed(1) }} m/s
      {{ forecastDay.wind.direction }}
    </div>
    <div class="forecast-day__info">
      <DropletIcon
        class="forecast-day__info-icon"
        size="1x"
        aria-label="Humidity"
      />
      {{ forecastDay.humidity }}%
    </div>
    <div class="forecast-day__confidence">
      Confidence: {{ forecastDay.predictability }}%
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

import { WindIcon, DropletIcon } from "vue-feather-icons";
import TemperatureReadout from "./TemperatureReadout.vue";

export default {
  components: {
    WindIcon,
    DropletIcon,
    TemperatureReadout
  },

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
.forecast-day {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0 10px;
  place-content: start stretch;
}

.forecast-day__date,
.forecast-day__basic-info,
.forecast-day__confidence {
  grid-column: 1 / -1;
}

.forecast-day__date {
  margin: 0 0 16px 0;
}

.forecast-day__basic-info {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 50px 1fr;
  grid-gap: 0 10px;
}

.forecast-day--today .forecast-day__basic-info {
  grid-template-rows: 1fr auto auto;
  grid-template-columns: 80px 1fr;
}

.forecast-day__icon {
  grid-row: 1 / -1;
  grid-column: 1;

  width: 100%;
  height: auto;
}

.forecast-day__temp {
  grid-row: -3;
  grid-column: 2;

  font-size: 1.1em;
}

.forecast-day__temp-range {
  grid-row: -2;
  grid-column: 2;
}

.forecast-day__info {
  display: flex;
  gap: 5px;
  align-items: center;

  margin-top: 10px;
  padding-top: 5px;
  border-top: 1px dashed lightgrey;
}

.forecast-day__info-icon {
  font-size: 18px;
  color: slategrey;
}

.forecast-day__confidence {
  margin-top: 12px;
  color: grey;
  font-size: 0.9em;
  font-style: italic;
}
</style>
