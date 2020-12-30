<template>
  <div class="home">
    <header class="home_header">
      <logo :index="true"></logo>
      <user></user>
    </header>
    <div class="prose">
      <div class="prose_title">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="{ active: title_index == index }"
            @click="title_index = index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="prose_main">
        <prose-one v-show="title_index == 0"></prose-one>
        <prose-two v-show="title_index == 1"></prose-two>
        <prose-three v-show="title_index == 2"></prose-three>
        <prose-four v-show="title_index == 3"></prose-four>
        <prose-five v-show="title_index == 4"></prose-five>
      </div>
    </div>
  </div>
</template>

<script>
import user from "../components/user";
import logo from "../components/logo";
import proseOne from "../components/prose/proseOne";
import proseTwo from "../components/prose/proseTwo";
import proseThree from "../components/prose/proseThree";
import proseFour from "../components/prose/proseFour";
import proseFive from "../components/prose/proseFive";
export default {
  name: "prose",
  components: {
    user,
    logo,
    proseOne,
    proseTwo,
    proseThree,
    proseFour,
    proseFive,
  },
  data() {
    return {
      list: [
        "中医望诊人文修养",
        "营造良好的人文诊疗环境",
        "医患沟通的人文修养",
        "四诊操作规范的人文修养",
        "中医四诊人文故事",
      ],
      title_index: "",
    };
  },
};
</script>

<style lang="scss">
.prose {
  width: 90%;
  height: 88%;
  margin: 0 auto;
  .prose_title {
    width: 100%;
    height: 10%;
    margin: 0 auto;
    margin-top: 1%;
    max-width: 1728px;
    max-height: 83px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      li {
        background: url("../assets/public/caseType.png") no-repeat center;
        background-size: 100% 100%;
        height: 65%;
        width: 15%;
        min-width: 260px;
        display: flex;
        font-size: 20px;
        justify-content: center;
        align-items: center;
        margin-right: 2%;
      }
      li:hover {
        cursor: pointer;
        background: url("../assets/public/caseTypeActive.png") no-repeat center;
        background-size: 100% 100%;
      }
      .active {
        background: url("../assets/public/caseTypeActive.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
  .prose_main {
    background: url("../assets/public/box.png") no-repeat center;
    background-size: 100% 100%;
    width: 100%;
    height: 88%;
    max-width: 1729px;
    max-height: 726px;
    padding: 2%;
    margin: 0 auto;
    margin-top: 1%;
  }
  //公共样式
  .background_box {
    background: url("../assets/public/11d9149c554d0dc44a8c35d27a76dd2.png")
      no-repeat center;
    background-size: 100% 100%;
  }
  .border_top {
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    height: 50px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
}
</style>