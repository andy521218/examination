<template>
  <div class="home" style="min-width: 1920px">
    <div class="main_mask" v-if="fractionshow"></div>
    <header class="home_header">
      <logo></logo>
      <div class="home_user">
        <div class="home_case_left">
          <div class="stop" v-if="authority == 'STUDENT'">
            <img src="../../../assets/public/stop.png" alt="" />
            <span>暂停</span>
          </div>
          <div
            class="sonserve"
            @click="
              confirm_show = true;
              fractionshow = true;
            "
            v-if="authority == 'STUDENT'"
          >
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
              <span class="title">本次训练得分</span>
            </div>
            <ul>
              <li style="text-align: center">
                <span style="font-size: 50px; font-weight: bold">{{
                  fraction
                }}</span
                >分
              </li>
            </ul>
            <div class="edit_btn_box">
              <button
                class="edit_submit"
                style="margin-right: 40px"
                @click="$router.push('casehome')"
              >
                返回首页
              </button>
              <button class="edit_submit" @click="$router.push('userrecord')">
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
                <span>您确认提交本次训练吗?</span>
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
        <router-view></router-view>
      </div>
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
      confirm_show: false,
      number_show: false,
    };
  },
  components: {
    logo,
  },
  mounted() {
    if (this.bgIndex == "0") {
      localStorage.getItem("caseMenuId")
        ? (this.bgIndex = localStorage.getItem("caseMenuId"))
        : "0";
    }
    this.examNo = localStorage.getItem("examNo");
    this.authority = localStorage.getItem("authority");
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
  margin-top: 43px;
  display: flex;
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
</style>