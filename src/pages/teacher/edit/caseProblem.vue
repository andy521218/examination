<template>
  <div class="edit_problem">
    <div class="edit">
      <div class="edit_title">
        <span class="title">编辑</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">问题:</span>
          </div>
          <input type="text" class="text_box" placeholder="请输入姓名" />
          <p class="edit_tips"></p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">答案:</span>
          </div>
          <input type="text" class="text_box" placeholder="请输入姓名" />
          <p class="edit_tips"></p>
        </li>
        <li>
          <input type="checkbox" class="checkbox" />
          <label for="">干扰项</label>
          <div class="edit_left big">
            <span class="edit_red">*</span>
            <span class="edit_text">请选择现病史问题分类</span>
          </div>
          <customize-select></customize-select>
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
import customizeSelect from "../../../components/customizeSelect"
export default {
  name: "case-problem",
  components:{
    customizeSelect
  },
  methods:{
    close(){
      this.$parent.edit_cont=false
    }
  }
};
</script>

<style lang="scss">
.edit_problem {
  .edit {
    width: 850px;
    top: -28px;
    left: 50%;
    margin-left: -425px;
    ul {
      li {
        .edit_left {
          width: 85px;
        }
        .big {
          width: 175px;
        }
        .checkbox {
          width: 22px;
          height: 22px;
          margin-left: 85px;
          margin-right: 10px;
        }
        label {
          margin-right: 150px;
        }
        input {
          width: 700px;
        }
        .select_layout {
          float: right;
          margin-right: 22px;
        }
      }
    }
  }
}
</style>