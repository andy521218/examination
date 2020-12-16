<template>
  <div class="teacher case release">
    <div class="main_mask" v-if="mask"></div>
    <!-- 发布考试 -->
    <div class="edit release_exam" v-show="releaseExam_show">
      <div class="edit_title">
        <span class="title">发布考试</span>
        <span class="edit_switch" @click="close"></span>
      </div>
      <ul>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">考试名称:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-model="examData.name"
            placeholder="请输入考试名称"
          />
          <p class="edit_tips">{{ nameText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">考试班级:</span>
          </div>
          <select class="select" v-model="examData.rommsId">
            <option value="默认">请选择班级</option>
            <option
              v-for="(item, index) in classrooms"
              :key="index"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
          <p class="edit_tips">{{ roomsText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">开始时间:</span>
          </div>
          <el-date-picker
            v-model="starttime"
            type="datetime"
            v-on:blur="start"
            placeholder="选择开始时间"
          >
          </el-date-picker>
          <p class="edit_tips">{{ startText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">结束时间:</span>
          </div>
          <el-date-picker
            v-model="endtime"
            type="datetime"
            v-on:blur="end"
            placeholder="选择结束时间"
          >
          </el-date-picker>
          <p class="edit_tips">{{ endText }}</p>
        </li>
        <li>
          <div class="edit_left">
            <span class="edit_red">*</span>
            <span class="edit_text">考试时长:</span>
          </div>
          <input
            type="text"
            class="text_box"
            v-model="examData.examTime"
            placeholder="请输入考试时长"
          />
          <p class="edit_tips">{{ examText }}</p>
        </li>
      </ul>
      <div class="number scrollbar">
        <div class="number_itps">
          <p>案例总分值累计应为100分</p>
        </div>
        <div class="number_title">
          <span>案例</span>
          <span>分值</span>
        </div>
        <div class="ul_scrollbar">
          <ul class="case_item">
            <li v-for="(item, index) in check" :key="index">
              <span>{{ item }}</span>
              <input
                type="text"
                class="text_box"
                v-model="examCaseNumber[item]"
                placeholder="请输入分数"
                @change="totalNumber"
              />
            </li>
          </ul>
        </div>
        <div class="bottom_text">
          <p>目前案例分数:</p>
          {{ examNumber }}分
        </div>
      </div>
      <div class="edit_btn_box">
        <button class="edit_cancel" @click="close">取消</button>
        <button class="edit_submit" @click="submit">确定</button>
      </div>
    </div>
    <div class="main_header">
      <button class="add" @click="add" style="margin-right: 1020px">
        发布考试
      </button>
      <label for>病系</label>
      <select v-model="diseaseType" class="select">
        <option value="默认">请选择病系</option>
        <option v-for="(item, index) in list" :key="index" :value="item.id">
          {{ item.name }}
        </option>
      </select>
      <button class="submit" @click="getManage('1')">检索</button>
    </div>
    <div class="main_table">
      <ul class="caseList">
        <li v-for="(item, index) in manageData" :key="index">
          <div class="case_top">
            <img src="../../assets/public/timg.png" alt="" />
            <div class="state">
              <input
                type="checkbox"
                v-model="check"
                name="caseId"
                :value="item.name"
              />
              <div class="state_item">
                <div class="item_three" v-if="item.exam">考</div>
              </div>
            </div>
            <!-- <div class="bottom release">
              <span>已发布</span>
            </div> -->
          </div>
          <div class="case_bottom">
            <span>姓名: {{ item.name }}</span>
            <span>性别: {{ item.gender ? "男" : "女" }}</span>
            <span>年龄: {{ item.age }}岁</span>
          </div>
        </li>
      </ul>
    </div>
    <main-itps v-show="main_show"></main-itps>
    <turn-page
      ref="turnPage"
      v-show="total > size"
      :totaltotal="Number(total)"
      :size="Number(size)"
      @getData="getManage"
    ></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
import mainItps from "../../components/mainItps";
export default {
  name: "teacher-release",
  components: {
    turnPage,
    mainItps,
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: "心系病",
        },
        {
          id: 2,
          name: "肝系病",
        },
        {
          id: 3,
          name: "脾胃病",
        },
        {
          id: 4,
          name: "肺系病",
        },
        {
          id: 5,
          name: "肾系病",
        },
      ],
      starttime: "",
      endtime: "",
      diseaseType: "",
      manageData: {},
      total: "",
      size: "10",
      caseId: "",
      releaseExam_show: false,
      mask: false,
      check: [],
      searchOptions: "",
      screenWidth: "",
      examData: {
        rommsId: "默认",
      },
      classrooms: "",
      nameText: "",
      roomsText: "",
      startText: "",
      endText: "",
      examText: "",
      examNumber: 0,
      flag: true,
      examCase: [],
      examCaseNumber: {},
      main_show: false,
    };
  },
  mounted() {
    localStorage.removeItem("caseMenuId");
    this.getManage();
    this.getClassroom();
    let timeout;
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (this.screenWidth >= "1900") {
          this.size = "10";
          this.getManage();
        } else {
          this.size = "8";
          this.getManage();
        }
      }, 500);
    };
  },
  methods: {
    add() {
      if (this.check.length == "0")
        return this.$Message.error("至少选择一下案例");
      this.mask = true;
      this.releaseExam_show = true;
    },
    start() {
      this.flag = true;
      this.startText = "";
      this.endText = "";
      this.starttime = new Date(this.starttime).getTime();
      let time = new Date().getTime();
      if (this.starttime < time) {
        this.startText = "开始时间早于当前时间";
        this.flag = false;
        return;
      }
      if (!this.endtime) return;
      if (this.starttime > this.endtime) {
        this.endText = "结束时间早于开始时间";
        this.flag = false;
        return;
      }
    },
    end() {
      this.flag = true;
      this.startText = "";
      this.endText = "";
      this.endtime = new Date(this.endtime).getTime();
      if (!this.starttime) return;
      let time = new Date().getTime();
      if (this.starttime < time) {
        this.startText = "开始时间早于当前时间";
        this.flag = false;
        return;
      }
      if (this.starttime > this.endtime) {
        this.endText = "结束时间早于开始时间";
        this.flag = false;
        return;
      }
    },
    close() {
      this.mask = false;
      this.check = [];
      this.examCaseNumber = {};
      this.examData = {
        rommsId: "默认",
      };
      this.starttime = "";
      this.endtime = "";
      this.releaseExam_show = false;
    },
    //获取案例列表
    getManage(page = "1") {
      let isExam = true,
        isTrain = true,
        isCompelete = "";
      this.axios
        .get("/case/manage", {
          params: {
            diseaseType: this.diseaseType,
            isExam: isExam,
            isTrain: isTrain,
            isCompelete: isCompelete,
            size: this.size,
            page: page,
          },
        })
        .then((res) => {
          if (!res.data.rows) {
            this.main_show = true;
          } else {
            this.main_show = false;
          }
          this.manageData = res.data.rows;
          this.total = res.data.total;
        });
    },
    //获取班级列表
    getClassroom() {
      this.axios
        .get("/classrooms", {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          this.classrooms = res.data.rows;
        });
    },
    //提交
    submit() {
      if (!this.examData.name) {
        return (this.nameText = "请输入考试名称");
      } else {
        this.nameText = "";
      }
      if (!this.examData.rommsId || this.examData.rommsId == "默认") {
        return (this.roomsText = "请选择班级");
      } else {
        this.roomsText = "";
      }
      if (!this.starttime) {
        return (this.startText = "请选择开始时间");
      } else {
        this.startText = "";
      }
      if (!this.endtime) {
        return (this.endText = "请选择结束时间");
      } else {
        this.endText = "";
      }
      if (!this.examData.examTime) {
        this.examText = "请输入考试时长";
        return;
      }
      if (isNaN(this.examData.examTime)) {
        this.examText = "请输入正确的数字";
        return;
      }
      this.examText = "";
      this.start();
      this.end();
      let obj = Object.keys(this.examCaseNumber);
      if (obj.length > 0) {
        this.uploadexam();
      } else {
        this.check.forEach((ele) => {
          this.examCaseNumber[ele] = "";
        });
        this.uploadexam();
      }
    },
    //上传发布考试
    uploadexam() {
      let obj = Object.keys(this.examCaseNumber).length;
      if (obj != this.check.length) {
        this.$Message.error("请检查案例分值不可为空");
        return;
      }
      for (const key in this.examCaseNumber) {
        if (!this.examCaseNumber[key]) {
          this.$Message.error("请检查案例分值不可为空");
          return;
        }
      }
      if (this.examNumber != "100") {
        this.$Message.error("请重新设置各项案例分数,总分应为100分!");
        return;
      }
      let cases = [];
      for (let key in this.examCaseNumber) {
        this.manageData.forEach((item) => {
          if (item.name == key) {
            cases.push({
              caseId: item.caseId,
              score: this.examCaseNumber[key],
            });
          }
        });
      }
      this.http
        .post("/exam", {
          cases,
          classes: [
            {
              beginTime: this.starttime,
              classroomId: this.examData.rommsId,
              endTime: this.endtime,
              duringLimit: this.examData.examTime,
            },
          ],
          name: this.examData.name,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.close();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    // 计算分数
    totalNumber() {
      this.examNumber = 0;
      for (const key in this.examCaseNumber) {
        this.examNumber += Number(this.examCaseNumber[key]);
      }
    },
  },
};
</script>

<style lang="scss">
.case {
  .release_exam {
    width: 470px;
    background: url("../../assets/public/box_1.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    z-index: 9;
    left: 50%;
    margin-left: -235px;
    // z-index: 99999;
    .number {
      margin-left: 13%;
      margin-top: 20px;
      width: 72%;
      span {
        display: inline-block;
        width: 50%;
        text-align: center;
      }
      span:first-child {
        border-right: 1px solid rgb(0, 235, 255);
      }
      .number_title {
        border: 1px solid rgb(0, 235, 255);
        border-bottom: none;
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
      }
      .ul_scrollbar {
        border: 1px solid rgb(0, 235, 255);
        border-bottom: none;
        .case_item {
          width: 100%;
          margin-left: 0;
          max-height: 180px;
          overflow-y: auto;
          li {
            margin-top: 0;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid rgb(0, 235, 255);
            .text_box {
              text-align: center;
              padding-left: 0;
              width: 50%;
              height: 28px;
              border: none;
            }
          }
        }
      }
      .bottom_text {
        margin-top: 10px;
        display: flex;

        justify-content: space-between;
      }
      .number_itps {
        display: flex;

        justify-content: space-between;
      }
    }
  }
  .main_table .caseList li .case_top .release {
    width: 60px;
    height: 50px;
    left: 78%;
    background: url("../../assets/public/circle.png") no-repeat;
    padding-left: 10px;
    padding-top: 8px;
    span {
      font-size: 14px;
      color: rgb(0, 235, 255);
    }
  }
  .el-date-editor
    .el-input
    .el-input--prefix
    .el-input--suffix
    .el-date-editor--datetime {
    z-index: 999999;
  }
  .el-input__inner {
    background: rgb(5, 61, 128);
    border: 1px solid rgb(0, 235, 255);
    color: rgb(255, 255, 255);
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: rgb(255, 255, 255);
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgb(255, 255, 255);
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: rgb(255, 255, 255);
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgb(255, 255, 255);
  }
  ::-webkit-scrollbar {
    width: 0;
  }
}
.release {
  .main_mask {
    z-index: 9;
  }
}
</style>