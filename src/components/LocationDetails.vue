<template>
  <div>
    <h2>{{ location.title }}</h2>
    <ul class="location-details__forecast">
      <li
        class="location-details__forecast-day"
        v-for="day in forecast"
        :key="day.id"
      >
        <time :datetime="day.date.toISOString()">
          {{ day.date.toLocaleDateString() }}
        </time>
        <span>{{ day.temp }}</span>
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

<style scoped></style>
