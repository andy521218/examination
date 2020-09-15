<template>
  <div class="edit_dele">
    <div class="edit">
      <div class="edit_title">
        <span class="title">{{edit_title}}</span>
        <span class="edit_switch"></span>
      </div>
      <ul>
        <li>
          <slot name="edit_p"></slot>
        </li>
      </ul>
      <button class="edit_cancel">取消</button>
      <button class="edit_submit">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-dele",
  props:['edit_title']
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