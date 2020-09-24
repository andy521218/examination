<template>
  <div class="edit">
    <div class="edit_teacher">
      <div class="edit_title">
        <span class="title">{{ data.title }}</span>
        <span class="edit_switch"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">名称:</span>
          </div>
          <input type="text" class="text_box" :placeholder="data.text" />
          <p class="edit_tips"></p>
        </li>
      </ul>
      <div class="edit_btn_box">
        <button class="edit_cancel">取消</button>
        <button class="edit_submit">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-admin",
  props: ["data"],
};
</script>
