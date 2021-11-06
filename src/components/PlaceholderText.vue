<template>
  <div class="placeholder-text">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.placeholder-text {
  display: grid;
  place-content: center;
  padding: 10px;

  color: slategrey;
  text-align: center;

  border: 2px dashed slategrey;
  border-radius: 10px;
  opacity: 0.8;
}
</style>
