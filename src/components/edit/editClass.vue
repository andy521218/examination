<template>
  <div class="edit_class">
    <div class="edit">
      <div class="edit_title">
        <span class="title">{{title?'编辑':'新建'}}</span>
        <span class="edit_switch"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">院/系:</span>
          </div>
          <input type="text" class="text_box" v-if="title" placeholder="请输入院/系" />
          <span class="edit_text_i" v-else>20200521</span>
          <p class="edit_tips">1111111111111</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">专业:</span>
          </div>
          <input type="text" class="text_box" v-if="title" placeholder="请输入专业" />
          <span class="edit_text_i" v-else>20200521</span>
          <p class="edit_tips">1111111111111</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">年级:</span>
          </div>
          <input type="text" class="text_box" v-if="title" placeholder="请输入年级" />
          <span class="edit_text_i" v-else>20200521</span>
          <p class="edit_tips">1111111111111</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">班级名称:</span>
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
            <span class="edit_text">班级名称:</span>
          </div>
          <input class="edit_radio" type="radio" v-model="off" value="0" checked />
          <label for class="edit_off">正常</label>
          <input class="edit_radio" type="radio" v-model="off" value="1" />
          <label for class="edit_off">禁用</label>
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
  name: "edit-class",
  data() {
    return {
      title: true,
      off: "0",
    };
  },
};
</script>
