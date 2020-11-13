<template>
  <div class="study_disease">
    <div class="study_title">
      <div class="study_title_left">
        <span>问诊</span>
        <div v-for="(item, index) in list" :key="index">
          <input
            type="radio"
            name="listen"
            :value="item.id"
            v-model="typeId"
            @click="seefeel(item)"
          />
          <label for="">{{ item.name }}</label>
        </div>
      </div>
      <div class="study_title_right">
        <i-switch></i-switch>
        <p>显示正确答案</p>
      </div>
    </div>
    <ul class="study_main">
      <li class="study_item_title">
        <span style="width: 10%; padding-left: 10px">正确答案</span>
        <span style="width: 10%">我的答案</span>
        <span style="width: 2%"></span>
        <div
          class="downMenu"
          style="width: 18%; text-align: center; padding-left: 0"
        >
          <span @click="downMenu_show = true" style="cursor: default">{{
            title
          }}</span>
          <i-con
            type="md-arrow-dropdown"
            size="30"
            @click="downMenu_show = true"
          />
          <div class="downMenu_item" v-show="downMenu_show" style="left: 103px">
            <ul>
              <li
                v-for="(item, index) in tabData"
                :key="index"
                :class="{ active: downMenu_active == item.id }"
                @click="switchIteM(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <span style="width: 15%; text-align: center">我的答案</span>
        <span style="width: 15%; text-align: center">我的答案</span>
        <span style="width: 15%; text-align: center">正确答案</span>
        <span style="width: 15%; text-align: center">是否为依据</span>
      </li>
    </ul>
    <div class="layout_flex">
      <ul class="study_main_left">
        <li>
          <span style="width: 163px; padding-left: 10px">正确答案</span>
          <span style="width: 163px">正确答案</span>
          <span style="width: 10%" class="options">
            <i class="right" v-show="0"></i>
            <i class="error" v-show="1"></i>
          </span>
        </li>
      </ul>
      <ul class="study_main_right">
        <li>
          <span style="width: 294px; text-align: center">正确答案</span>
          <span style="width: 245px; text-align: center">正确答案</span>
          <span style="width: 245px; text-align: center">正确答案</span>
          <span style="width: 245px; text-align: center">正确答案</span>
          <span style="width: 245px; text-align: center" class="options">
            <i class="right" v-show="0"></i> <i class="error" v-show="1"></i
          ></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "study-disease",
  data() {
    return {
      list: [
        { id: 1, name: "病名" },
        { id: 2, name: "症型" },
      ],
      select: [
        {
          title: "发病情况",
          color: "rgb(255,167,39)",
        },
        {
          title: "主症特点",
          color: "rgb(254,236,74)",
        },
        {
          title: "伴随症状及鉴别诊断症状",
          color: "rgb(115,213,114)",
        },
        {
          title: "诊疗过程",
          color: "rgb(36,169,245)",
        },
        {
          title: "发作情况",
          color: "rgb(150,117,206)",
        },
        {
          title: "刻下症",
          color: "rgb(0,230,255)",
        },
      ],
      caseId: "",
      examNo: "",
      tabData: [
        { id: 1, name: "问" },
        { id: 2, name: "望" },
        { id: 3, name: "闻" },
        { id: 4, name: "切" },
      ],
      typeId: "",
      title: "问",
      downMenu_active: "1",
      downMenu_show: false,
      diseaseData: [],
      diseaseNameData: [],
      correctData: [],
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getDiseasename();
    this.getDisease();
    this.getCorrect();
  },
  methods: {
    getDiseasename() {
      this.axios
        .get(`${this.examNo}/${this.caseId}/diseasename`)
        .then((res) => {
          this.diseaseNameData = res.data;
          console.log(res);
        });
    },
    getDisease() {
      this.axios.get(`${this.examNo}/${this.caseId}/disease`).then((res) => {
        this.diseaseData = res.data;
        console.log(res);
      });
    },
    getCorrect() {
      this.axios
        .get(`/${this.examNo}/${this.caseId}/disease/correct`)
        .then((res) => {
          console.log(res);
        });
    },
    switchIteM(item) {
      console.log(item);
      this.downMenu_active = item.id;
      this.downMenu_show = false;
      this.title = item.name;
      this.askItemData = [];
    },
  },
};
</script>

<style lang="scss">
.study_disease {
  .study_title {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 20px;
    }
    input {
      margin-left: 10px;
    }
    label {
      margin-right: 15px;
    }
    .study_title_right {
      display: flex;
      p {
        margin-left: 20px;
      }
    }
  }
  .layout_flex {
    display: flex;
    width: 100%;
    li {
      width: 100%;
      padding-left: 10px;
      display: flex;
      align-items: center;
      min-height: 40px;
      border-bottom: rgb(9, 124, 168) 1px solid;
    }
    .study_main_left {
      width: 360px;
      height: 400px;
      border-right: #097ca8 1px solid;
      li {
        display: flex;
      }
    }
    .study_main_right {
      li {
        display: flex;
      }
    }
  }
}
</style>