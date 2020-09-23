<template>
  <div class="edit">
    <div class="edit_title">
      <span class="title">添加诊断结果</span>
      <span class="edit_switch" @click="editResult()"></span>
    </div>
    <ul class="edit_class">
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">分类:</span>
        </div>
        <input class="edit_radio" type="radio" value="0" name="result" />
        <label for class="edit_off">望神色形态</label>
        <input class="edit_radio" type="radio" value="1" name="result" />
        <label for class="edit_off">望局部</label>
        <input class="edit_radio" type="radio" value="1" name="result" />
        <label for class="edit_off">望舌</label>
      </li>
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
        <select name id class="select">
          <option value>1</option>
          <option value>1</option>
          <option value>1</option>
          <option value>1</option>
        </select>
        <p class="edit_tips"></p>
      </li>
    </ul>
    <button class="edit_cancel">取消</button>
    <button class="edit_submit">确定</button>
  </div>
</template>

<script>
export default {
  name: "edit-result",
  data() {
    return {};
  },
  props: ["editshow"],
  methods: {
    editResult() {
      this.$emit("editshow",false);
    },
  },
};
</script>

<style lang="scss" scoped>
.edit {
  top: 0;
  .edit_off {
    margin-right: 20px;
  }
  .select {
    width: 200px;
  }
}
</style>