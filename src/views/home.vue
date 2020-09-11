<template>
  <div class="home">
    <header class="home_header">
      <!-- <user-header></user-header> -->
      <user></user>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import user from "../pages/user"
export default {
  name:'home',
  components:{
    user
  }
}
</script>

<style lang="scss">
.home {
  height: 100%;
  min-width: 1200px;
  min-height: 920px;
  background: url("../assets/img/home/bg.png");
  background-size: 100% 100%;
  color: rgb(255, 255, 255);
  .home_header {
    width: 100%;
    height: 75px;
    background: url("../assets/img/home/top.png") no-repeat center;
  }
}
</style>