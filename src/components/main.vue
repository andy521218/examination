<template>
  <div class="home">
    <header class="home_header">
      <user></user>
    </header>
    <div class="user_core" ref="homePage">
      <div class="user_menu">
        <menuTab :menuData='list'></menuTab>
      </div>
      <div class="user_main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import user from "../components/user";
import menuTab from "../components/menu";

export default {
  name: "user-home",
  data() {
    return {
        list:['个人信息','修改密码','学习记录','考试成绩','数据统计']
    };
  },
  components: {
    user,
    menuTab
  },
};
</script>

<style lang="scss">
.user_core {
  display: flex;
  height: 83%;
  margin-top: 50px;
  .user_menu {
    width: 10%;
    min-width: 157px;
    margin-right: 40px;
  }
  .user_main {
    width: 90%;
    background: url('../assets/public/box.png') no-repeat center;
    background-size: 100% 100%;
    margin-right: 40px;
  }
}
</style>
