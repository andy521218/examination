<template>
  <div class="edit_dele">
    <div class="edit">
      <div class="edit_title">
        <span class="title">{{ title }}</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <slot name="edit_p"></slot>
        </li>
      </ul>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close">取消</button>
        <button class="edit_submit" @click="submit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-dele",
  props: ["title"],
  methods: {
    close() {
      this.$emit("closeEdit");
      this.$parent.allShow = false;
      this.$parent.deleshow = false;
      this.$parent.caseId = "";
      this.$parent.mask = false;
      this.$parent.trainshow = false;
      this.$parent.check = '';
    },
    submit() {
      this.$emit("deleSubmit");
    },
  },
};
</script>

<style lang="scss">
.edit_dele {
  ul {
    li {
      p {
        text-align: center;
      }
      .edit_dele_p {
        color: rgb(229, 28, 35);
      }
    }
  }
}
</style>