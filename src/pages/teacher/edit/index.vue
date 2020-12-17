<template>
  <div class="home" style="min-width: 1920px">
    <div class="main_mask" v-if="fractionshow"></div>
    <header class="home_header">
      <logo :exam="exam"></logo>
      <div class="home_user">
        <div class="home_case_left">
          <div class="stop" v-if="authority == 'STUDENT' && exam == null">
            <img src="../../../assets/public/stop.png" alt="" />
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
            @click="saveCase()"
            v-if="authority == 'TEACHER'"
          >
            <img src="../../../assets/public/sonserve.png" alt="" />
            <span>保存</span>
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
        <router-view></router-view>
      </div>
    </div>
    <div class="timer" v-if="exam">
      <i></i>
      <span>{{ hour }}:{{ mint }}:{{ second }}</span>
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
      hour: "",
      mint: "",
      second: "59",
      duringLimit: "",
      total: 0,
      endtime: "",
    };
  },
  components: {
    logo,
  },
  mounted() {
    this.exam = localStorage.getItem("exam");
    if (this.exam) {
      this.disableExam(false);
    }
    if (this.bgIndex == "0") {
      localStorage.getItem("caseMenuId")
        ? (this.bgIndex = localStorage.getItem("caseMenuId"))
        : "0";
    }
    this.examNo = localStorage.getItem("examNo");
    this.authority = localStorage.getItem("authority");
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
    let examNo = localStorage.getItem("examNo");
    this.duringLimit = localStorage.getItem("duringLimit")/60000;
    this.http
      .put(
        `/exam/${examNo}/during?${this.qs.stringify({
          during: 0,
        })}`
      )
      .then((res) => {
        let duringLimit = res.data;
        if (!duringLimit) return;
        console.log(1);
        this.duringLimit = this.duringLimit - duringLimit / 60;
        if (this.duringLimit < 0) {
          this.$MessageBox.alert("考试时间已结束", "提示", {
            confirmButtonText: "确定",
            type: "error",
            callback: () => {
              this.$router.push("/examcase");
            },
          });
        }
      });
    setInterval(() => {
      this.countDown();
    }, 1000);
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
      if (!this.hour) {
        this.hour = parseInt(this.duringLimit / 60);
        this.hour = this.hour < 9 ? "0" + this.hour : this.hour;
      }
      if (!this.mint) {
        if (this.hour > 0) {
          this.mint = parseInt(this.duringLimit - this.hour * 60);
        } else {
          this.mint = parseInt(this.duringLimit);
        }
        if (this.mint == "60") {
          this.mint = 59;
        }
        this.mint < 9 ? "0" + this.mint : this.mint;
      }
      this.second--;
      this.second = this.second < 10 ? "0" + this.second : this.second;
      if (this.second == 0) {
        this.second = 59;
        this.mint--;
      }
      if (this.mint == "0") {
        this.mint = 59;
        this.hour--;
        this.hour = this.hour < 9 ? "0" + this.hour : this.hour;
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
        _this.$MessageBox.alert(
          "您已经离开当前考试界面,成绩可能作废!",
          "提示",
          {
            confirmButtonText: "确定",
            type: "error",
          }
        );
      };
      window.onbeforeunload = function (e) {
        var a = window.event || e;
        a.returnValue = "确定离开当前页面吗？";
      };
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