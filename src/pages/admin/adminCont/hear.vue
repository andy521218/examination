<template>
  <div class="hear diagnosis">
    <hear-box :data="cont" :title="title.one"></hear-box>
    <hear-box :data="cont2" :title="title.two"></hear-box>
  </div>
</template>

<script>
import hearBox from "../../../components/hearBox";
export default {
  name: "hear-diagnosis",
  components: {
    hearBox,
  },
  data() {
    return {
      title: {
        one: "男性闻诊数据",
        two: "女性闻诊数据",
      },
      editShow: false,
      sex: "",
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
.hear {
  .cont_bg {
    width: 40%;
    .edit {
     left: 50%;
     margin-left: -235px;
     top: 45px;
      li {
        border: none;
      }
    }
  }
}
</style>