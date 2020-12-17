<template>
  <div class="home">
    <header class="home_header">
      <logo></logo>
      <user></user>
    </header>
    <div class="case_user_main exam_index_list">
      <edit-dele :title="'提示'" v-show="deleshow" @deleSubmit="submit">
        <template v-slot:edit_p>
          <p>{{ tips }}</p>
          <p class="edit_dele_p">(提交后无法更改)</p>
        </template>
      </edit-dele>
      <div class="edit_dele" v-show="examNumber_show">
        <div class="edit">
          <div class="edit_title">
            <span class="title">本次考试得分</span>
            <span class="edit_switch" @click="closeItps"></span>
          </div>
          <ul>
            <li>
              <p>
                <span style="font-size: 30px; font-weight: bold">{{
                  parseInt(examNumber)
                }}</span
                >分
              </p>
            </li>
          </ul>
          <div class="edit_btn_box">
            <button class="edit_submit" @click="closeItps">确定</button>
          </div>
        </div>
      </div>
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
      <button class="import" @click="deleshow = true">提交考试</button>
    </div>
  </div>
</template>


<script>
import logo from "../../../components/logo";
import user from "../../../components/user";
import editDele from "../../../components/edit/editDele";
export default {
  name: "case-index",
  components: {
    logo,
    user,
    editDele,
  },
  data() {
    return {
      examData: "",
      tips: "您确定提交本次考试吗?",
      deleshow: false,
      examNumber: "111",
      examNumber_show: false,
    };
  },
  mounted() {
    this.getExam();
    localStorage.removeItem("bgindex");
    localStorage.removeItem("examNo");
    localStorage.removeItem("caseId");
    localStorage.removeItem("caseMenuId");
    localStorage.removeItem("askedArr");
    localStorage.removeItem("pressItemData");
    localStorage.removeItem("sex");
    localStorage.removeItem("exam");
  },
  methods: {
    getExam() {
      this.axios.get("/exam").then((res) => {
        let time = res.data[0].duringLimit;
        console.log(res);
        localStorage.setItem("examNo", res.data[0].examNo);
        localStorage.setItem("duringLimit", time);
        let caseIds = res.data[0].caseId;
        this.axios.post(`/exam/${res.data[0].examNo}/start`);
        this.axios.get(`/case/${caseIds}/meta`).then((res) => {
          this.examData = res.data;
        });
      });
    },
    //开始计时

    //开始考试
    startExam(item) {
      localStorage.setItem("caseId", item.caseId);
      localStorage.setItem("exam", true);
      this.$router.push("userask");
    },
    //提交考试
    submit() {
      let examNo = localStorage.getItem("examNo");
      this.axios.put(`/exam/${examNo}/finished`).then((res) => {
        this.examNumber = res.data;
        this.examNumber_show = true;
        this.deleshow = false;
      });
    },
    closeItps() {
      this.examNumber_show = false;
      this.$router.push("index");
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
  .edit ul {
    margin-left: 0;
  }
}
</style>