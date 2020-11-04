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
          <case-header></case-header>
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
                    v-for="(item, index) in pulseData.optinos"
                    :key="index"
                    style="display: flex; justify-content: flex-start"
                  >
                    <div
                      class="item_cont"
                      style="width: 94px"
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
                      <p class="item_cont_title" @click="seeImg(i)">
                        {{ i }}
                      </p>
                    </div>
                  </li>
                </ul>
                <ul v-show="typeId == 1">
                  <li>
                    <p>点击右侧空白处选择一个设置为正确选项:</p>
                  </li>
                  <li
                    style="border: 1px solid rgb(9, 124, 168); border-top: none"
                    v-for="(item, index) in pressItemData"
                    :key="index"
                    @click="editPress(item)"
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
        <div class="case_right" style="width: 620px" v-show="typeId == 1">
          <span class="case_title_name">患者{{ name }}正在接受按诊:</span>
          <img
            src="../../../assets/public/boy.jpg"
            alt=""
            v-if="!sex"
            class="seeimg"
            usemap="#mapboy"
            style="height: 600px; width: 500px; margin-top: 20px"
          />
          <map name="mapboy">
            <area
              shape="rect"
              coords="0,0,148,139"
              alt=""
              style="cursor: pointer"
            />
          </map>
          <img
            src="../../../assets/public/girl.jpg"
            alt=""
            v-if="sex"
            class="seeimg"
            usemap="#mapgirl"
            style="height: 600px; width: 500px; margin-top: 20px"
          />
          <map name="mapgirl">
            <area
              shape="rect"
              coords="175,142,218,176"
              alt="右胸"
              style="cursor: pointer"
              @click="pressAnswer('右胸')"
            />
            <area
              shape="rect"
              coords="220,143,248,176"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('胸膺')"
            />
            <area
              shape="rect"
              coords="252,143,302,176"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('左胸')"
            />
            <area
              shape="rect"
              coords="178,182,222,202"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('右胁肋')"
            />
            <area
              shape="rect"
              coords="222,182,264,198"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('心下')"
            />
            <area
              shape="rect"
              coords="264,182,294,198"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('左胁肋')"
            />
            <area
              shape="rect"
              coords="210,202,294,224"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('胃脘')"
            />
            <area
              shape="rect"
              coords="176,225,314,242"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('大腹')"
            />
            <area
              shape="rect"
              coords="176,246,224,272"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('右腹')"
            />
            <area
              shape="rect"
              coords="225,245,265,272"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('小腹')"
            />
            <area
              shape="rect"
              coords="268,246,315,272"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('左腹')"
            />
            <area
              shape="rect"
              coords="155,464,192,535"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('下肢')"
            />
            <area
              shape="rect"
              coords="146,558,194,578"
              alt=""
              style="cursor: pointer"
              @click="pressAnswer('下肢')"
            />
          </map>
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
      answer: "",
      imgsUrl: "",
      imgDesc: "",
      caseId: "",
      pressItemData: [],
      pressData: [],
      pulseData: {},
      option: {},
      name: "",
      sex: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.name = localStorage.getItem("name");
    this.sex = localStorage.getItem("sex");
    this.getpressData();
    this.getpulseData();
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
    seeImg(e) {
      this.imgsUrl = e.picUrl;
      this.imgDesc = e.description;
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
          this.pressData = res.data.list;
        });
    },
    getpulseData() {
      this.axios
        .get(`/answer/${this.examNo}/${this.caseId}/feel/pulse`)
        .then((res) => {
          this.pulseData.optinos = [];
          let arr = [];
          for (let i = 0; i < res.data.options.length; i++) {
            arr.push(res.data.options[i]);
            if (i % 10 == "1") {
              this.pulseData.optinos.push(arr);
              arr = [];
            }
          }
          this.pulseData.optinos.reverse();
          this.imgsUrl = res.data.picUrl;
          this.answer = res.data.answer;
        });
    },
    pressAnswer(name) {
      let flag = false;
      this.pressData.forEach((item) => {
        if (item.name == name) {
          flag = false;
          return this.pressItemData.push(item);
        } else {
          flag = true;
        }
      });
      if (flag) {
        console.log(111);
      }
    },
    putPulse() {
      this.axios
        .post(`/answer/${this.examNo}/${this.caseId}/feel/pulse`, {
          answer: this.answer,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.pulseData = res.data.list;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
};
</script>
<style lang="scss">
.case_cut {
  .case_right {
    text-align: center;
    img {
      border: 1px solid rgb(9, 124, 168);
      margin: 50px 19px;
    }
  }
}
</style>