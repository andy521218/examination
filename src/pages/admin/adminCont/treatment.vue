<template>
  <div class="treatment diagnosis">
    <div class="cont_bg">
      <!-- 弹窗 -->
      <div class="mask" v-if="treatment"></div>
      <div class="edit big" v-if="treatment">
        <div class="edit_title">
          <span class="title">添加治则治法</span>
          <span class="edit_switch" @click="editSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">病名:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="true"
              placeholder="请输入院/系"
            />
            <span class="edit_text_i" v-else>20200521</span>
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel">取消</button>
          <button class="edit_submit">确定</button>
        </div>
      </div>

      <!-- 内容 -->
      <div class="cont_header">治则治法</div>
      <ul>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟sadasdasdas大撒大撒大撒脉</span>
            </div>
          </div>
        </li>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟sadasdasdas大撒大撒大撒脉</span>
            </div>
          </div>
        </li>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟sadasdasdas大撒大撒大撒脉</span>
            </div>
          </div>
        </li>
      </ul>
      <button class="addResult" @click="addTreatment()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "treatment-diagnosis",
  data() {
    return {
      treatment: false,
    };
  },
  methods: {
    editSwitch() {
      this.treatment = false;
    },
    addTreatment() {
      this.treatment = true;
    },
  },
};
</script>

<style lang="scss">
.treatment {
  .cont_bg {
    width: 40%;
    .edit {
      top: 45px;
      left: 50%;
      margin-left: -235px;
      li {
        border: none;
      }
    }
  }
}
</style>