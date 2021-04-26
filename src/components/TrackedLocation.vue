<template>
  <article class="tracked-location">
    <h3 class="tracked-location__title">{{ location.title }}</h3>
    <div class="tracked-location__weather" v-if="weather">
      <img
        class="tracked-location__icon"
        :src="weather.icon"
        :alt="weather.weatherType"
        width="100"
        height="100"
      />
      <strong class="tracked-location__temp"
        >{{ Math.floor(weather.temp) }} &deg;C</strong
      >
    </div>
    <div class="tracked-location__loading" v-else-if="isLoading">
      Loading...
    </div>
    <div class="tracked-location__controls" v-if="!isLoading">
      <button @click="$emit('untrack-location', location.woeid)">
        Untrack
      </button>
      <button @click="$emit('expand-location', location.woeid)">
        View forecast
      </button>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    location: Object,
    weather: Object,
    isLoading: Boolean
  }
};
</script>

<style scoped>
.tracked-location {
  display: grid;
  grid-template-columns: 5fr 2fr;
  grid-template-rows: auto 30px;
  grid-gap: 10px;

  padding: 5px;

  background-color: rgba(255, 255, 255, 0.6);
}

.tracked-location__title {
  grid-row: 1;
  grid-column: 1;
  margin: 0;
}

.tracked-location__weather,
.tracked-location__loading {
  grid-row: 2;
  grid-column: 1;
}

.tracked-location__weather {
  display: flex;
  align-items: flex-start;
}

.tracked-location__icon {
  max-height: 100%;
  width: auto;
}

.tracked-location__temp {
  font-size: 1.1em;
  line-height: 1;
  margin-left: 5px;
}

.tracked-location__controls {
  grid-row: 1 / span 2;
  grid-column: 2;
  display: flex;
  flex-direction: column;
}
</style>
