<template>
  <div class="home">
    <header class="home_header">
      <logo></logo>
      <user></user>
    </header>
    <div class="user_core">
      <div class="user_menu">
        <div class="menu">
          <ul>
            <li @click="isShow" class="active">
              <a href="/adminmaster">教师管理</a>
            </li>
            <li>
              <a href="/adminorganization">编制管理</a>
            </li>
            <li>
              <a href="/adminstatistics">数据管理</a>
            </li>
            <li>
              <a href="/admincontent">内容管理</a>
            </li>
            <div class="menu_down">
              <div class="menu_down_item">
                <i></i>
                <a href>望诊诊断</a>
              </div>
              <div class="menu_down_item">
                <i></i>
                <a href>闻诊诊断</a>
              </div>
              <div class="menu_down_item">
                <i></i>
                <a href>切诊诊断</a>
              </div>
              <div class="menu_down_item">
                <i></i>
                <a href>病名症型</a>
              </div>
              <div class="menu_down_item">
                <i></i>
                <a href>治则治法</a>
              </div>
              <div class="menu_down_item">
                <i></i>
                <a href>方剂方药</a>
              </div>
            </div>
            <li>
              <a href="/adminlogo">LOGO修改</a>
            </li>
            <li>
              <a href="/adminnumber">算分逻辑</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="user_main">
        <router-view name="main"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import user from "../../components/user";
import logo from "../../components/logo";

export default {
  name: "user-home",
  data() {
    return {};
  },
  components: {
    user,
    logo,
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
    .menu {
      width: 157px;
      .menu_down {
        width: 88%;
        margin-top: -15px;
        .menu_down_item {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 15px;
          i {
            width: 13px;
            height: 13px;
            background: rgb(255, 255, 255);
            border-radius: 50%;
            margin-right: 15px;
          }
          a {
            color: rgb(255, 255, 255);
            font-size: 20px;
            text-decoration: none;
          }
        }
        .menu_down_item:hover i{
           background: rgb(0,235,255);
        }
         .menu_down_item:hover a{
           color: rgb(0,235,255);
        }
      }
      li {
        cursor: pointer;
        width: 100%;
        height: 54px;
        line-height: 54px;
        margin-bottom: 29px;
        text-align: center;
        font-size: 20px;
        background: url("../../assets/public/menu.png");
        a {
          color: rgb(255, 255, 255);
          text-decoration: none;
        }
      }
      .menu_item:hover {
        background: url("../../assets/public/menumove.png");
      }
      .active {
        background: url("../../assets/public/menumove.png");
      }
    }
  }
  .user_main {
    width: 90%;
    min-width: 1375px;
    background: url("../../assets/public/box.png") no-repeat center;
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