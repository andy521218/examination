<template>
  <div class="pulse diagnosis">
    <div class="cont_bg">
      <!-- 弹窗 -->
      <div class="mask"  v-if="imgShow"></div>
      <div class="edit" v-if="imgShow">
        <div class="edit_title">
          <span class="title">添加诊断结果</span>
          <span class="edit_switch" @click="editSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">诊断结果:</span>
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
              <span class="edit_text">诊断结果:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="true"
              placeholder="请输入院/系"
            />
            <span class="edit_text_i" v-else>20200521</span>
          </li>
          <li class="display">
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">脉诊图片:</span>
            </div>
            <div class="uploadImg">
              <input type="file" />
              <img src="../../../assets/public/uploadImg.png" alt />
            </div>
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel">取消</button>
          <button class="edit_submit">确定</button>
        </div>
      </div>
      <!-- 左侧内容 -->
      <div class="cont_header">脉诊</div>
      <ul>
        <li>
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>迟脉</span>
            </div>
            <div class="item_container_between">
              <div>
                <span>播放</span>
                <span>编辑</span>
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
                <span>播放</span>
                <span>编辑</span>
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
                <span>播放</span>
                <span>编辑</span>
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
                <span>播放</span>
                <span>编辑</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button class="addResult" @click="editImg()">+</button>
    </div>

    <div class="cont_bg right">
      <!-- 弹窗 -->
       <div class="mask"  v-if="addCont"></div>
      <div class="edit" v-if="addCont">
        <div class="edit_title">
          <span class="title">添加诊断结果</span>
          <span class="edit_switch" @click="addSwitch()"></span>
        </div>
        <ul class="edit_class">
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
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">诊断结果:</span>
            </div>
            <input type="text" class="text_box" placeholder="请输入院/系" />
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel">取消</button>
          <button class="edit_submit">确定</button>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="cont_header">按诊</div>
      <ul>
        <li>
          <div class="item_cont content">
            <div class="item_left">
              <i></i>
              <span>迟脉</span>
            </div>
            <div class="item_left right">
              <span>迟脉</span>

              <span>迟脉</span>

              <span>迟脉</span>
            </div>
          </div>
        </li>
      </ul>
      <button class="addResult" @click="addResult()">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "pulse-diagnosis",
  data() {
    return {
      imgShow: false,
      addCont: false,
    };
  },
  methods: {
    editImg() {
      this.imgShow = true;
    },
    editSwitch() {
      this.imgShow = false;
    },
    addResult() {
      this.addCont = true;
    },
    addSwitch() {
      this.addCont = false;
    },
  },
};
</script>
<style lang="scss">
.pulse {
  .cont_bg {
    width: 40%;
    .edit {
      top: 45px;
      width: 96%;
      margin-left: 2%;
      li {
        border: none;
      }
    }
    ul {
      margin-top: 20px;
      .display {
        display: flex;
        .uploadImg {
          width: 410px;
          height: 140px;
          background-color: rgb(5, 61, 118);
          border: rgb(9, 124, 168) 1px solid;
          position: relative;
          input {
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
            opacity: 0;
          }
          img {
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
            pointer-events: none;
          }
        }
      }
      li {
        .content {
          justify-content: flex-start;
        }
        .right {
          margin-left: 20px;
          color: rgb(0, 235, 255);
          span{
            border-left: 1px solid rgb(0, 235, 255);
            padding-left: 10px;;
            margin-left: 10px;
          }
        }
        .item_cont {
          margin-bottom: 0;
        }
      }
    }
    .edit.big ul li input,
    .edit.big ul li .select {
      width: 410px;
    }
    .edit.big .edit_cancel {
      margin-left: 165px;
    }
  }
  .right{
    .edit{
      width: 470px;
     left: 50%;
     margin-left: -235px;
    }
  }
}
</style>