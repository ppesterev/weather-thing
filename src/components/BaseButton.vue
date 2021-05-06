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

<style>
.btn {
  position: relative;
  display: inline-grid;
  grid-auto-flow: column;
  place-items: center;
  grid-gap: 5px;

  color: rgb(42, 82, 116);

  background: rgb(197, 217, 233);
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 1px 2px 5px -2px grey;
  outline: none;
}

.btn:hover {
  box-shadow: 2px 3px 5px -2px grey;
}

.btn:focus {
  border: 1px solid grey;
}

.btn:active {
  box-shadow: 1px 2px 5px -2px grey;
  top: 2px;
  left: 1px;
}
</style>
