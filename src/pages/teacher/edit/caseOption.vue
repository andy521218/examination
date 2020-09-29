<template>
  <div class="case_option">
    <div class="edit">
      <div class="edit_teacher">
        <div class="edit_title">
          <span class="title">{{ optionTitle }}</span>
          <span class="edit_switch" @click="close"></span>
        </div>
        <ul>
          <li>
            <input type="radio" name='option' style="width: 22px; height: 22px" />
            <label for="">急促 </label>
          </li>
            <li>
            <input type="radio" name='option' style="width: 22px; height: 22px" />
            <label for="">急促 </label>
          </li>
           <li>
            <input type="radio" name='option' style="width: 22px; height: 22px" />
            <label for="">急促 </label>
          </li>
           <li>
            <input type="radio" name='option' style="width: 22px; height: 22px" />
            <label for="">急促 </label>
          </li>
           <li>
            <input type="radio" name='option' style="width: 22px; height: 22px" />
            <label for="">急促 </label>
          </li>
           <li>
            <input type="radio" name='option' style="width: 22px; height: 22px" />
            <label for="">急促 </label>
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel">取消</button>
          <button class="edit_submit">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "case-option",
  props: ["optionTitle"],
  methods: {
    close() {
      this.$parent.optionShow = false;
    },
  },
};
</script>

<style lang="scss">
.case_option{
    .edit{
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                text-align: center;
                width: 155px;
                margin-left: 40px;
            }
        }
    }
}
</style>
