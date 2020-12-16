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
      </div>
    </div>
  </div>
</template>

<script>
import user from "../../../components/user";
import menuTab from "../../../components/menu";
import logo from "../../../components/logo";
export default {
  name: "user-study",
  components: {
    user,
    menuTab,
    logo,
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