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
              v-if="pulseShow"
              placeholder="请输入脉枕名称"
              v-model="pulse.name"
            />
            <span class="edit_text_i" v-else>{{ pulse.name }}</span>
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">脉枕描述:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="pulseShow"
              placeholder="请输入脉枕描述"
              v-model="pulse.description"
            />
            <span class="edit_text_i" v-else>{{ pulse.description }}</span>
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
          <button class="edit_cancel" @click="editSwitch()" v-if="pulseShow">
            取消
          </button>
          <button class="edit_submit" @click="submitPulse" v-if="pulseShow">
            确定
          </button>
        </div>
      </div>
      <!-- 左侧内容 -->
      <div class="cont_header">脉诊</div>
      <ul>
        <li v-for="(item, index) in pulseData" :key="index">
          <div class="item_cont">
            <div class="item_left">
              <i></i>
              <span>{{ item.name }}</span>
            </div>
            <div class="item_container_between">
              <div>
                <span @click="seePulse(item)">查看</span>
                <span @click="editPulse(item)">编辑</span>
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
        <li v-for="(item, index) in diagnosisData" :key="index">
          <div class="item_cont content">
            <div class="item_left">
              <i></i>
              <span>{{ item.name }}</span>
            </div>
            <div class="item_left right">
              <span v-for="(i, index) in item.options" :key="index">{{
                i
              }}</span>
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
      pulseShow: true,
      pulseData: "",
      diagnosis: {},
      diagnosisData: "",
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
      this.pulse = {};
      this.pulseShow = true;
      this.imgShow = false;
      this.getData0();
    },
    addResult() {
      this.addCont = true;
    },
    addSwitch() {
      this.addCont = false;
    },
    getData0() {
      this.axios.get(`/meta/feel/0`).then((res) => {
        this.pulseData = res.data;
      });
    },
    getData1() {
      this.axios.get(`/meta/feel/1`).then((res) => {
        this.diagnosisData = res.data;
      });
    },
    submitDiagnosis() {
      if (!this.diagnosis.name) return this.$Message.warning("请选择按诊类别");
      if (!this.diagnosis.options)
        return this.$Message.warning("请填写按诊结果");
      this.diagnosis.options = this.diagnosis.options.split(",");
      this.http.post(`/meta/feel/1`, this.diagnosis).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning("添加成功!");
          this.getData1();
          this.addCont = false;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    postPulse(methods, url, config) {
      if (!this.pulse.name) return this.$Message.warning("请填写脉枕名称");
      if (!this.pulse.description)
        return this.$Message.warning("请填写脉枕描述");
      this.http[methods](url, this.pulse).then((res) => {
        if (res.code == "000000") {
          this.$Message.warning(`${config}成功!`);
          this.getData0();
          this.pulse = {};
          this.imgShow = false;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    submitPulse() {
      if (this.pulseShow) {
        if (!this.pulse.name) {
          return this.postPulse("put", `/meta/feel/0/${this.pulse.id}`, "修改");
        }
      }
      this.postPulse("post", "/meta/feel/0", "添加");
    },

    seePulse(item) {
      this.pulseShow = false;
      this.pulse = item;
      this.imgShow = true;
    },
    editPulse(item) {
      this.pulseShow = true;
      this.pulse = item;
      this.imgShow = true;
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