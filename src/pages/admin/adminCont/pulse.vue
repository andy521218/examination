<template>
  <div class="pulse diagnosis">
    <div class="cont_bg">
      <!-- 弹窗 -->
      <div class="mask" v-if="imgShow"></div>
      <div class="edit" v-if="imgShow">
        <div class="edit_title">
          <span class="title">添加诊断结果</span>
          <span class="edit_switch" @click="editSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">脉枕名称:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="true"
              placeholder="请输入脉枕名称"
              v-model="pulse.name"
            />
            <span class="edit_text_i" v-else>20200521</span>
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">脉枕描述:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="true"
              placeholder="请输入院/系"
              v-model="pulse.description"
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
          <button class="edit_cancel" @click="editSwitch()">取消</button>
          <button class="edit_submit" @click="submitPulse">确定</button>
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
                <span>查看</span>
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
      <div class="mask" v-if="addCont"></div>
      <div class="edit" v-if="addCont">
        <div class="edit_title">
          <span class="title">添加诊断结果</span>
          <span class="edit_switch" @click="addSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">按诊部位:</span>
            </div>
            <select name id class="select" v-model="diagnosis.name">
              <option value>请选择</option>
              <option
                :value="item"
                v-for="(item, index) in itemDown"
                :key="index"
              >
                {{ item }}
              </option>
            </select>
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">检查结果:</span>
            </div>
            <input
              type="text"
              class="text_box"
              placeholder="请以逗号分隔"
              v-model="diagnosis.options"
            />
          </li>
        </ul>
        <div class="edit_btn_box">
          <button class="edit_cancel" @click="addSwitch()">取消</button>
          <button class="edit_submit" @click="submitDiagnosis()">确定</button>
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
      pulse: {},
      diagnosis: {},
      itemDown: ["头部", "胸部", "虚里", "心下"],
    };
  },
  mounted() {
    this.getData0();
    this.getData1();
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
    getData0() {
      this.axios.get(`/meta/feel/0`).then((res) => {
        console.log(res);
      });
    },
    getData1() {
      this.axios.get(`/meta/feel/1`).then((res) => {
        console.log(res);
      });
    },
    submitDiagnosis() {
      if (!this.diagnosis.name) return this.$Message.warning("请选择按诊类别");
      if (!this.diagnosis.options)
        return this.$Message.warning("请填写按诊结果");

      this.diagnosis.options = this.diagnosis.options.split(",");
      console.log(this.diagnosis);
      this.axios
        .post(`/meta/feel/1`, JSON.stringify(this.diagnosis), {
          headers: { "Content-Type": " application/json" },
          transformRequest: [
            function (data) {
              return data;
            },
          ],
        })
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("添加成功!");
            this.getData1();
            this.imgShow = false;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },

    submitPulse() {
      if (!this.pulse.name) return this.$Message.warning("请填写脉枕名称");
      if (!this.pulse.description)
        return this.$Message.warning("请填写脉枕描述");
      this.axios
        .post(`/meta/feel/0`, JSON.stringify(this.pulse), {
          headers: { "Content-Type": " application/json" },
          transformRequest: [
            function (data) {
              return data;
            },
          ],
        })
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("添加成功!");
            this.getData0();
            this.imgShow = false;
          } else {
            this.$Message.error(res.msg);
          }
        });
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
          span {
            border-left: 1px solid rgb(0, 235, 255);
            padding-left: 10px;
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
  .right {
    .edit {
      width: 470px;
      left: 50%;
      margin-left: -235px;
    }
  }
}
</style>