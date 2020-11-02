<template>
  <div class="home">
    <header class="home_header" style="flex-direction: row-reverse">
      <user></user>
    </header>
    <ul class="case_type">
      <li v-for="(item, index) in list" :key="index">{{ item.name }}</li>
    </ul>
    <div class="case_user_main">
      <ul>
        <li>11111111</li>
        <li>11111111</li>
        <li>11111111</li>
        <li>11111111</li>
        <li>11111111</li>
        <li>11111111</li>
        <li>11111111</li>
        <li>11111111</li>
        <li>11111111</li>
        <li>11111111</li>
      </ul>
    </div>
  </div>
</template>

<script>
import user from "../../../components/user";

export default {
  name: "case-home",
  data() {
    return {
      list: [
        {
          id: 1,
          name: "心系病",
        },
        {
          id: 2,
          name: "肝系病",
        },
        {
          id: 3,
          name: "脾胃病",
        },
        {
          id: 4,
          name: "肺系病",
        },
        {
          id: 5,
          name: "肾系病",
        },
      ],
    };
  },
  components: {
    user,
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
.case_type {
  display: flex;
  width: 1740px;
  margin: 30px auto;
  li {
    background: url("../../../assets/public/diseaseBox.png") center no-repeat;
    background-size: 100% 100%;
    height: 55px;
    width: 195px;
    margin-right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
}
.case_user_main {
  background: url("../../../assets/public/box.png") center no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  width: 1740px;
  height: 720px;
  padding: 2% 2%;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 280px;
      height: 240px;
      background: yellow;
      margin: 10px 26px;
    }
  }
}
</style>