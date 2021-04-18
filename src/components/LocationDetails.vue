<template>
  <div>
    <h2>{{ location.title }}, {{ location.parent.title }}</h2>
    <ul class="location-details__forecast">
      <li
        class="location-details__forecast-day"
        v-for="day in forecast"
        :key="day.id"
      >
        <time :datetime="day.date.toISOString()">
          {{ day.date.toLocaleDateString() }}
        </time>
        <span>{{ day.temp }} &#x2103; </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    location: Object,
    forecast: Array,
    isLoading: Boolean
  }
};
</script>

<style scoped>
.location-details__forecast {
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
