<template>
  <div class="container">
    <div class="tab train" @click="routerCasehome"></div>
    <div class="tab assessment" @click="routerSment"></div>
    <div class="tab problem" @click="routerMessagemy"></div>
    <div class="tab care" @click="routerCare"></div>
    <edit-password
      style="top: -50%"
      v-if="$store.state.editPwd"
    ></edit-password>
    <edit-user
      @submit="$store.commit('submit')"
      :tips="false"
      :title="'信息'"
      :upData="$store.state.current"
      style="top: -50%"
      v-if="$store.state.editCurrent"
    >
      <template v-slot:user>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">用户名/工号:</span>
        </div>
      </template>
      <template v-slot:select>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">院系:</span>
        </div>
        <span class="edit_text_i">{{
          $store.state.current.departmentName
        }}</span>
      </template>
    </edit-user>
  </div>
</template>

<script>
import editPassword from "../components/edit/editPassword";
import editUser from "../components/edit/editUser";
export default {
  name: "index",
  components: {
    editPassword,
    editUser,
  },
  mounted() {
    localStorage.removeItem("bgindex");
    localStorage.removeItem("examNo");
    localStorage.removeItem("caseId");
    localStorage.removeItem("caseMenuId");
    localStorage.removeItem("askedArr");
    localStorage.removeItem("pressItemData");
    localStorage.removeItem("sex");
    localStorage.removeItem("exam");
  },
  methods: {
    routerCasehome() {
      if (localStorage.getItem("authority") != "STUDENT")
        return this.$Message.error("无权访问");
      this.$router.push("casehome");
    },
    routerMessagemy() {
      this.$store.state.menuId = "0";
      this.$router.push("messageforum");
    },
    routerSment() {
      if (localStorage.getItem("authority") != "STUDENT")
        return this.$Message.error("无权访问");
      this.axios.get("/exam").then((res) => {
        if (!res.data.length != "0") {
          this.$Message.error("当前暂无考试");
          return;
        }
        this.$router.push("examindex");
      });
    },
    routerCare() {
      this.$router.push("prose");
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  height: 393px;
  width: 1540px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -197px;
  margin-left: -740px;

  .tab {
    width: 390px;
    height: 420px;
  }
  .train {
    background: url("../assets/img/home/train.png") no-repeat center;
    background-size: 100% 100%;
  }
  .train:hover {
    background: url("../assets/img/home/trainmove.png") no-repeat center;
    background-size: 100% 100%;
  }
  .assessment {
    background: url("../assets/img/home/assessment.png") no-repeat center;
    background-size: 100% 100%;
  }
  .assessment:hover {
    background: url("../assets/img/home/assessmentmove.png") no-repeat center;
    background-size: 100% 100%;
  }
  .problem {
    background: url("../assets/img/home/problem.png") no-repeat center;
    background-size: 100% 100%;
  }
  .problem:hover {
    background: url("../assets/img/home/problemmove.png") no-repeat center;
    background-size: 100% 100%;
  }
  .care {
    background: url("../assets/img/home/care.png") no-repeat center;
    background-size: 100% 100%;
  }
  .care:hover {
    background: url("../assets/img/home/caremove.png") no-repeat center;
    background-size: 100% 100%;
  }
}
</style>