<template>
  <article>
    <h3>{{ location.title }}</h3>
    <div v-if="weather">
      <span>{{ Math.floor(weather.temp) }}&deg; C</span>
      <img :src="weather.icon" :alt="weather.weatherType" />
    </div>
    <div v-if="isLoading">Loading...</div>
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

<style scoped></style>
