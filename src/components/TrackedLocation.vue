<template>
  <article>
    <h3>{{ location.title }}</h3>
    <span>{{ Math.floor(weather.temp) }}&deg; C</span>
    <img :src="weather.icon" :alt="weather.weatherType" />
  </article>
</template>

<script>
export default {
  props: {
    location: Object
  },
  computed: {
    weather: (vm) => vm.location.forecast[0]
  }
};
</script>

<style scoped></style>
