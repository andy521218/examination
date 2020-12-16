<template>
  <div class="user_study">
    <header>
      <div class="chart_item">
        <span class="chart_item_title">总分(100分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.total) / 100) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.total) }}分</span
          >
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 1 }"
        @click="titleIndex = 1"
      >
        <span class="chart_item_title">问(30分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.ask) / 30) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.ask) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 2 }"
        @click="titleIndex = 2"
      >
        <span class="chart_item_title">望(12分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.watch) / 12) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.watch) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 3 }"
        @click="titleIndex = 3"
      >
        <span class="chart_item_title">闻(3分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.listen) / 3) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.listen) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 4 }"
        @click="titleIndex = 4"
      >
        <span class="chart_item_title">切(5分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.feel) / 5) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.feel) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 5 }"
        @click="titleIndex = 5"
      >
        <span class="chart_item_title">辩证(32分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.disease) / 32) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.disease) }}分
          </span>
        </i-circle>
      </div>
      <div
        class="chart_item"
        :class="{ active: titleIndex == 6 }"
        @click="titleIndex = 6"
      >
        <span class="chart_item_title">治疗(18分)</span>
        <i-circle
          :percent="(Math.floor(scoreData.treat) / 18) * 100"
          class="item"
          stroke-color="rgb(50,168,255)"
          trail-color="rgb(25,72,114)"
        >
          <span class="demo-Circle-inner" style="font-size: 24px">
            {{ Math.floor(scoreData.treat) }}分</span
          >
        </i-circle>
      </div>
    </header>
    <div class="user_main_item">
      <study-ask v-show="titleIndex == 1" :scoreData="scoreData"></study-ask>
      <study-watch v-show="titleIndex == 2"></study-watch>
      <study-listen v-show="titleIndex == 3"></study-listen>
      <study-feel v-show="titleIndex == 4"></study-feel>
      <study-disease v-show="titleIndex == 5"></study-disease>
      <study-treat v-show="titleIndex == 6"></study-treat>
    </div>
  </div>
</template>

<script>
import studyAsk from "../study/studyAsk";
import studyWatch from "../study/studyWatch";
import studyListen from "../study/studyListen";
import studyFeel from "../study/studyFeel";
import studyDisease from "../study/studyDisease";
import studyTreat from "../study/studyTreat";
export default {
  name: "study-main",
  components: {
    studyAsk,
    studyWatch,
    studyListen,
    studyFeel,
    studyDisease,
    studyTreat,
  },
};
</script>

<style lang="scss">
.user_study {
  height: 100%;
  width: 100%;
  padding: 1%;
  header {
    width: 100%;
    height: 210px;
    display: flex;
    .chart_item {
      width: 210px;
      height: 210px;
      margin-right: 28px;
      background: url("../../../assets/public/chart_deafuly.png") no-repeat
        center;
      background-size: 100% 100%;
      .chart_item_title {
        text-align: center;
        line-height: 30px;
        display: inline-block;
        height: 30px;
        width: 130px;
        background: url("../../../assets/public/chart_default_title.png")
          no-repeat center;
        background-size: 100% 100%;
      }

      .item {
        width: 145px !important;
        height: 145px !important;
        margin: 17px 32px;
      }
    }
    .active {
      background: url("../../../assets/public/chart.png") no-repeat center;
      background-size: 100% 100%;
      .chart_item_title {
        background: url("../../../assets/public/chart_title.png") no-repeat
          center;
        background-size: 100% 100%;
      }
    }
    .chart_item:last-child {
      margin-right: 0;
    }
  }
  .user_main_item {
    width: 100%;
    height: 534px;
  }
}
</style>