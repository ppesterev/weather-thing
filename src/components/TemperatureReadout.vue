<template>
  <span> {{ formattedTemp }}&nbsp;{{ symbol }} </span>
</template>

<script>
import { TempScale } from "../const";
import { celciusToFahrenheit } from "../utils";

export default {
  props: {
    celciusTemp: Number,
    scale: {
      validator: (scale) => scale in TempScale,
      default: TempScale.C
    },
    precision: Number
  },

  computed: {
    formattedTemp: () => {
      const displayedValue =
        this.scale === TempScale.C
          ? this.celciusTemp
          : celciusToFahrenheit(this.celciusTemp);
      return displayedValue.toFixed(this.precision);
    },
    symbol: () => {
      return this.scale === TempScale.C ? "°C" : "°F";
    }
  }
};
</script>

<style lang="scss" scoped></style>
