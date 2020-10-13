<template>
  <div class="hear diagnosis">
    <hear-box :title="title.one"></hear-box>
    <hear-box :title="title.two"></hear-box>
  </div>
</template>

<script>
import hearBox from "../../../components/hearBox";
export default {
  name: "hear-diagnosis",
  components: {
    hearBox,
  },
  data() {
    return {
      title: {
        one: "男",
        two: "女",
      },
      editShow: false,
    };
  },
  methods: {
    edit(flag) {
      this.editShow = flag;
    },
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