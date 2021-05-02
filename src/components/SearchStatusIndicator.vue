<template>
  <Edit2Icon class="status--typing" v-if="isTyping" />
  <RefreshCwIcon class="status--loading" v-else-if="isLoading" />
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
.status--typing,
.status--loading {
  position: relative;
  transform-origin: center;
}

.status--typing {
  animation: typing 0.7s linear infinite;
}

.status--loading {
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
