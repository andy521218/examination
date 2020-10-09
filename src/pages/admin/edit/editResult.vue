<template>
  <div class="edit">
    <div class="edit_title">
      <span class="title">添加{{ editTitle }}结果</span>
      <span class="edit_switch" @click="closeResult()"></span>
    </div>
    <ul class="edit_class">
      <!-- <li>
        <div class="edit_left">
          <span class="edit_red"></span>
          <span class="edit_text">分类:</span>
        </div>
        <span class="edit_text_i">{{editTitle}}</span>
      </li> -->
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">诊断项:</span>
        </div>
        <select name id class="select">
          <option value>1</option>
          <option value>1</option>
          <option value>1</option>
          <option value>1</option>
        </select>
        <p class="edit_tips"></p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">诊断结果:</span>
        </div>
        <input type="text" class="text_box">
        <p class="edit_tips"></p>
      </li>
    </ul>
    <div class="edit_btn_box">
      <button class="edit_cancel">取消</button>
      <button class="edit_submit" @click="submit">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-result",
  data() {
    return {};
  },
  props: ["result", "editTitle"],
  methods: {
    closeResult() {
      this.$parent.result = false;
    },
    submit(){
      this.axios.post(`/api/meta/case/watch/1/optionss`).then(res=>{
        console.log(res)
      })
    }
  },
};
</script>
