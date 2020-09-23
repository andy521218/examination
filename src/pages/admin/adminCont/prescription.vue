<template>
  <div class="prescription_diagnosis">
    <!-- 左侧内容 -->
    <div class="cont_bg">
      <!-- 左侧弹窗 -->
      <div class="edit">
        <div class="edit_title">
          <span class="title">添加常见方剂</span>
          <span class="edit_switch" @click="editSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">诊断结果:</span>
            </div>
            <input type="text" class="text_box" v-if="true" placeholder="请输入院/系" />
            <span class="edit_text_i" v-else>20200521</span>
          </li>
        </ul>
        <button class="edit_cancel">取消</button>
        <button class="edit_submit">确定</button>
      </div>
      <div class="cont_header">常见方剂</div>
      <ul>
        <li class="display">
          <input type="text" class="text_box" />
          <button class="submit">检索</button>
        </li>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟脉</span>
            </div>
            <div class="item_container_between">
              <div>
                <span>查看</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button class="addResult" @click="editImg()">+</button>
    </div>
    <!-- 右侧内容 -->
    <div class="cont_bg">
      <!-- 右侧弹窗 -->
      <div class="edit" v-if="prescription">
        <div class="edit_title">
          <span class="title">添加常见方药</span>
          <span class="edit_switch" @click="closePrescription()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方药名称:</span>
            </div>
            <input type="text" class="text_box" v-if="true" placeholder="请输入院/系" />
            <span class="edit_text_i" v-else>20200521</span>
          </li>
          <li class="flex">
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方法用药:</span>
            </div>
            <textarea placeholder="请输入回复内容..." v-if="false"></textarea>
            <span class="edit_text_i" v-else>20200521</span>
          </li>
        </ul>
        <button class="edit_cancel">取消</button>
        <button class="edit_submit">确定</button>
      </div>
      <div class="cont_header">常见方药</div>
      <ul>
        <li class="display">
          <input type="text" class="text_box" />
          <button class="submit">检索</button>
        </li>
        <li class>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟脉</span>
            </div>
            <div class="item_container_between">
              <div>
                <span>查看</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button class="addResult" @click="addPrescription()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "prescription-diagnosis",
  data() {
    return {
      prescription: false,
    };
  },
  methods:{
      closePrescription(){
          this.prescription=false
      },
      addPrescription(){
          this.prescription=true
      }
  }
};
</script>
<style lang="scss">
.prescription_diagnosis {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 3% 5%;
  .cont_bg {
    width: 47%;
    .edit {
      left: 50%;
      margin-left: -235px;
    }
    .display {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      button {
        width: 115px;
      }
      input {
        width: 500px;
      }
    }
    .flex {
      display: flex;
      span {
        height: 40px;
        line-height: 40px;
      }
      textarea {
        background: rgb(8, 75, 130);
        color: rgb(255, 255, 255);
        padding: 10px;
        width: 265px;
        height: 185px;
      }
      textarea::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: rgb(255, 255, 255);
      }

      textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: rgb(255, 255, 255);
      }

      textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: rgb(255, 255, 255);
      }

      textarea:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgb(255, 255, 255);
      }
    }
    li {
      border: none;
    }
  }
}
</style>