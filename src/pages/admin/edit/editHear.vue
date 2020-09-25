<template>
  <div class="edit">
    <div class="edit_title">
      <span class="title">添加闻诊-{{ hearData.sex }}</span>
      <span class="edit_switch" @click="editResult()"></span>
    </div>
    <ul class="edit_class">
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">班级名称:</span>
        </div>
        <select name id class="select" v-if="hearData.id">
          <option value>1</option>
          <option value>1</option>
          <option value>1</option>
          <option value>1</option>
        </select>
        <span class="edit_text_i" v-else>20200521</span>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">诊断结果:</span>
        </div>
        <input
          type="text"
          class="text_box"
          v-if="hearData.id"
          placeholder="请输入院/系"
        />
        <span class="edit_text_i" v-else>20200521</span>
      </li>
      <li class="relative">
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">闻诊音频:</span>
        </div>
        <input type="text" id="fileName" v-model="fileValue" disabled />
        <input type="file" id="file" ref="file" @change="changVal" />
      </li>
    </ul>
    <div class="edit_btn_box">
      <button class="edit_cancel">取消</button>
      <button class="edit_submit">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-hear",
  props: ["hearData"],
  data() {
    return {
      fileValue: "",
    };
  },
  methods: {
    editResult() {
      this.$parent.hearData.show = false;
    },
    changVal() {
      this.fileValue = this.$refs.file.value;
    },
  },
};
</script>
<style lang="scss">
#file {
  display: inline-block;
  width: 80px;
  height: 40px;
  line-height: 32px;
  margin-left: 20px;
  position: relative;
  outline: none;
  &::after {
    content: "选择";
    position: absolute;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: rgb(0, 235, 255);
    left: 0;
    border-radius: 3px;
  }
}
#fileName {
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  border: none;
  width: 165px;
  padding-left: 15px;
}
</style>