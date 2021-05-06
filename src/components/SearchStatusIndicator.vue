<template>
  <span class="status">
    <Edit2Icon class="status__icon--typing" v-if="isTyping" />
    <RefreshCwIcon class="status__icon--loading" v-else-if="isLoading" />
  </span>
</template>

<script>
import { Edit2Icon, RefreshCwIcon } from "vue-feather-icons";

export default {
  components: {
    Edit2Icon,
    RefreshCwIcon
  },

  props: {
    isTyping: Boolean,
    isLoading: Boolean
  }
};
</script>

<style scoped>
.status {
  filter: drop-shadow(1px 2px 2px rgb(44, 44, 44));
}

.status__icon--typing,
.status--loading {
  position: relative;
  transform-origin: center;
}

.status__icon--typing {
  animation: typing 0.7s linear infinite;
}

.status__icon--loading {
  animation: loading 1s linear infinite;
}

@keyframes typing {
  from {
    left: 0;
  }
  to {
    left: 10px;
  }
}

@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
