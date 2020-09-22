<template>
  <div class="look_diagnosis">
    <edit-result></edit-result>
    <cont-bg :data="cont" :title="title.one"></cont-bg>
    <cont-bg :data="cont1" :title="title.two"></cont-bg>
    <cont-bg :data="cont2" :title="title.three"></cont-bg>
  </div>
</template>

<script>
import contBg from "../../../components/contBg";
import editResult from "../edit/editResult";

export default {
  name: "look-diagnosis",
  components: {
    contBg,
    editResult,
  },
  data() {
    return {
      title: {
        one: "望神色",
        two: "望局部",
        three: "望舌",
      },
      cont: [
        {
          title: "我的提问",
          item: ["正常", "黄色", "良好"],
          show: false,
        },
        {
          title: "我的提问",
          item: ["正常", "黄色", "良好"],
          show: true,
        },
        {
          title: "我的提问",
          item: ["正常", "黄色", "良好"],
          show: true,
        },
        {
          title: "我的提问",
          item: ["正常", "黄色", "良好"],
          show: false,
        },
      ],
      cont2: [
        {
          title: "我的提问2",
          item: ["正常", "黄色", "良好"],
          show: false,
        },
        {
          title: "我的提问",
          item: ["正常", "黄色2", "良好"],
          show: true,
        },
        {
          title: "我的提问",
          item: ["正常", "黄色2", "良好"],
          show: true,
        },
        {
          title: "我的提问",
          item: ["正常", "黄色", "良好"],
          show: false,
        },
      ],
      cont1: [
        {
          title: "我的提问1",
          item: ["正常", "黄色", "良好"],
          show: false,
        },
        {
          title: "我的提问",
          item: ["正常", "黄色1", "良好"],
          show: true,
        },
        {
          title: "我的提问",
          item: ["正常1", "黄色", "良好"],
          show: true,
        },
        {
          title: "我的提问",
          item: ["正常", "黄色", "良好"],
          show: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.look_diagnosis {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 3% 5%;
}
</style>