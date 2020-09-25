<template>
  <div class="edit_class">
    <div class="edit">
      <div class="edit_title">
        <span class="title">新增案例</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">姓名:</span>
          </div>
          <input type="text" class="text_box" placeholder="请输入院/系" />

          <p class="edit_tips">1111111111111</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">性别:</span>
          </div>
          <input class="edit_radio" type="radio" value="0" name="sex" checked />
          <label for class="edit_off">正常</label>
          <input class="edit_radio" type="radio" value="1" name="sex" />
          <label for class="edit_off">禁用</label>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">年龄:</span>
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
            <span class="edit_text">病系:</span>
          </div>
          <select name id class="select">
            <option value>1</option>
            <option value>1</option>
            <option value>1</option>
            <option value>1</option>
          </select>
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
  name: "add-case",
  methods:{
    close(){
      this.$parent.addCase=false
    }
  }
};
</script>