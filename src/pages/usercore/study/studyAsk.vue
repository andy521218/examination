<template>
  <div class="study_ask">
    <div class="study_title" style="justify-content: space-between">
      <div class="study_title_left">
        <span>问诊</span>
        <p v-show="scoreData.askSortScore == '0'">包含顺序分5分</p>
        <p v-show="scoreData.askSortScore == '5'">
          因未按照正确顺序进行问诊,扣除顺序分5分
        </p>
      </div>
      <div class="study_title_right">
        <i-switch></i-switch>
        <span>显示正确答案</span>
      </div>
    </div>
    <ul class="study_main">
      <li class="study_item_title">
        <div class="downMenu">
          <span @click="downMenu_show = true" style="cursor: default">{{
            title
          }}</span>
          <i-con
            type="md-arrow-dropdown"
            size="30"
            @click="downMenu_show = true"
          />
          <div class="downMenu_item" v-show="downMenu_show">
            <ul>
              <li
                :class="{ active: downMenu_active == '总问题' }"
                @click="switchIteM('总问题')"
              >
                总问题
              </li>
              <li
                v-for="(item, index) in tabData"
                :key="index"
                :class="{ active: downMenu_active == item.moduleId }"
                @click="switchIteM(item)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <span style="width: 10%; text-align: center">正确答案</span>
        <span style="width: 10%; text-align: center">我的答案</span>
      </li>
    </ul>
    <div class="scrollbar">
      <ul class="study_main_item">
        <li v-for="(item, index) in askItemData" :key="index">
          <div class="ask_item">
            <i
              v-if="item.typeId == 1"
              :style="{ background: select[item.colorId].color }"
            ></i>
            <div class="ask_column">
              <span>问: {{ item.question }}</span>
              <span>答: {{ item.answer }}</span>
            </div>
          </div>
          <span style="width: 10%; text-align: center"></span>
          <span style="width: 10%" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "study-ask",
  props: ["scoreData"],
  data() {
    return {
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
      downMenu_show: false,
      downMenu_active: "总问题",
      title: "总问题",
      tabData: "",
      caseId: "",
      examNo: "",
      askedData: {},
      askItemData: {},
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getTabdata();
    this.getAskdata();
  },
  methods: {
    getTabdata() {
      this.axios
        .get(`/meta/ask/module`, {
          params: {
            caseId: this.caseId,
          },
        })
        .then((res) => {
          this.tabData = res.data;
        });
    },
    async getAskdata() {
      this.axios.get(`/${this.examNo}/${this.caseId}/asked`).then((res) => {
        this.askedData = res.data;
        this.askItemData = res.data;
      });
    },
    switchIteM(item) {
      this.downMenu_active = item.moduleId;
      this.downMenu_show = false;
      if (item == "总问题") {
        this.title = "总问题";
        this.downMenu_active='总问题'
        return (this.askItemData = this.askedData);
      }
      this.title = item.name;
      this.askItemData = [];
      this.askedData.forEach((ele) => {
        if (ele.typeId == item.moduleId) {
          this.askItemData.push(ele);
        }
      });
    },
  },
};
</script>
