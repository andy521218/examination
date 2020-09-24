<template>
  <div class="prescription diagnosis">
    <!-- 左侧内容 -->
    <div class="cont_bg">
      <!-- 左侧弹窗 -->
       <div class="mask"  v-if="drug"></div>
      <div class="edit" v-if="drug">
        <div class="edit_title">
          <span class="title">添加常见方剂</span>
          <span class="edit_switch" @click="closeDrug()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方剂名称:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="true"
              placeholder="请输入院/系"
            />
            <span class="edit_text_i" v-else>20200521</span>
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方剂组成:</span>
            </div>
            <select name id class="select">
              <option value>1</option>
              <option value>1</option>
              <option value>1</option>
              <option value>1</option>
            </select>
            <p class="edit_tips">
              <img src="../../../assets/public/dele.png" alt="" />
            </p>
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方剂组成:</span>
            </div>
            <select name id class="select">
              <option value>1</option>
              <option value>1</option>
              <option value>1</option>
              <option value>1</option>
            </select>
            <p class="edit_tips">
              <img src="../../../assets/public/dele.png" alt="" />
            </p>
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">方剂组成:</span>
            </div>
            <select name id class="select">
              <option value>1</option>
              <option value>1</option>
              <option value>1</option>
              <option value>1</option>
            </select>
            <p class="edit_tips">
              <img src="../../../assets/public/dele.png" alt="" />
            </p>
          </li>
        </ul>
        <i class="addList">+</i>
        <div class="edit_btn_box">
          <button class="edit_cancel">取消</button>
          <button class="edit_submit">确定</button>
        </div>
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
      <button class="addResult" @click="addDrug()">+</button>
    </div>
    <!-- 右侧内容 -->
    <div class="cont_bg">
      <!-- 右侧弹窗 -->
       <div class="mask"  v-if="prescription"></div>
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
            <input
              type="text"
              class="text_box"
              v-if="true"
              placeholder="请输入院/系"
            />
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
        <div class="edit_btn_box">
          <button class="edit_cancel">取消</button>
          <button class="edit_submit">确定</button>
        </div>
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
      drug: false,
    };
  },
  methods: {
    closePrescription() {
      this.prescription = false;
    },
    addPrescription() {
      this.prescription = true;
    },
    closeDrug() {
      this.drug = false;
    },
    addDrug() {
      this.drug = true;
    },
  },
};
</script>
<style lang="scss">
.prescription {
  .edit_btn_box{
    margin-top: 70px;
  }
  .cont_bg {
    width: 47%;
    .edit {
      top: 45px;
      left: 50%;
      margin-left: -235px;
      .select{
        width: 235px;
      }
      li{
        border: none;
      }
    }
    .display {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      border-bottom: none;
      margin-bottom: 10px;
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
      // height: 40px;
      .edit_tips {
        width: 20px;
        height: 30px;
        right: 62px;
        top: 8px;
        display: inline-block;
        img {
          width: 20px;
          height: 24px;
        }
      }
      .edit_tips:hover {
        border-bottom: 2px solid rgb(255, 0, 0);
      }
    }
    .addList {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 30px;
      background: rgb(8, 75, 130);
      border: rgb(9, 124, 168) 1px solid;
      float: right;
      margin-right: 68px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .addList:hover {
      cursor: pointer;
      color: rgb(0, 235, 255);
    }
  }
}
</style>