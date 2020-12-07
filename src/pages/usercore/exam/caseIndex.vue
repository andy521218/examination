<template>
  <div class="home">
    <header class="home_header">
      <logo></logo>
      <user></user>
    </header>
    <div class="case_user_main exam_index">
      <ul>
        <li class="case_user_item">
          <div class="case_img">
            <img src="../../../assets/public/timg.png" alt="" />
            <div class="case_active">
              <div class="case_img_tips">
                <img src="../../../assets/public/caseTips.png" alt="" />
                <span>开始考试</span>
              </div>
            </div>
          </div>
          <div class="case_current">
            <span>姓名:</span>
            <span>性别:</span>
            <span>年龄:</span>
          </div>
        </li>
      </ul>
      <button class="import">提交考试</button>
    </div>
  </div>
</template>


<script>
import logo from "../../../components/logo";
import user from "../../../components/user";
export default {
  name: "case-index",
  components: {
    logo,
    user,
  },
  data() {
    return {
      examData: "",
    };
  },
  mounted() {
    this.getExam();
  },
  methods: {
    getExam() {
      this.axios.get("/exam").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss">
.exam_index {
  margin-top: 30px;
  height: 800px;
  position: relative;
  .case_user_item {
    margin: 20px 26px 60px 26px !important;
  }
  .import {
    width: 200px;
    position: absolute;
    bottom: 50px;
    left: 50%;
    margin-left: -100px;
  }
}
</style>