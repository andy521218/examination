<template>
  <div class="home" style="min-width: 1920px">
    <div class="main_mask" v-if="fractionshow"></div>
    <header class="home_header">
      <logo :exam="exam"></logo>
      <div class="home_user">
        <div class="home_case_left">
          <div class="stop" v-if="authority == 'STUDENT' && exam == null">
            <img
              src="../../../assets/public/stop.png"
              alt=""
              @click="stopTime"
            />
            <span @click="stopTime">暂停</span>
          </div>
          <div class="sonserve" @click="complete" v-if="authority == 'STUDENT'">
            <img src="../../../assets/public/sonserve.png" alt="" />
            <span>完成</span>
          </div>
          <div
            class="sonserve"
            @click="saveCase()"
            v-if="authority == 'TEACHER'"
          >
            <img src="../../../assets/public/sonserve.png" alt="" />
            <span>完成</span>
          </div>
          <!-- <div class="close">
            <img src="../../../assets/public/close.png" alt="" />
            <span>取消</span>
          </div> -->
          <div
            class="sonserve"
            @click="saveCase_show = true"
            v-if="authority == 'TEACHER'"
          >
            <img src="../../../assets/public/sonserve.png" alt="" />
            <span>撤销</span>
          </div>
        </div>
      </div>
    </header>
    <div class="case_container">
      <div class="case_menu">
        <ul>
          <li
            v-for="(item, index) in item"
            :key="index"
            :class="{ active: bgIndex == index }"
            @click="routeLink(index)"
          >
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="case_main">
        <!-- 提交训练得分 -->
        <div class="edit_dele" v-if="number_show">
          <div class="edit">
            <div class="edit_title">
              <span class="title">本次{{ exam ? "考试" : "训练" }}得分</span>
            </div>
            <ul>
              <li style="text-align: center">
                <span style="font-size: 50px; font-weight: bold">{{
                  Math.round(fraction)
                }}</span
                >分
              </li>
            </ul>
            <div class="edit_btn_box">
              <button
                class="edit_submit"
                style="margin-right: 40px"
                @click="$router.push('index')"
              >
                返回首页
              </button>
              <button
                class="edit_submit"
                v-if="!exam"
                @click="$router.push('userrecord')"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>

        <!-- 提交确认 -->
        <div class="edit_dele" v-if="confirm_show" style="z-index: 99999">
          <div class="edit">
            <div class="edit_title">
              <span class="title" style="width: 100px">提示</span>
            </div>
            <ul>
              <li style="text-align: center">
                <span>您确认提交本次{{ exam ? "考试" : "训练" }}吗?</span>
              </li>
            </ul>
            <div class="edit_btn_box">
              <button
                class="edit_submit"
                style="margin-right: 40px"
                @click="
                  confirm_show = false;
                  fractionshow = false;
                "
              >
                取消
              </button>
              <button class="edit_submit" @click="submit">确认</button>
            </div>
          </div>
        </div>
        <!-- 暂停确认 -->
        <div class="edit_dele" v-if="stop_show">
          <div class="edit">
            <div class="edit_title">
              <span class="title" style="width: 80px">已暂停</span>
            </div>
            <ul>
              <li style="text-align: center">
                <p style="font-weight: bold">案例训练已暂停</p>
              </li>
            </ul>
            <div class="edit_btn_box">
              <button
                class="edit_submit"
                style="margin-right: 40px"
                @click="$router.push('index')"
              >
                返回首页
              </button>
              <button class="edit_submit" @click="startTime">继续训练</button>
            </div>
          </div>
        </div>
        <!-- 返回首页 -->
        <div class="edit_dele" v-if="index_show">
          <div class="edit">
            <div class="edit_title">
              <span class="title" style="width: 80px">提 示</span>
            </div>
            <ul>
              <li style="text-align: center">
                <p style="font-weight: bold">确定返回首页并暂停案例训练吗</p>
                <span style="font-weight: bold"
                  >（您可以在个人中心-学习记录中继续完成没有完成的训练）</span
                >
              </li>
            </ul>
            <div class="edit_btn_box">
              <button
                class="edit_submit"
                style="margin-right: 40px"
                @click="$router.push('index')"
              >
                返回首页
              </button>
              <button class="edit_submit" @click="startTime">继续训练</button>
            </div>
          </div>
        </div>
        <!-- 撤销案例 -->
        <div class="edit_dele" v-if="saveCase_show">
          <div class="edit">
            <div class="edit_title">
              <span class="title">提示</span>
            </div>
            <ul>
              <li style="text-align: center">
                <span>确定放弃本次修改吗?</span>
              </li>
            </ul>
            <div class="edit_btn_box">
              <button class="edit_cancel" @click="saveCase_show = false">
                取消
              </button>
              <button class="edit_submit" @click="revokeCase">确定</button>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <div class="timer" v-if="exam">
      <i></i>
      <span v-if="hour >= 10">{{ hour }}:</span>
      <span v-else>0{{ hour }}:</span>
      <span v-if="mint >= 10">{{ mint }}:</span>
      <span v-else>0{{ mint }}:</span>
      <span v-if="second >= 10">{{ second }}</span>
      <span v-else>0{{ second }}</span>
    </div>
  </div>
</template>

<script>
import logo from "../../../components/logo";
export default {
  name: "case-index",
  data() {
    return {
      item: [
        {
          name: "问",
          link: "editask",
        },
        {
          name: "望",
          link: "editlook",
        },
        {
          name: "闻",
          link: "edithear",
        },
        {
          name: "切",
          link: "editcut",
        },
        {
          name: "辩证",
          link: "editdialectical",
        },
        {
          name: "治疗",
          link: "edittreatment",
        },
      ],
      fractionshow: false,
      fraction: "",
      bgIndex: "0",
      authority: "",
      examNo: "",
      time: "",
      confirm_show: false,
      number_show: false,
      stop_show: false,
      index_show: false,
      exam: null,
      hour: 0,
      mint: 0,
      second: 59,
      duringLimit: "",
      saveCase_show: false,
      total: 0,
      endtime: "",
      totalExam: "",
      timerTotal: "",
    };
  },
  components: {
    logo,
  },
  mounted() {
    this.exam = localStorage.getItem("exam");
    this.examNo = localStorage.getItem("examNo");
    this.authority = localStorage.getItem("authority");
    if (this.bgIndex == "0") {
      localStorage.getItem("caseMenuId")
        ? (this.bgIndex = localStorage.getItem("caseMenuId"))
        : "0";
    }

    if (this.authority == "STUDENT") {
      let url = window.location.href;
      if (
        /userask/.test(url) ||
        /userlook/.test(url) ||
        /userHear/.test(url) ||
        /usercut/.test(url) ||
        /userdialectical/.test(url) ||
        /usertreatment/.test(url)
      ) {
        this.time = setInterval(() => {
          this.http.put(
            `/exam/${this.examNo}/during?${this.qs.stringify({
              during: 30,
            })}`
          );
        }, 30000);
      }
    }
    if (this.authority == "STUDENT") {
      this.item = [
        {
          name: "问",
          link: "userask",
        },
        {
          name: "望",
          link: "userlook",
        },
        {
          name: "闻",
          link: "userHear",
        },
        {
          name: "切",
          link: "usercut",
        },
        {
          name: "辩证",
          link: "userdialectical",
        },
        {
          name: "治疗",
          link: "usertreatment",
        },
      ];
    }
    this.totalExam = localStorage.getItem("total");
    if (!this.totalExam) {
      localStorage.setItem("total", 1);
    }
    let exam_flag = localStorage.getItem("exam");
    if (exam_flag) {
      this.axios.get("/exam").then((res) => {
        let startTime = res.data[0].startTime
          ? res.data[0].startTime
          : new Date().getTime();
        let endTime = res.data[0].endTime;
        let overTime = res.data[0].systemTime + res.data[0].duringLimit * 60000;
        let time =
          startTime + res.data[0].duringLimit * 60000 - res.data[0].systemTime;
        if (overTime > endTime) {
          this.duringLimit = parseInt(
            (endTime - res.data[0].systemTime) / 60000
          );
          return;
        }
        this.duringLimit = parseInt(time / 60000);
      });
    }
  },
  methods: {
    routeLink(i) {
      this.bgIndex = i;
      localStorage.setItem("caseMenuId", i);
      this.$router.push(this.item[i].link);
    },
    saveCase() {
      this.$router.push("/teachercase");
    },
    revokeCase() {
      let caseId = localStorage.getItem("caseId");
      this.axios.delete(`/case/manage/draft/${caseId}`).then((res) => {
        if (res.code == "000000") {
          this.$router.push("/teachercase");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //点击完成
    complete() {
      let exam = localStorage.getItem("exam");
      if (exam) {
        this.$router.push("examcase");
      } else {
        this.confirm_show = true;
        this.fractionshow = true;
      }
    },
    submit() {
      this.number_show = true;
      this.confirm_show = false;
      this.axios.post(`/train/${this.examNo}/finished`).then((res) => {
        if (res.code == "000000") {
          this.fraction = res.data;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    //案例训练开始计时
    stopTime() {
      this.fractionshow = true;
      this.stop_show = true;
      clearInterval(this.time);
    },
    //案例训练停止计时
    startTime() {
      this.fractionshow = false;
      this.stop_show = false;
      this.index_show = false;
      this.time = setInterval(() => {
        this.http.put(`/exam/${this.examNo}/during`, {
          during: "30",
        });
      }, 30000);
    },
    //正式考试倒计时
    countDown() {
      if (this.hour == 0 && this.mint == 0 && this.second == 1) {
        clearInterval(this.timerTotal);
        this.second = 0;
        let examNo = localStorage.getItem("examNo");
        this.$MessageBox.alert("您考试时间已到,自动为您提交本次考试!", "提示", {
          confirmButtonText: "确定",
          type: "error",
          callback: () => {
            this.number_show = true;
            this.fractionshow = true;
          },
        });
        localStorage.removeItem("total");
        this.axios.put(`/exam/${examNo}/finished`).then((res) => {
          this.fraction = res.data;
        });
        return;
      }
      if (!this.hour) {
        this.hour = parseInt(this.duringLimit / 60);
      }
      if (!this.mint) {
        this.mint = this.duringLimit - this.hour * 60;
      }

      this.second--;

      if (this.second == 0) {
        this.second = 59;
        this.mint--;
      }
      if (this.mint == 0 && this.hour >= 1) {
        this.hour--;
        this.mint = 59;
      }
      if (this.mint == 0 && this.hour == 0) {
        this.mint = "0";
      }
    },
    //禁用考试项
    disableExam(flag) {
      document.oncontextmenu = function () {
        return flag;
      };
      document.onkeydown = function () {
        var e = window.event || arguments[0];
        if (e.keyCode == 123) {
          return flag;
        }
      };
      if (flag) return;
      let _this = this;
      window.onblur = function () {
        let total = localStorage.getItem("total");
        if (total >= 4) {
          let examNo = localStorage.getItem("examNo");
          _this.axios.put(`/exam/${examNo}/finished`).then((res) => {
            _this.fraction = res.data;
            clearInterval(_this.timerTotal);
            localStorage.removeItem("total");
            _this
              .$confirm(`您已经离开考试界面超过3次自动提交本次考试!`, "提示", {
                confirmButtonText: "确定",
                type: "warning",
              })
              .then(() => {
                _this.fractionshow = true;
                _this.number_show = true;
              });
          });
          return;
        }
        _this.$confirm(
          `您已经离开考试界面${total}次,超过3次将会自动提交本次考试!`,
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning",
          }
        );

        total++;
        localStorage.setItem("total", total);
      };
      window.onbeforeunload = function (e) {
        var a = window.event || e;
        a.returnValue = "确定离开当前页面吗？";
      };
    },
  },
  watch: {
    duringLimit: function () {
      if (this.exam) {
        this.disableExam(false);
        this.axios.post(`/exam/${this.examNo}/start`);
        this.timerTotal = setInterval(() => {
          this.countDown();
        }, 1000);
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.time);
    this.disableExam(true);
    window.onblur = "";
    window.onbeforeunload = "";
    next();
  },
};
</script>

<style lang="scss">
.home_case_left {
  margin-right: 50px;
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    img {
      margin-bottom: 5px;
    }
  }

  div:hover {
    cursor: pointer;
    color: rgb(0, 235, 255);
  }
}
.case_container {
  width: 100%;
  height: 791px;
  max-width: 1920px;
  margin-top: 43px;
  display: flex;
  margin: 30px auto;
  .case_menu {
    width: 100px;
    height: 100%;
    li {
      width: 100%;
      height: 55px;
      margin-top: 30px;
      background: url("../../../assets/public/menu.png") no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      span {
        color: rgb(255, 255, 255);
        font-size: 20px;
        line-height: 55px;
        text-decoration: none;
      }
    }
    li:nth-child(1) {
      margin-top: 0;
    }
    .active {
      background: url("../../../assets/public/menumove.png") no-repeat center;
      background-size: 100% 100%;
    }
    li:hover {
      cursor: pointer;
      background: url("../../../assets/public/menumove.png") no-repeat center;
      background-size: 100% 100%;
    }
  }
  .case_main {
    width: 1745px;
    height: 100%;
    margin-left: 40px;
    background: url("../../../assets/public/box.png") no-repeat center;
    background-size: 100% 100%;
    padding: 30px;
  }
}
.timer {
  position: relative;
  width: 130px;
  bottom: 70px;
  text-align: center;
  i {
    width: 40px;
    height: 40px;
    background: url("../../../assets/public/time.png") no-repeat;
    position: absolute;
    bottom: 30px;
    left: 50px;
  }
  span {
    font-size: 18px;
  }
}
</style>