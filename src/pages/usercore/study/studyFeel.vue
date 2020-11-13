<template>
  <div class="study_feel">
    <div class="study_title">
      <span>望诊</span>
      <div v-for="(item, index) in list" :key="index">
        <input
          type="radio"
          name="listen"
          :value="item.id"
          v-model="typeId"
          @click="seeFeel(item)"
        />
        <label for="">{{ item.name }}</label>
      </div>
    </div>
    <ul class="study_main">
      <li class="study_item_title">
        <span style="width: 30%; padding-left: 10px">问题</span>
        <span style="width: 30%">正确答案</span>
        <span style="width: 35%">我的答案</span>
        <span style="width: 5%"></span>
      </li>
    </ul>
    <div class="scrollbar">
      <div class="normal_edit" v-show="!feel_item_data">
        {{ title }}的结果均为正常
        <p></p>
      </div>
      <ul class="study_main_item" v-show="feel_item_data">
        <li
          v-for="(item, index) in feel_item_data"
          :key="index"
          style="height: 40px"
        >
          <span style="width: 30%; padding-left: 10px">{{
            item.name ? item.name : "按诊"
          }}</span>
          <span style="width: 30%">{{ item.answer }}</span>
          <span style="width: 35%">{{ item.correctAnswer }}</span>
          <span style="width: 5%; height: 20px" class="options">
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
  name: "study-feel",
  data() {
    return {
      list: [
        { id: 0, name: "切诊" },
        { id: 1, name: "按诊" },
      ],
      title: "切诊",
      feel_item_data: [],
      pressData: "",
      pulseData: [],
      typeId: "0",
      caseId: "",
      examNo: "",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    this.getPress();
    this.getpulse();
  },
  methods: {
    seeFeel(item) {
      this.title = item.name;

      if (item.id == "0") {
        return (this.feel_item_data = this.pressData);
      }
      if (item.id == "1") return (this.feel_item_data = this.pulseData);
    },
    getPress() {
      this.axios.get(`/${this.examNo}/${this.caseId}/press`).then((res) => {
        this.pressData = res.data;
      });
    },
    getpulse() {
      this.axios.get(`/${this.examNo}/${this.caseId}/pulse`).then((res) => {
        this.pulseData.push(res.data);
        this.feel_item_data.push(res.data);
      });
    },
  },
};
</script>

<style lang="scss">
.study_feel {
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
  .study_main {
    .study_item_title {
      width: 100%;
      background: rgb(21, 100, 157);
      height: 50px;
      display: flex;
      align-items: center;
    }
  }
}
</style>