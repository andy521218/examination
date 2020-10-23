<template>
  <div class="case_option">
    <div class="edit">
      <div class="edit_teacher">
        <div class="edit_title">
          <span class="title">{{ option.name }}</span>
          <span class="edit_switch" @click="close"></span>
        </div>
        <ul>
          <li v-for="(item, index) in option.options" :key="index">
            <input
              type="radio"
              name="option"
              style="width: 22px; height: 22px"
              :value="item"
              v-model="radioData"
            />
            <label for="">{{ item }} </label>
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="close">取消</button>
          <button class="edit_submit" @click="submit">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "case-option",
  props: ["option"],
  data() {
    return {
      radioData: "",
    };
  },
  mounted() {
    this.radioData = this.option.answer;
  },
  methods: {
    close() {
      this.$parent.optionShow = false;
      this.radioData = "";
    },
    submit() {
      if (!this.radioData) return this.$Message.error("请选择一项正确答案");
      this.$emit("editcaseData");
    },
  },
};
</script>

<style lang="scss">
.case_option {
  .edit {
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      li {
        margin-left: 70px;
        width: 150px;
      }
    }
  }
}
</style>
