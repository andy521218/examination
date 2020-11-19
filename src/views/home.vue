<template>
  <div class="home">
    <header class="home_header">
      <logo></logo>
      <user></user>
    </header>
    <div class="user_core" v-if="this.$store.state.flag">
      <div class="user_menu">
        <menuTab></menuTab>
      </div>
      <div class="user_main">
        <router-view name="main"></router-view>
      </div>
    </div>
    <router-view name="index" v-if="!this.$store.state.flag"></router-view>
  </div>
</template>

<script>
import user from "../components/user";
import menuTab from "../components/menu";
import logo from "../components/logo";

export default {
  name: "user-home",
  components: {
    user,
    menuTab,
    logo,
  },
  mounted() {
    localStorage.removeItem("bgindex");
    // localStorage.removeItem("examNo");
    // localStorage.removeItem("caseId");
    localStorage.removeItem("caseMenuId");
    localStorage.removeItem("askedArr");
    localStorage.removeItem("pressItemData");
    localStorage.removeItem("sex");
    this.axios.get("/users/current").then((res) => {
      localStorage.setItem("authority", res.data.authority);
    });
  },
};
</script>

<style lang="scss">
.user_core {
  display: flex;
  height: 83%;
  margin-top: 40px;
  .user_menu {
    width: 10%;
    min-width: 157px;
    margin-right: 25px;
  }
  .user_main {
    width: 90%;
    min-width: 1375px;
    background: url("../assets/public/box.png") no-repeat center;
    background-size: 100% 100%;
    margin-right: 40px;
    position: relative;
  }
  @media (max-width: 1600px) {
    .user_menu {
      display: none;
    }
    .user_main {
      margin: 0 auto;
    }
  }
}
</style>
