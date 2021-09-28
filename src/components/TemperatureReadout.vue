<template>
  <span> {{ formattedTemp }}&nbsp;{{ symbol }} </span>
</template>

<script>
import { mapState } from "vuex";
import { TempScale } from "../const";
import { celciusToFahrenheit } from "../utils";

export default {
  props: {
    celciusTemp: Number,
    precision: Number
  },

  computed: {
    ...mapState({
      scale: (state) => state.tempScale || TempScale.C
    }),
    formattedTemp() {
      const displayedValue =
        this.scale === TempScale.C
          ? this.celciusTemp
          : celciusToFahrenheit(this.celciusTemp);
      return displayedValue.toFixed(this.precision);
    },
    symbol() {
      return this.scale === TempScale.C ? "°C" : "°F";
    }
  }
};
</script>

<style lang="scss" scoped></style>
