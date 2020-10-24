<template>
  <div class="hear diagnosis">
    <hear-box :title="`男`"></hear-box>
    <hear-box :title="`女`"></hear-box>
  </div>
</template>

<script>
import hearBox from "../../../components/hearBox";
export default {
  name: "hear-diagnosis",
  components: {
    hearBox,
  },
};
</script>
<style lang="scss">
.hear {
  .cont_bg {
    width: 40%;
    .edit {
      left: 50%;
      margin-left: -235px;
      top: 45px;
      li {
        border: none;
      }
    }
  }
}
</style>