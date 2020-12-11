<template>
  <div class="case_tarin">
    <div class="tarin_top">
      <div class="tarin_top_item">
        <div class="tarin_top_item_title">
          <i></i>
          <span>训练完成次数</span>
        </div>
        <div class="train_itm_main">
          <span>{{ report.totalCnt }}</span>
          <span class="train_itm_main_smal">次</span>
        </div>
        <div class="tarin_bottm_border">
          <span>{{ report.totalAllCnt }}次训练完成{{ report.totalCnt }}次</span>
          <p></p>
        </div>
      </div>
      <div class="tarin_top_item">
        <div class="tarin_top_item_title">
          <i class="orange"></i>
          <span>训练总用时</span>
        </div>
        <div class="train_itm_main">
          <span style="color: rgb(251, 138, 94)">{{ report.totalDuring }}</span>
          <span style="color: rgb(251, 138, 94)" class="train_itm_main_smal"
            >分</span
          >
        </div>
        <div class="tarin_bottm_border">
          <span
            >{{ report.totalCnt }}次训练完成{{ report.totalDuring }}分钟</span
          >
          <p class="orange_border"></p>
        </div>
      </div>
      <div class="tarin_top_item">
        <div class="tarin_top_item_title">
          <i></i>
          <span>训练覆盖率</span>
        </div>
        <div class="train_itm_main">
          <i-circle
            :percent="(report.caseCnt / report.totalCaseCnt) * 100"
            class="item"
            :size="150"
            stroke-color="rgb(0,235,245)"
            trail-color="rgb(25,72,114)"
          >
            <span class="demo-Circle-inner" style="font-size: 40px">
              {{
                report.totalCaseCnt
                  ? (report.caseCnt / report.totalCaseCnt) * 100
                  : "0"
              }}%</span
            >
          </i-circle>
        </div>
        <div class="tarin_bottm_border">
          <span
            >{{ report.totalCaseCnt }}个案例训练覆盖率为{{
              report.totalCaseCnt
                ? (report.caseCnt / report.totalCaseCnt) * 100
                : "0"
            }}%</span
          >
          <p></p>
        </div>
      </div>
    </div>
    <div class="tarin_bottom">
      <div class="train_bottom_left">
        <div class="tarin_top_item_title">
          <i class="train_bottom_left_i"></i>
          <span>分数分析</span>
        </div>
        <div class="train_bottom_left_main">
          <div class="train_bottom_left_main_list">
            <span>最低分</span>
            <span>最高分</span>
            <span>平均分</span>
          </div>
          <div class="train_bottom_left_main_block">
            <div v-show="min">
              <img
                src="../../../assets/public/yellowblock.png"
                :style="{ width: min + 'px' }"
                alt=""
              />
              <span style="color: rgb(255, 180, 99)"
                >{{ parseInt(report.minScore) }}分</span
              >
            </div>
            <div v-show="max">
              <img
                src="../../../assets/public/bluenlock.png"
                :style="{ width: max + 'px' }"
                alt=""
              />
              <span style="color: rgb(0, 245, 255)"
                >{{ parseInt(report.maxScore) }}分</span
              >
            </div>
            <div v-show="avg">
              <img
                src="../../../assets/public/violetblokc.png"
                :style="{ width: avg + 'px' }"
                alt=""
              />
              <span style="color: rgb(96, 120, 255)"
                >{{ parseInt(report.avgScore) }}分</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="train_bottom_right" style="margin-left: 30px">
        <div class="tarin_top_item_title">
          <i class="train_bottom_right_i"></i>
          <span>训练成绩分布</span>
          <p class="train_bottom_right_total">共125次</p>
          <p class="train_bottom_right_people">总次数:{{ report.totalCnt }}</p>
        </div>
        <div class="train_bottom_right_main">
          <div class="train_bottom_right_main_box">
            <div>
              <span v-show="report.historgram050"
                >{{ report.historgram050 }}次</span
              >
              <img
                src="../../../assets/public/numberblock.png"
                :style="{ height: historgram050 + 'px' }"
                alt=""
              />
            </div>
            <div>
              <span v-show="report.historgram5060"
                >{{ report.historgram5060 }}次</span
              >
              <img
                src="../../../assets/public/numberblock.png"
                :style="{ height: historgram5060 + 'px' }"
                alt=""
              />
            </div>
            <div>
              <span v-show="report.historgram6070"
                >{{ report.historgram6070 }}次</span
              >
              <img
                src="../../../assets/public/numberblock.png"
                :style="{ height: historgram6070 + 'px' }"
                alt=""
              />
            </div>
            <div>
              <span v-show="report.historgram7080"
                >{{ report.historgram7080 }}次</span
              >
              <img
                src="../../../assets/public/numberblock.png"
                :style="{ height: historgram7080 + 'px' }"
                alt=""
              />
            </div>
            <div>
              <span v-show="report.historgram8090"
                >{{ report.historgram8090 }}次</span
              >
              <img
                src="../../../assets/public/numberblock.png"
                :style="{ height: historgram8090 + 'px' }"
                alt=""
              />
            </div>
            <div>
              <span v-show="report.historgram90"
                >{{ report.historgram90 }}次</span
              >
              <img
                src="../../../assets/public/numberblock.png"
                :style="{ height: historgram90 + 'px' }"
                alt=""
              />
            </div>
          </div>
          <div class="train_bottom_right_main_item">
            <span>50分以下</span>
            <span>51-60分</span>
            <span>61-70分</span>
            <span>71-80分</span>
            <span>81-90分</span>
            <span>91分以上</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "case-tarin",
  props: ["diseaseType"],
  data() {
    return {
      report: {},
      min: 0,
      max: 0,
      avg: 0,
      historgram050: 0,
      historgram5060: 0,
      historgram6070: 0,
      historgram7080: 0,
      historgram8090: 0,
      historgram90: 0,
    };
  },
  mounted() {
    this.getreport();
  },
  methods: {
    getreport() {
      console.log(1);
      this.axios
        .get("/my/train/report", {
          params: {
            diseaseType: this.diseaseType,
          },
        })
        .then((res) => {
          this.report = res.data;
          this.min = (res.data.minScore / 100) * 540;
          this.max = (res.data.maxScore / 100) * 540;
          // this.avg = (res.data.avgScore / 100) * 540;
          this.historgram050 = 0;
          this.historgram5060 = 0;
          this.historgram6070 = 0;
          this.historgram7080 = 0;
          this.historgram90 = 0;
          let totalCnt = res.data.totalCnt;
          if (res.data.historgram050 == null) return;
          this.historgram050 = (res.data.historgram050 / totalCnt) * 200;
          this.historgram5060 = (res.data.historgram5060 / totalCnt) * 200;
          this.historgram6070 = (res.data.historgram6070 / totalCnt) * 200;
          this.historgram7080 = (res.data.historgram7080 / totalCnt) * 200;
          this.historgram90 = (res.data.historgram90 / totalCnt) * 200;
          console.log(res);
        });
    },
  },
};
</script>

<style lang="scss">
.case_tarin {
  margin-top: 1%;
  width: 100%;
  height: 99%;
  .tarin_top {
    width: 100%;
    height: 40%;
    display: flex;
    .tarin_top_item {
      background: url("../../../assets/public/background.png") no-repeat center;
      background-size: 100% 100%;
      flex: 1;
      margin-right: 40px;
      .train_itm_main {
        width: 100%;
        height: 170px;
        text-align: center;
        line-height: 170px;
        span {
          font-weight: bold;
          font-size: 80px;
          color: rgb(0, 235, 245);
        }
        .train_itm_main_smal {
          font-size: 20px;
        }
      }
      .tarin_bottm_border {
        text-align: center;
        font-size: 16px;
        position: relative;
        p {
          position: absolute;
          width: 200px;
          border: 3px rgb(0, 235, 245) solid;
          border-radius: 3px;
          left: 50%;
          margin-left: -100px;
          bottom: -10px;
        }
        .orange_border {
          border: 3px solid rgb(251, 138, 94);
        }
      }
    }
    .tarin_top_item:last-child {
      margin-right: 0;
    }
  }
  .tarin_bottom {
    width: 100%;
    height: 51%;
    margin-top: 2%;
    display: flex;
    .train_bottom_left,
    .train_bottom_right {
      flex: 1;
      background: url("../../../assets/public/background.png") no-repeat center;
      background-size: 100% 100%;
      .train_bottom_left_i {
        background: url("../../../assets/public/25518099.png");
      }
      .train_bottom_right_i {
        background: url("../../../assets/public/34163255.png");
      }
    }
    .train_bottom_left_main,
    .train_bottom_right_main {
      margin: 10px auto;
      width: 85%;
      height: 75%;
    }
    .train_bottom_left_main {
      display: flex;
      .train_bottom_left_main_list {
        width: 80px;
        padding-top: 50px;
        display: flex;
        align-items: center;
        flex-direction: column;
        span {
          height: 50px;
          line-height: 50px;
        }
      }
      .train_bottom_left_main_block {
        height: 90%;
        width: 100%;
        border: 1px solid rgb(9, 124, 168);
        border-top: none;
        border-right: none;
        padding-top: 40px;
        div {
          display: flex;
          margin-top: 25px;
          img {
            width: 0;
            height: 25px;
            border-top-right-radius: 7px;
            border-bottom-right-radius: 7px;
          }
          span {
            margin-left: 10px;
            height: 25px;
            line-height: 25px;
          }
        }
      }
    }
    .train_bottom_right_main {
      .train_bottom_right_main_box {
        margin-left: 15px;
        margin-top: 4%;
        height: 85%;
        width: 100%;
        border: 1px solid rgb(9, 124, 168);
        border-top: none;
        border-right: none;
        display: flex;
        div {
          display: flex;
          flex-direction: column;
          align-self: flex-end;
          flex: 1;
          align-items: center;
          img {
            width: 25px;
            height: 50px;
            border-top-right-radius: 7px;
            border-top-left-radius: 7px;
          }
          span {
            color: rgb(0, 235, 255);
          }
        }
      }
      .train_bottom_right_main_item {
        margin-left: 15px;
        width: 100%;
        display: flex;
        text-align: center;
        span {
          margin-top: 5px;
          flex: 1;
        }
      }
    }
  }
  .tarin_top_item_title {
    margin-top: 3px;
    height: 49px;
    display: flex;
    align-items: center;
    position: relative;
    i {
      margin-left: 20px;
      width: 25px;
      height: 49px;
      background: url("../../../assets/public/0235255.png");
    }
    .orange {
      background: url("../../../assets/public/25113894.png");
    }
    span {
      font-size: 17px;
      margin-left: 10px;
      font-weight: bold;
    }
    .train_bottom_right_total {
      position: absolute;
      right: 20px;
    }
    .train_bottom_right_people {
      position: absolute;
      bottom: -20px;
      left: 50px;
    }
  }
}
</style>

