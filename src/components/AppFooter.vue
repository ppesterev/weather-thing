<template>
  <footer class="site-footer">
    <div>&copy; 2021 ppesterev</div>
    <div>
      Weather data kindly provided by
      <a href="https://www.metaweather.com/">MetaWeather</a>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.site-footer {
  padding: 10px;

  color: #2f4f4f;
  font-size: 0.9em;
  font-style: italic;
}

.site-footer a {
  text-decoration: none;
  color: #4682b4;
}

.site-footer a:hover {
  text-decoration: underline;
}
</style>
