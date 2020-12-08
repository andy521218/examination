<template>
  <div class="home">
    <header class="home_header">
      <logo></logo>
      <user></user>
    </header>
    <div class="case_user_main exam_index_list">
      <ul>
        <li
          class="case_user_item"
          v-for="(item, index) in examData"
          :key="index"
          @click="startExam(item)"
        >
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
            <span>姓名: {{ item.name }}</span>
            <span>性别: {{ item.gender ? "男" : "女" }}</span>
            <span>年龄: {{ item.age }}</span>
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
        localStorage.setItem("examNo", res.data[3].examNo);
        let caseIds = res.data[3].caseId;
        this.axios.get(`/case/${caseIds}/meta`).then((res) => {
          this.examData = res.data;
        });
      });
    },
    startExam(item) {
      localStorage.setItem("caseId", item.caseId);
      localStorage.setItem("exam", true);
      this.$router.push("userask");
    },
  },
};
</script>

<style lang="scss">
.exam_index_list {
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