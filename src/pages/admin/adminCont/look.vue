<template>
  <div class="look_diagnosis">
    <edit-result v-if="editShow" @editshow="edit"></edit-result>
    <look-box :data="cont" :title="title.one" @editshow="edit"></look-box>
    <look-box :data="cont1" :title="title.two" @editshow="edit"></look-box>
    <look-box :data="cont2" :title="title.three" @editshow="edit"></look-box>
  </div>
</template>

<script>
import lookBox from "../../../components/lookBox";
import editResult from "../edit/editResult";

export default {
  name: "look-diagnosis",
  components: {
    lookBox,
    editResult,
  },
  data() {
    return {
      title: {
        one: "望神色",
        two: "望局部",
        three: "望舌",
      },
      editShow: false,
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
  methods: {
    edit(flag) {
      this.editShow = flag;
    },
  },
};
</script>

<style lang="scss">
.look_diagnosis {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 3% 5%;
  .cont_bg {
    width: 30%;
  }
}
</style>