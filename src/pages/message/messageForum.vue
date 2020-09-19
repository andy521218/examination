<template>
  <div class="message_forum">
    <discuss :dele="dele">
      <template v-slot:page>
        <turn-page></turn-page>
      </template>
    </discuss>
  </div>
</template>

<script>
import discuss from "../../components/discuss";
import turnPage from "../../components/turnPage";
export default {
  name: "message-forum",
  data() {
    return {
      dele: false,
    };
  },
  components: {
    discuss,
    turnPage,
  },
};
</script>
