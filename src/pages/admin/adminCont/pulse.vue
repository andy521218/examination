<template>
  <div class="pulse diagnosis">
    <div class="cont_bg">
      <!-- 弹窗 -->
      <div class="mask" v-if="imgShow"></div>
      <div class="edit" v-if="imgShow">
        <div class="edit_title">
          <span class="title">{{ puleseTitle }}诊断结果</span>
          <span class="edit_switch" @click="editSwitch()"></span>
        </div>
        <ul class="edit_class">
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">脉诊名称:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="pulseShow"
              placeholder="请输入脉诊名称"
              v-model="pulse.name"
            />
            <span class="edit_text_i" v-else>{{ pulse.name }}</span>
          </li>
          <li>
            <div class="edit_left">
              <span class="edit_red">*</span>
              <span class="edit_text">脉诊描述:</span>
            </div>
            <input
              type="text"
              class="text_box"
              v-if="pulseShow"
              placeholder="请输入脉诊描述"
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
              <div class="mask" v-show="!imgUrl"></div>
              <img :src="imgUrl" v-show="imgUrl" class="tipsImg" alt="" />
              <input
                type="file"
                ref="imgs"
                @change="uploadImg"
                v-show="pulseShow"
              />
              <img
                :class="{ option: imgUrl != '' }"
                src="../../../assets/public/uploadImg.png"
                alt
                v-if="pulseShow"
              />
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
      <div class="scrollbar">
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
      </div>
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
            <select
              class="select"
              v-model="diagnosis.name"
              @change="getText(diagnosis.name)"
            >
              <option :value="selectdefault">请选择</option>
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
      <div class="scrollbar">
        <ul ref="scroll">
          <li v-for="(item, index) in diagnosisData" :key="index">
            <div class="item_cont content">
              <div class="item_left" style="width: 65px">
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
      </div>
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
      puleseTitle: "",
      itemDown: [
        "右胸",
        "胸膺",
        "左胸",
        "右胁肋",
        "心下",
        "左胁肋",
        "虚里",
        "胃脘",
        "大腹",
        "小腹",
        "左腹",
        "右腹",
        "下肢",
        "足背",
      ],
      imgsData: "",
      imgUrl: "",
      feelId: "",
      selectdefault: undefined,
    };
  },
  mounted() {
    this.getData0();
    this.getData1();
  },
  methods: {
    editImg() {
      this.puleseTitle = "添加";
      this.imgShow = true;
    },
    editSwitch() {
      this.pulse = {};
      this.imgUrl = "";
      this.pulseShow = true;
      this.imgShow = false;
      this.getData0();
    },
    addResult() {
      this.addCont = true;
    },
    addSwitch() {
      this.diagnosis = {};
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
    getText(val) {
      let index = this.itemDown.indexOf(val);
      if (index > "-1") {
        if (!this.diagnosisData[index].id) {
          return;
        } else {
          this.diagnosis.options = this.diagnosisData[index].options.toString();
          this.feelId = this.diagnosisData[index].id;
        }
      }
    },
    submitDiagnosis() {
      if (!this.feelId) {
        if (!this.diagnosis.name)
          return this.$Message.warning("请选择按诊类别");
        if (!this.diagnosis.options)
          return this.$Message.warning("请填写按诊结果");
        this.diagnosis.options = this.diagnosis.options.split(",");
        this.http.post(`/meta/feel/1`, this.diagnosis).then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("添加成功!");
            setTimeout(() => {
              this.$refs.scroll.scrollTop =
                this.$refs.scroll.scrollHeight + 155;
            }, 300);
            this.getData1();
            this.addSwitch();
          } else {
            this.$Message.error(res.msg);
          }
        });
      } else {
        this.diagnosis.options = this.diagnosis.options.split(",");
        this.http
          .put(`/meta/feel/1/${this.feelId}`, this.diagnosis)
          .then((res) => {
            if (res.code == "000000") {
              this.$Message.warning("添加成功!");
              this.getData1();
              this.addSwitch();
            } else {
              this.$Message.error(res.msg);
            }
          });
      }
    },

    postPulse(methods, url, config) {
      if (!this.pulse.name) return this.$Message.warning("请填写脉诊名称");
      if (!this.pulse.description)
        return this.$Message.warning("请填写脉诊描述");
      if (!this.imgsData) return this.$Message.error("请先选择图片");

      let imgData = new window.FormData();
      imgData.append("file", this.imgsData);

      this.upload.post("/upload", imgData).then((res) => {
        if (res.code == "000000") {
          this.pulse.picUrl = res.data;
          this.http[methods](url, this.pulse).then((res) => {
            if (res.code == "000000") {
              this.$Message.warning(`${config}成功!`);
              this.editSwitch();
              this.imgShow = false;
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    uploadImg() {
      this.imgsData = this.$refs.imgs.files[0];
      let fileExample = new FileReader();
      fileExample.readAsDataURL(this.imgsData);
      fileExample.onload = (ev) => {
        this.imgUrl = ev.target.result;
      };
    },

    submitPulse() {
      if (this.pulse.id) {
        return this.postPulse("put", `/meta/feel/0/${this.pulse.id}`, "编辑");
      }
      this.postPulse("post", "/meta/feel/0", "添加");
    },

    seePulse(item) {
      this.imgUrl = this.$url + item.picUrl;
      this.pulseShow = false;
      this.pulse = item;
      this.imgShow = true;
      this.puleseTitle = "查看";
    },
    editPulse(item) {
      this.imgUrl = this.$url + item.picUrl;
      this.pulseShow = true;
      this.pulse = item;
      this.imgShow = true;
      this.puleseTitle = "编辑";
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
          .tipsImg {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 50px;
            top: 50px;
          }
          input {
            width: 100px;
            height: 100px;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
            opacity: 0;
            z-index: 100;
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
          .option {
            opacity: 0.7;
            z-index: 99;
          }
          .mask {
            pointer-events: none;
          }
        }
      }
      li {
        .content {
          display: flex;
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
  .scrollbar {
    ul {
      padding-right: 10px;
      overflow-y: auto;
      height: 520px;
    }
  }
}
</style>