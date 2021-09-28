<template>
  <div>
    <label v-for="option in options" :key="option.value">
      <input
        type="radio"
        :name="inputName"
        :value="option.value"
        :checked="option.value === selectedOption"
        @change="handleChange($event.target.checked, option.value)"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  model: {
    prop: "selectedOption",
    event: "change"
  },

  props: {
    selectedOption: {
      type: String
    },

    options: {
      type: Array,
      validator: (options) =>
        options.every((option) => option.value && option.label)
    }
  },

  data: () => ({
    inputName: nanoid(5)
  }),

  methods: {
    handleChange(isChecked, value) {
      if (!isChecked) {
        return;
      }
      this.$emit("change", value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
