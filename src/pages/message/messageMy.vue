<template>
  <div class="message_forum">
    <discuss :dele="dele"></discuss>
  </div>
</template>

<script>
import discuss from "../../components/discuss";

export default {
  name: "message-my",
  data() {
    return {
      dele: true,
    };
  },
  components: {
    discuss,
  },
};
</script>