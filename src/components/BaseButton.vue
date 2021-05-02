<template>
  <button class="btn" :type="type" :value="value" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    value: String,
    type: {
      type: String,
      default: "button",
      validator: (value) => ["button", "submit", "reset"].includes(value)
    }
  }
};
</script>

<style scoped>
.btn {
  display: inline-grid;
  grid-auto-flow: column;
  place-items: center;
  grid-gap: 5px;
}
</style>
