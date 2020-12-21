<template>
  <div class="home">
    <div
      class="main_mask"
      v-if="$store.state.editPwd || $store.state.editCurrent"
    ></div>
    <header class="home_header">
      <logo :index="index"></logo>
      <user></user>
    </header>
    <div class="user_core" v-if="this.$store.state.flag">
      <div class="user_menu">
        <menuTab></menuTab>
      </div>
      <div class="user_main">
        <edit-password v-if="$store.state.editPwd"></edit-password>
        <edit-user
          :tips="false"
          @submit="$store.commit('submit')"
          :title="'信息'"
          :upData="$store.state.current"
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
            <span class="edit_text_i">111111</span>
          </template>
        </edit-user>
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
import editPassword from "../components/edit/editPassword";
import editUser from "../components/edit/editUser";

export default {
  name: "user-home",
  components: {
    user,
    menuTab,
    logo,
    editPassword,
    editUser,
  },
  data() {
    return {
      index: false,
    };
  },
  mounted() {
    localStorage.removeItem("bgindex");
    localStorage.removeItem("caseMenuId");
    localStorage.removeItem("askedArr");
    localStorage.removeItem("pressItemData");
    localStorage.removeItem("sex");
    this.axios.get("/users/current").then((res) => {
      this.$store.state.current = res.data;
      localStorage.setItem("authority", res.data.authority);
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name == "index") {
      this.index = false;
    } else {
      this.index = true;
    }
    next();
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
