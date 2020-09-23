<template>
  <div class="hear_diagnosis">
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
.hear_diagnosis {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 3% 5%;
  .cont_bg {
    width: 40%;
    .edit {
      width: 100%;
      margin: 0 auto;
      min-width: 595px;
      li {
        border: none;
      }
    }
    .edit ul li input,
    .edit ul li .select {
      width: 410px;
    }
    .edit .edit_cancel {
      margin-left: 165px;
    }
  }
}
</style>