<template>
  <div class="study_watch">
    <div class="study_title">
      <span>望诊</span>
      <div v-for="(item, index) in list" :key="index">
        <input
          type="radio"
          name="watch"
          :value="item.id"
          v-model="typeId"
          @click="seeWatch(item)"
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
      <div class="normal_edit" v-show="!watch_item_data.data">
        {{ title }}的结果均为正常
        <p></p>
      </div>
      <ul class="study_main_item" v-show="watch_item_data.data">
        <li
          v-for="(item, index) in watch_item_data.data"
          :key="index"
          style="height: 40px"
        >
          <span style="width: 30%; padding-left: 10px">{{ item.name }}</span>
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
  name: "study-watch",
  data() {
    return {
      list: [
        { id: 0, name: "望神色形态" },
        { id: 1, name: "望局部" },
        { id: 2, name: "望舌" },
      ],
      caseId: "",
      examNo: "",
      watchData: [],
      watch_item_data: "",
      typeId: "0",
      title: "望神色形态",
    };
  },
  mounted() {
    this.caseId = localStorage.getItem("caseId");
    this.examNo = localStorage.getItem("examNo");
    for (let i = 0; i < 3; i++) {
      this.axios
        .get(`${this.examNo}/${this.caseId}/watched/${i}`)
        .then((res) => {
          this.watchData.push(res);
          if (i == 0) this.watch_item_data = res;
        });
    }
  },
  methods: {
    seeWatch(item) {
      this.title = item.name;
      this.watch_item_data = [];
      this.watch_item_data = this.watchData[item.id];
    },
  },
};
</script>

<style lang="scss">
.study_watch {
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