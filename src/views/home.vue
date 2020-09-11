<template>
  <div class="home">
    <header class="home_header">
      <div class="home_user">
        <span class="news">
          <img src="../assets/img/home/news.png" alt />
        </span>
        <span class="count">9</span>
        <span class="field">消息</span>
        <span class="user_log">
          <img src="../assets/img/home/user.png" alt />
        </span>
        <span class="user_name">姓名</span>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

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
    .home_user {
      float: right;
      width: 245px;
      margin-top: 10px;
      height: 50px;
      position: relative;
      box-sizing: border-box;
      span {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
      }
      .news {
        width: 27px;
        img {
          height: 30px;
          width: 27px;
        }
      }
      .count {
        width: 14px;
        height: 14px;
        line-height: 14px;
        font-size: 8px;
        position: absolute;
        left: 13px;
        top: 6px;
        border-radius: 50%;
        background-color: rgb(255, 0, 0);
      }
      .field {
        height: 14px;
        line-height: 30px;
        margin-bottom: 15px;
        margin-left: 5px;
        margin-right: 32px;
      }
      .user_log {
        height: 50px;
        width: 50px;
        img {
          height: 50px;
          width: 50px;
          border: 1px solid rgb(4, 111, 174);
          border-radius: 50%;
        }
      }
      .user_name{
          margin-left: 10px;
      }
    }
  }
}
</style>