<template>
  <div class="analysis">
    <div class="main_header">
      <label for>班级</label>
      <select class="select" v-model="classroomsId" @change="getExamName">
        <option value="">请选择班级</option>
        <option
          :value="item.id"
          v-for="(item, index) in classrooms"
          :key="index"
        >
          {{ item.name }}
        </option>
      </select>
      <label for class="big_left">试卷名称</label>
      <select class="select" v-model="testPaperId">
        <option value="">请选择试卷名称</option>
        <option
          :value="item.testPaperId"
          v-for="(item, index) in testPaperData"
          :key="index"
        >
          {{ item.name }}
        </option>
      </select>
      <button class="submit" @click="serarch">检索</button>
    </div>
    <div class="exam_analysis">
      <div class="exam_left">
        <div class="exam_left_top">
          <div class="exam_left_top_peopleTotal analysis_background">
            <div class="tarin_top_item_title">
              <i class="train_bottom_left_i"></i>
              <span>考试参与人数</span>
            </div>
            <img
              v-show="people_show"
              src="../../../assets/public/classroom.png"
              style="margin-top: 30px"
              alt=""
            />
            <div class="exam_left_top_peopleTotal_main">
              <i-circle
                v-show="!people_show"
                :percent="(report.userDone / report.totalUser) * 100"
                class="item"
                :size="190"
                stroke-color="rgb(0,235,245)"
                trail-color="rgb(25,72,114)"
              >
                <span class="demo-Circle-inner" style="font-size: 40px">
                  {{ (report.userDone / report.totalUser) * 100 }}%</span
                >
              </i-circle>
            </div>
            <div class="tarin_bottm_border" v-show="!people_show">
              <span
                >当前参与人数:{{ report.userDone }}/{{ report.totalUser }}</span
              >
              <p style="border: 3px rgb(0, 235, 245) solid"></p>
            </div>
          </div>
          <div class="exam_left_top_averageTime analysis_background">
            <div class="tarin_top_item_title">
              <i class="train_bottom_left_i orange"></i>
              <span>考试平均用时</span>
            </div>
            <img
              v-show="examtime_show"
              src="../../../assets/public/classroom.png"
              style="margin-top: 30px"
              alt=""
            />
            <div class="exam_left_top_averageTime_main" v-show="!examtime_show">
              <span>{{parseInt(report.avgCostTime / 60000) }}</span>
              <span style="font-size: 30px">分</span>
            </div>
            <div class="tarin_bottm_border" v-show="!examtime_show">
              <span
                >{{ report.userDone }}次考试平均用时{{
                  parseInt(report.avgCostTime / 60000)
                }}分钟</span
              >
              <p style="border: 3px rgb(251, 138, 94) solid"></p>
            </div>
          </div>
        </div>
        <div class="exam_left_bottom analysis_background">
          <div class="tarin_top_item_title">
            <i class="train_bottom_left_i yellow"></i>
            <span>分数分析</span>
          </div>
          <img
            v-show="avgnumber_show"
            style="margin-top: 5%"
            src="../../../assets/public/classroom.png"
            alt=""
          />
          <div class="exam_left_bottom_main" v-show="!avgnumber_show">
            <div class="exam_left_bottom_main_title">
              <span>最低分</span>
              <span>最高分</span>
              <span>平均分</span>
            </div>
            <div class="exam_left_bottom_main_block">
              <div class="exam_left_bottom_main_block_item">
                <img
                  src="../../../assets/public/yellowblock.png"
                  :style="{ width: min + 'px' }"
                  alt=""
                />
                <span style="color: rgb(255, 180, 99)" v-show="min"
                  >{{ parseInt(report.minScore) }}分</span
                >
              </div>
              <div class="exam_left_bottom_main_block_item">
                <img
                  src="../../../assets/public/bluenlock.png"
                  :style="{ width: max + 'px' }"
                  alt=""
                />
                <span style="color: rgb(0, 235, 255)" v-show="max"
                  >{{ parseInt(report.maxScore) }}分</span
                >
              </div>
              <div class="exam_left_bottom_main_block_item">
                <img
                  src="../../../assets/public/violetblokc.png"
                  :style="{ width: avg + 'px' }"
                  alt=""
                />
                <span style="color: rgb(171, 130, 255)" v-show="avg"
                  >{{ parseInt(report.avgScore) }}分</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="exam_right analysis_background">
        <div class="tarin_top_item_title">
          <i class="train_bottom_left_i blue" style="margin-top: 10px"></i>
          <span>考试成绩分布</span>
        </div>
        <img
          v-show="examNumber_show"
          src="../../../assets/public/classroom.png"
          style="margin-top: 25%"
          alt=""
        />
        <div class="exam_right_main" v-show="!examNumber_show">
          <div class="exam_right_main_block">
            <div class="exam_right_main_block_item">
              <span v-show="historgram050">{{ report.historgram050 }}人</span>
              <img
                :style="{ height: historgram050 + 'px' }"
                src="../../../assets/public/numberblock.png"
                alt=""
              />
            </div>
            <div class="exam_right_main_block_item">
              <span v-show="historgram5060">{{ report.historgram5060 }}人</span>
              <img
                :style="{ height: historgram5060 + 'px' }"
                src="../../../assets/public/numberblock.png"
                alt=""
              />
            </div>
            <div class="exam_right_main_block_item">
              <span v-show="historgram6070">{{ report.historgram6070 }}人</span>
              <img
                :style="{ height: historgram6070 + 'px' }"
                src="../../../assets/public/numberblock.png"
                alt=""
              />
            </div>
            <div class="exam_right_main_block_item">
              <span v-show="historgram8090">{{ report.historgram7080 }}人</span>
              <img
                :style="{ height: historgram7080 + 'px' }"
                src="../../../assets/public/numberblock.png"
                alt=""
              />
            </div>
            <div class="exam_right_main_block_item">
              <span v-show="historgram8090">{{ report.historgram8090 }}人</span>
              <img
                :style="{ height: historgram8090 + 'px' }"
                src="../../../assets/public/numberblock.png"
                alt=""
              />
            </div>
            <div class="exam_right_main_block_item">
              <span v-show="historgram90">{{ report.historgram90 }}人</span>
              <img
                :style="{ height: historgram90 + 'px' }"
                src="../../../assets/public/numberblock.png"
                alt=""
              />
            </div>
          </div>
          <div class="exam_right_main_title">
            <span>50分以下</span>
            <span>51分-60分</span>
            <span>61分-70分</span>
            <span>71分-80分</span>
            <span>81分-90分</span>
            <span>91分以上</span>
          </div>
        </div>
        <div class="exam_right_bottom" v-show="!examNumber_show">
          <div class="tarin_bottm_border">
            <span>共{{ report.userDone }}人</span>
            <p style="border: 3px rgb(34, 163, 255) solid"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "exam-analysis",
  data() {
    return {
      classroomsId: "",
      testPaperId: "",
      people_show: true,
      examtime_show: true,
      avgnumber_show: true,
      examNumber_show: true,
      classrooms: {},
      examNameData: {},
      testPaperData: [],
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
    this.getClassrooms();
  },
  methods: {
    getClassrooms() {
      this.axios
        .get("/classrooms", {
          params: {
            size: "500",
            page: "1",
          },
        })
        .then((res) => {
          this.classrooms = res.data.rows;
        });
    },
    getExamName() {
      this.axios
        .get(`/case/report/testpaper/${this.classroomsId}`)
        .then((res) => {
          this.testPaperData = res.data;
        });
    },
    serarch() {
      this.axios
        .get("/case/report/exam", {
          params: {
            classroomId: this.classroomsId,
            testPaperId: this.testPaperId,
          },
        })
        .then((res) => {
          this.report = res.data;
          //人数
          if (!res.data.totalUser) {
            this.people_show = true;
          } else {
            this.people_show = false;
          }
          //时间
          if (!res.data.avgCostTime) {
            this.examtime_show = true;
          } else {
            this.examtime_show = false;
          }
          //分数分析
          if (res.data.minScore == null) {
            this.avgnumber_show = true;
          } else {
            this.avgnumber_show = false;
            this.min = (res.data.minScore / 100) * 575;
            this.max = (res.data.maxScore / 100) * 575;
            this.avg = (res.data.avgScore / 100) * 575;
          }

          //考试成绩分布
          if (res.data.historgram050 == null) {
            this.examNumber_show = true;
          } else {
            this.examNumber_show = false;
            this.historgram050 =
              (res.data.historgram050 / res.data.totalUser) * 440;
            this.historgram5060 =
              (res.data.historgram5060 / res.data.totalUser) * 440;
            this.historgram6070 =
              (res.data.historgram6070 / res.data.totalUser) * 440;
            this.historgram7080 =
              (res.data.historgram7080 / res.data.totalUser) * 440;
            this.historgram8090 =
              (res.data.historgram8090 / res.data.totalUser) * 440;
            this.historgram90 =
              (res.data.historgram90 / res.data.totalUser) * 440;
          }
        });
    },
  },
};
</script>

<style lang="scss">
.analysis {
  width: 100%;
  height: 100%;
  //公共样式
  .analysis_background {
    background: url("../../../assets/public/background.png") no-repeat center;
    background-size: 100% 100%;
  }
  .tarin_bottm_border {
    text-align: center;
    font-size: 16px;
    position: relative;
    p {
      position: absolute;
      width: 220px;
      border-radius: 3px;
      left: 50%;
      margin-left: -110px;
      bottom: -10px;
    }
  }
  .tarin_top_item_title {
    height: 49px;
    display: flex;
    align-items: center;
    position: relative;
    i {
      margin-left: 20px;
      margin-top: 5px;
      width: 25px;
      height: 49px;
      background: url("../../../assets/public/0235255.png");
    }
    .orange {
      background: url("../../../assets/public/25113894.png");
    }
    .yellow {
      background: url("../../../assets/public/25518099.png");
    }
    .blue {
      background: url("../../../assets/public/34163255.png");
    }
    span {
      font-size: 17px;
      margin-left: 10px;
      font-weight: bold;
    }
  }
  //结束
  .main_header {
    justify-content: flex-end;
  }
  .exam_analysis {
    margin: 0 auto;
    margin-top: 1%;
    width: 92%;
    height: 85%;
    display: flex;
    position: relative;
    .exam_left {
      width: 49%;
      height: 98%;
      .exam_left_top {
        width: 100%;
        height: 50%;
        display: flex;
        text-align: center;
        .exam_left_top_peopleTotal {
          width: 48%;
          height: 100%;
          .exam_left_top_peopleTotal_main {
            width: 100%;
            height: 73%;
          }
        }
        .exam_left_top_averageTime {
          margin-left: 4%;
          width: 48%;
          height: 100%;
          .exam_left_top_averageTime_main {
            width: 100%;
            height: 73%;
            span {
              line-height: 208px;
              font-weight: bold;
              font-size: 80px;
              color: rgb(251, 138, 94);
            }
          }
        }
      }
      .exam_left_bottom {
        margin-top: 3%;
        width: 100%;
        height: 46%;
        text-align: center;
        .exam_left_bottom_main {
          margin: 3% auto;
          width: 90%;
          height: 60%;
          display: flex;
          .exam_left_bottom_main_title {
            width: 10%;
            height: 100%;
            display: flex;
            line-height: 55px;
            flex-direction: column;
          }
          .exam_left_bottom_main_block {
            width: 100%;
            height: 100%;
            border: 1px solid rgb(9, 124, 168);
            border-top: none;
            border-right: none;
            .exam_left_bottom_main_block_item {
              display: flex;
              height: 55px;
              align-items: center;
              img {
                height: 25px;
                border-top-right-radius: 7px;
                border-bottom-right-radius: 7px;
                margin-right: 10px;
              }
            }
          }
        }
      }
    }
    .exam_right {
      width: 49%;
      height: 98%;
      margin-left: 2%;
      text-align: center;
      .exam_right_main {
        width: 80%;
        height: 79%;
        margin: 5% auto 0 auto;
        .exam_right_main_block {
          width: 100%;
          height: 90%;
          border: 1px solid rgb(9, 124, 168);
          border-top: none;
          border-right: none;
          display: flex;
          align-items: flex-end;
          .exam_right_main_block_item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              height: 0px;
              width: 25px;
              border-top-right-radius: 7px;
              border-top-left-radius: 7px;
            }
          }
        }
        .exam_right_main_title {
          width: 100%;
          height: 10%;
          display: flex;
          align-items: center;
          span {
            flex: 1;
          }
        }
      }
      .exam_right_bottom {
        width: 80%;
        margin: 0 auto;
      }
    }
  }
}
</style>