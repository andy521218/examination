<template>
  <div class="user_cut">
    <div class="case_cut">
      <case-option
        :option="option"
        v-if="optionShow"
        @editcaseData="editcaseData"
      ></case-option>
      <div class="case_layout">
        <div class="case_left" style="width: 1000px">
          <case-header ref="header"></case-header>
          <main>
            <ul class="main_tab">
              <li
                v-for="(item, index) in tab"
                :key="index"
                class="item_title"
                @click="container(index)"
              >
                {{ item }}
                <div :class="{ active: typeId == index }"></div>
              </li>
              <i class="tips" @click="opneTips"></i>
            </ul>
            <div class="content scrollbar">
              <div class="content_scrollbar">
                <ul v-show="typeId == 0">
                  <li style="border: none">
                    <p>点击右侧空白处选择一个设置为正确选项:</p>
                  </li>
                  <li
                    v-for="(item, index) in pulseData"
                    :key="index"
                    style="display: flex; justify-content: flex-start"
                  >
                    <div
                      class="item_cont"
                      style="width: 117px"
                      v-for="(i, index) in item"
                      :key="index"
                    >
                      <input
                        type="radio"
                        name="option"
                        style="margin-right: 20px"
                        v-model="answer"
                        :value="i"
                        @change="putPulse"
                      />
                      <p class="item_cont_title">
                        {{ i }}
                      </p>
                    </div>
                  </li>
                </ul>
                <div class="normal_edit" v-if="normal_edit_show && typeId == 1">
                  按诊的结果均为正常
                  <p></p>
                </div>
                <ul v-show="typeId == 1 && normal_edit_show == false">
                  <li>
                    <p>请先在右图中进行按诊并选出正确选项:</p>
                  </li>
                  <li
                    style="border: 1px solid rgb(9, 124, 168); border-top: none"
                    v-for="(item, index) in pressItemData"
                    :key="index"
                  >
                    <div class="item_cont">
                      <span
                        style="
                          width: 200px;
                          border-right: 1px solid rgb(9, 124, 168);
                          line-height: 30px;
                        "
                        >{{ item.name }}</span
                      >
                      <span>{{ item.answer }}</span>
                    </div>
                    <!-- <div class="item_edit">
                      <input type="checkbox" />
                    </div> -->
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
        <div class="case_right" style="width: 620px" v-show="typeId == 0">
          <span class="case_title_name">患者{{ name }}正在接受脉诊:</span>
          <img :src="imgsUrl" alt="" class="seeimg" />
          <p class="seedesc">{{ imgDesc }}</p>
        </div>
        <div
          class="case_right"
          style="width: 620px"
          v-if="typeId == 1 && sex == 'false'"
        >
          <span class="case_title_name">患者{{ name }}正在接受按诊:</span>
          <div>
            <img
              src="../../../assets/public/girl1.png"
              alt=""
              class="seeimg"
              usemap="#mapgirl"
              style="height: 600px; width: 500px; margin-top: 20px"
            />
            <map name="mapgirl">
              <area
                shape="rect"
                coords="216,149,244,182"
                alt="右胸"
                style="cursor: pointer"
                @click="pressAnswer('右胸')"
              />
              <area
                shape="rect"
                coords="245,149,263,183"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('胸膺')"
              />
              <area
                shape="rect"
                coords="263,148,297,182"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('左胸')"
              />
              <area
                shape="rect"
                coords="216,185,247,213"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('右胁肋')"
              />
              <area
                shape="rect"
                coords="247,190,278,200"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('心下')"
              />
              <area
                shape="rect"
                coords="272,186,292,198"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('虚里')"
              />
              <area
                shape="rect"
                coords="276,198,290,213"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('左胁肋')"
              />
              <area
                shape="rect"
                coords="231,211,298,233"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('胃脘')"
              />
              <area
                shape="rect"
                coords="234,235,298,254"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('大腹')"
              />
              <area
                shape="rect"
                coords="214,252,246,282"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('右腹')"
              />
              <area
                shape="rect"
                coords="245,252,273,281"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('小腹')"
              />
              <area
                shape="rect"
                coords="273,252,305,281"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('左腹')"
              />
              <area
                shape="rect"
                coords="202,478,227,552"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('下肢')"
              />
              <area
                shape="rect"
                coords="202,573,226,593"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('足背')"
              />
            </map>
          </div>
        </div>

        <div
          class="case_right"
          style="width: 620px"
          v-if="typeId == 1 && sex == 'true'"
        >
          <span class="case_title_name">患者{{ name }}正在接受按诊:</span>
          <div>
            <img
              src="../../../assets/public/boy1.png"
              alt=""
              class="seeimg"
              usemap="#mapboy"
              style="height: 600px; width: 500px; margin-top: 20px"
            />
            <map name="mapboy">
              <area
                shape="rect"
                coords="202,121,242,165"
                alt="右胸"
                style="cursor: pointer"
                @click="pressAnswer('右胸')"
              />
              <area
                shape="rect"
                coords="246,124,270,168"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('胸膺')"
              />
              <area
                shape="rect"
                coords="270,123,303,169"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('左胸')"
              />
              <area
                shape="rect"
                coords="207,175,242,210"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('右胁肋')"
              />
              <area
                shape="rect"
                coords="242,182,283,205"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('心下')"
              />
              <area
                shape="rect"
                coords="283,175,309,192"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('虚里')"
              />
              <area
                shape="rect"
                coords="293,198,323,214"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('左胁肋')"
              />
              <area
                shape="rect"
                coords="223,211,293,239"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('胃脘')"
              />
              <area
                shape="rect"
                coords="200,245,310,271"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('大腹')"
              />
              <area
                shape="rect"
                coords="200,273,238,313"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('右腹')"
              />
              <area
                shape="rect"
                coords="238,273,275,313"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('小腹')"
              />
              <area
                shape="rect"
                coords="277,273,302,313"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('左腹')"
              />
              <area
                shape="rect"
                coords="215,488,236,553"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('下肢')"
              />
              <area
                shape="rect"
                coords="209,571,236,588"
                alt=""
                style="cursor: pointer"
                @click="pressAnswer('足背')"
              />
            </map>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import caseOption from "../../teacher/edit/caseOption";
import caseHeader from "../../teacher/edit/caseHeader";
export default {
  name: "user-look",
  components: {
    caseOption,
    caseHeader,
  },
  data() {
    return {
      tab: ["脉诊", "按诊"],
      examNo: "",
      typeId: "0",
      route: "",
      edit_cont: false,
      tips: false,
      allShow: false,
      optionShow: false,
      normal_edit_show: false,
      answer: "",
      imgsUrl: "",
      imgDesc: "",
      caseId: "",
      pressItemData: [],
      pressData: [],
      pulseData: [],
      option: {},
      name: "",
      sex: false,
    };
  },
  created() {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("pressItemData", JSON.stringify(this.pressItemData));
    });
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.name = localStorage.getItem("name");
    this.sex = localStorage.getItem("sex");
    this.getpressData();
    this.getpulseData();
    let arr = JSON.parse(localStorage.getItem("pressItemData"));
    if (arr == null || arr.length == "0") {
      return;
    }
    this.pressItemData = arr;
  },
  methods: {
    container(i) {
      this.typeId = i;
    },
    upload() {
      this.route = this.$refs.file.value;
    },
    openCont() {
      this.edit_cont = true;
    },
    opneTips() {
      this.tips = true;
    },
    openDele() {
      this.allShow = true;
    },
    editPress(e) {
      this.optionShow = true;
      this.option = e;
    },
    editcaseData() {
      this.axios
        .put(
          `/case/manage/${this.caseId}/feel/press/${
            this.option.id
          }?${this.qs.stringify({
            answer: this.$children[1].radioData,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("编辑成功!");
            this.optionShow = false;
            this.getpressData();
          }
        });
    },
    getpressData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/feel/press`)
        .then((res) => {
          if (res.data.list.length == 0) {
            return (this.normal_edit_show = true);
          }
          this.pressData = res.data.list;
        });
    },
    getpulseData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/feel/pulse`)
        .then((res) => {
          this.pulseData = [];
          let arr = [];
          let flag = false;
          for (let i = 0; i < res.data.options.length; i++) {
            flag = false;
            arr.push(res.data.options[i]);
            if (i % 8 == "7") {
              this.pulseData.push(arr);
              arr = [];
              flag = true;
            }
          }
          if (!flag) {
            this.pulseData.push(arr);
          }
          if (/localhost/.test(res.data.picUrl)) {
            this.imgsUrl = res.data.picUrl.replace(
              /localhost/,
              "101.132.150.87"
            );
          } else {
            this.imgsUrl = this.$url + res.data.picUrl;
          }
          this.imgDesc = res.data.description;
          this.answer = res.data.answer;
        });
    },
    pressAnswer(name) {
      if (this.normal_edit_show) return;
      let length = this.pressItemData.length;
      let flag = false;
      if (length == 0) {
        this.check(name);
      } else {
        for (let i = 0; i < length; i++) {
          if (this.pressItemData[i].name == name) {
            flag = true;
            return this.$Message.error("重复查看");
          }
        }
        if (!flag) {
          this.check(name);
        }
      }
    },
    check(name) {
      let flag = false;
      this.pressData.forEach((item) => {
        if (item.name == name) {
          flag = true;
          this.axios.post(
            `/answer/${this.examNo}/${this.caseId}/feel/press/${item.id}`
          );
          return this.pressItemData.push(item);
        }
      });
      if (!flag) {
        let arr = {
          name: name,
          answer: "正常",
        };
        return this.pressItemData.push(arr);
      }
    },
    putPulse() {
      this.axios
        .post(`/answer/${this.examNo}/${this.caseId}/feel/pulse`, {
          answer: this.answer,
        })
        .then((res) => {
          if (res.code == "000000") {
            return;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
  beforeRouteLeave(to, from, next) {
    localStorage.setItem("pressItemData", JSON.stringify(this.pressItemData));
    next();
  },
};
</script>
<style lang="scss">
.case_cut {
  .case_right {
    text-align: center;
    img {
      margin: 50px 19px;
    }
  }
}
</style>