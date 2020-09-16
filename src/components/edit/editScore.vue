<template>
  <div class="teacher_score">
    <div class="edit">
      <div class="edit_title">
        <span class="title">主观成绩</span>
        <span class="edit_switch"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_text">用户名/学号:</span>
          </div>
          <span class="edit_text_i">20200521</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_text">专业:</span>
          </div>
          <span class="edit_text_i">20200521</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_text">考试成绩:</span>
          </div>
          <span class="edit_text_i">20200521</span>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">主观成绩:</span>
          </div>
          <input type="text" class="text_box" v-if="true" placeholder="请输入用户名/学号" />
          <span class="edit_text_i" v-else>20200521</span>
          <p class="edit_tips">1111111111111</p>
        </li>
      </ul>
      <button class="edit_cancel">取消</button>
      <button class="edit_submit">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-score",
};
</script>

<style lang="scss">
.teacher_score {
}
</style>