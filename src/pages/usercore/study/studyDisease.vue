<template>
  <div class="study_disease">
    <div class="study_title">
      <span>辩证</span>
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
    <ul class="study_main">
      <li class="study_item_title">
        <span style="width: 10%; padding-left: 10px">正确答案</span>
        <span style="width: 10%">我的答案</span>
        <span style="width: 5%"></span>
        <div class="downMenu" style="width: 65%">
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
        <span style="width: 5%; padding-left: 10px">正确答案</span>
        <span style="width: 5%; padding-left: 10px">我的答案</span>
      </li>
    </ul>
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
      tabData: "",
      typeId: "",
      title: "总问题",
      downMenu_active: "总问题",
      downMenu_show: false,
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getTabdata();
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
    switchIteM(item) {
      console.log(item);
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
  }
}
</style>