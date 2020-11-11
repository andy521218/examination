<template>
  <div class="home" style="width: 1920px">
    <header class="home_header">
      <logo></logo>
      <user></user>
    </header>
    <div class="user_core" v-if="this.$store.state.flag">
      <div class="user_menu">
        <menuTab></menuTab>
      </div>
      <div class="user_main">
        <div class="return" @click="$router.push('userrecord')">
          <i-con type="ios-arrow-round-back" size="40" />
          <span>返回</span>
        </div>
        <div class="user_study">
          <header>
            <div
              class="chart_item"
              :class="{ active: titleIndex == 0 }"
              @click="titleIndex = 0"
            >
              <span class="chart_item_title">总分(100分)</span>
              <i-circle
                :percent="(scoreData.total / 100) * 100"
                class="item"
                stroke-color="rgb(50,168,255)"
                trail-color="rgb(25,72,114)"
              >
                <span class="demo-Circle-inner" style="font-size: 24px">
                  {{ Math.round(scoreData.total) }}分</span
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
                :percent="(scoreData.ask / 30) * 100"
                class="item"
                stroke-color="rgb(50,168,255)"
                trail-color="rgb(25,72,114)"
              >
                <span class="demo-Circle-inner" style="font-size: 24px">
                  {{ Math.round(scoreData.ask) }}分
                </span>
              </i-circle>
            </div>
            <div
              class="chart_item"
              :class="{ active: titleIndex == 2 }"
              @click="titleIndex = 2"
            >
              <span class="chart_item_title">望(20分)</span>
              <i-circle
                :percent="(scoreData.watch / 20) * 100"
                class="item"
                stroke-color="rgb(50,168,255)"
                trail-color="rgb(25,72,114)"
              >
                <span class="demo-Circle-inner" style="font-size: 24px">
                  {{ Math.round(scoreData.watch) }}分
                </span>
              </i-circle>
            </div>
            <div
              class="chart_item"
              :class="{ active: titleIndex == 3 }"
              @click="titleIndex = 3"
            >
              <span class="chart_item_title">闻(20分)</span>
              <i-circle
                :percent="(scoreData.listen / 20) * 100"
                class="item"
                stroke-color="rgb(50,168,255)"
                trail-color="rgb(25,72,114)"
              >
                <span class="demo-Circle-inner" style="font-size: 24px">
                  {{ Math.round(scoreData.listen) }}分
                </span>
              </i-circle>
            </div>
            <div
              class="chart_item"
              :class="{ active: titleIndex == 4 }"
              @click="titleIndex = 4"
            >
              <span class="chart_item_title">切(20分)</span>
              <i-circle
                :percent="(scoreData.feel / 20) * 100"
                class="item"
                stroke-color="rgb(50,168,255)"
                trail-color="rgb(25,72,114)"
              >
                <span class="demo-Circle-inner" style="font-size: 24px">
                  {{ Math.round(scoreData.feel) }}分
                </span>
              </i-circle>
            </div>
            <div
              class="chart_item"
              :class="{ active: titleIndex == 5 }"
              @click="titleIndex = 5"
            >
              <span class="chart_item_title">辩证(10分)</span>
              <i-circle
                :percent="(scoreData.disease / 10) * 100"
                class="item"
                stroke-color="rgb(50,168,255)"
                trail-color="rgb(25,72,114)"
              >
                <span class="demo-Circle-inner" style="font-size: 24px">
                  {{ Math.round(scoreData.disease) }}分
                </span>
              </i-circle>
            </div>
            <div
              class="chart_item"
              :class="{ active: titleIndex == 6 }"
              @click="titleIndex = 6"
            >
              <span class="chart_item_title">治疗(10分)</span>
              <i-circle
                :percent="(scoreData.treat / 10) * 100"
                class="item"
                stroke-color="rgb(50,168,255)"
                trail-color="rgb(25,72,114)"
              >
                <span class="demo-Circle-inner" style="font-size: 24px">
                  {{ Math.round(scoreData.treat) }}分</span
                >
              </i-circle>
            </div>
          </header>
          <div class="user_main_item">
            <study-ask v-show="titleIndex == 1"></study-ask>
            <study-watch v-show="titleIndex == 2"></study-watch>
            <study-listen v-show="titleIndex == 3"></study-listen>
            <study-feel v-show="titleIndex == 4"></study-feel>
            <study-disease v-show="titleIndex == 5"></study-disease>
            <study-treat v-show="titleIndex == 6"></study-treat>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from "../../../components/user";
import menuTab from "../../../components/menu";
import logo from "../../../components/logo";
import studyAsk from "../study/studyAsk";
import studyWatch from "../study/studyWatch";
import studyListen from "../study/studyListen";
import studyFeel from "../study/studyFeel";
import studyDisease from "../study/studyDisease";
import studyTreat from "../study/studyTreat";
export default {
  name: "user-study",
  components: {
    user,
    menuTab,
    logo,
    studyAsk,
    studyWatch,
    studyListen,
    studyFeel,
    studyDisease,
    studyTreat,
  },
  data() {
    return {
      examNo: "",
      caseId: "",
      scoreData: "",
      titleIndex: "1",
    };
  },
  mounted() {
    this.examNo = localStorage.getItem("examNo");
    this.caseId = localStorage.getItem("caseId");
    this.getscore();
  },
  methods: {
    getscore() {
      this.axios.get(`/${this.examNo}/${this.caseId}/score`).then((res) => {
        this.scoreData = res.data;
      });
    },
  },
};
</script>

<style lang="scss">
.return {
  position: absolute;
  top: -40px;
  display: flex;
  height: 40px;
  line-height: 40px;
}
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