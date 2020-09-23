<template>
  <div class="name_diagnosis">
    <div class="cont_bg">
      <!-- 弹窗 -->
      <div class="edit" v-if="name">
        <div class="edit_title">
          <span class="title">添加病名</span>
          <span class="edit_switch" @click="editSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">病名:</span>
            </div>
            <input type="text" class="text_box" v-if="true" placeholder="请输入院/系" />
            <span class="edit_text_i" v-else>20200521</span>
          </li>
        </ul>
        <button class="edit_cancel">取消</button>
        <button class="edit_submit">确定</button>
      </div>
      <!-- 左侧内容 -->
      <div class="cont_header">病名</div>
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
      <button class="addResult" @click="addName()">+</button>
    </div>

    <div class="cont_bg">
      <!-- 弹窗 -->
      <div class="edit" v-if="symptom">
        <div class="edit_title">
          <span class="title">添加症型</span>
          <span class="edit_switch" @click="closeSymptom()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">症型:</span>
            </div>
            <input type="text" class="text_box" v-if="true" placeholder="请输入院/系" />
            <span class="edit_text_i" v-else>20200521</span>
          </li>
        </ul>
        <button class="edit_cancel">取消</button>
        <button class="edit_submit">确定</button>
      </div>
      <!-- 右侧内容 -->
      <div class="cont_header">症型</div>
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
      <button class="addResult" @click="addSymptom()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "name-diagnosis",
  data() {
    return {
      name: false,
      symptom: false,
    };
  },
  methods: {
    editSwitch() {
      this.name = false;
    },
    addName() {
      this.name = true;
    },
    closeSymptom() {
      this.symptom = false;
    },
    addSymptom() {
      this.symptom = true;
    },
  },
};
</script>

<style lang="scss">
.name_diagnosis {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 3% 5%;
  .cont_bg {
    width: 40%;
    .edit{
      left: 50%;
      margin-left: -235px;
    }
  }
}
</style>