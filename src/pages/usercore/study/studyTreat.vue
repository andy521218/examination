<template>
  <div class="study_treat">
    <div class="study_title">
      <span>治疗</span>
      <div v-for="(item, index) in list" :key="index">
        <input
          type="radio"
          name="Feel"
          :value="item.id"
          v-model="typeId"
          @click="seeFeel(item)"
        />
        <label for="">{{ item.name }}</label>
      </div>
    </div>
    <ul class="study_main">
      <li class="study_item_title">
        <span style="width: 48%; padding-left: 20px">正确答案</span>
        <span style="width: 48%; padding-left: 5px">我的答案</span>
        <span style="width: 4%"></span>
      </li>
    </ul>
    <!-- 治则治法 -->
    <div class="scrollbar">
      <ul class="study_main_item" v-show="showId == '1'">
        <li style="height: 40px" v-for="(item, index) in showData" :key="index">
          <span style="width: 48%">{{ item.correctAnswer }}</span>
          <span style="width: 48%">{{ item.answer }}</span>
          <span style="width: 4%; height: 20px" class="options">
            <i class="right" v-show="item.correct"></i>
            <i class="error" v-show="!item.correct"></i
          ></span>
        </li>
      </ul>
    </div>
    <!-- 遣方用药 -->
    <div class="scrollbar">
      <ul class="study_main_item" v-show="showId == '2'">
        <li style="height: 40px" v-for="(item, index) in showData" :key="index">
          <span style="width: 48%">{{ item.agentiaCorrectAnswer }}</span>
          <span style="width: 48%">{{ item.agentiaAnswer }}</span>
          <span style="width: 4%; height: 20px" class="options">
            <i class="right" v-show="item.agentiaCorrectAnswer"></i>
            <i class="error" v-show="!item.agentiaCorrectAnswer"></i
          ></span>
        </li>
      </ul>
    </div>
    <!-- 药物组成 -->
    <div class="scrollbar">
      <ul class="study_main_item" v-show="showId == '3'">
        <li style="height: 40px" v-for="(item, index) in showData" :key="index">
          <span style="width: 48%">{{ item.correctDruggeryName }}</span>
          <span style="width: 48%">{{ item.druggeryName }}</span>
          <span style="width: 4%; height: 20px" class="options">
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
  name: "study-treat",
  data() {
    return {
      list: [
        { id: 1, name: "治则治法" },
        { id: 2, name: "遣方用药" },
        { id: 3, name: "药物组成" },
      ],
      typeId: "1",
      caseId: "",
      examNo: "",
      showData: [],
      showId: "1",
      trearData: [],
      agentiaData: {},
      trearCorrectData: [],
      druggeriesData: [],
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getTreat();
    this.getAgentia();
  },
  methods: {
    seeFeel(item) {
      this.showId = item.id;
      if (item.id == "1") {
        this.showData = this.trearData;
      }
      if (item.id == "2") {
        this.showData = this.agentiaData;
        this.showData[0].agentiaCorrectAnswer = this.trearCorrectData[0].name;
      }
      if (item.id == "3") {
        this.showData = this.agentiaData[0].druggeries;
      }
    },
    getTreat() {
      this.axios.get(`${this.examNo}/${this.caseId}/treat`).then((res) => {
        this.trearData.push(res.data);
      });
    },
    getAgentia() {
      this.axios.get(`${this.examNo}/${this.caseId}/agentia`).then((res) => {
        this.agentiaData = res.data;
      });
    },
    getTreatCorrect() {
      this.axios
        .get(`${this.examNo}/${this.caseId}/treat/correct`)
        .then((res) => {
          this.trearCorrectData = res.data.agentias;
          // let obj = this.agentiaData[0].druggeries;
          // let obj2 = res.data.agentias[0].druggeries;
        });
    },
  },
  watch: {
    agentiaData: function () {
      this.getTreatCorrect();
    },
  },
};
</script>

<style lang="scss">
.study_treat {
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