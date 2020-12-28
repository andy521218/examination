<template>
  <div class="home">
    <header class="home_header">
      <logo></logo>
      <user></user>
    </header>
    <div class="user_core">
      <div class="exam_index">
        <div class="exam_index_title">
          <p>考前必读:</p>
        </div>
        <div class="exam_index_txt">
          <p>1.正式考试为教师发布的考试模块，请认真作答。</p>
          <p>2.考试可能存在多个案例，请仔细确认，防止答题不完整。</p>
          <p>3.如果你已经准备好，请点击“开始考试“按钮即进入考试，开始计时。</p>
          <p>
            4.考试过程中会在试卷的左侧会显示倒计时，您可以查看考试剩余时间。
          </p>
          <p>5.一旦开始考试不得中途退出，中途退出按照提交处理。</p>
          <p>6.当完成全部案例后，点击“提交考试“按钮提交试卷。</p>
        </div>
        <button class="import" @click="$router.push('examcase')">
          开始考试
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../../../components/logo";
import user from "../../../components/user";
export default {
  name: "exam-index",
  components: {
    logo,
    user,
  },
};
</script>

<style lang="scss">
.exam_index {
  width: 1040px;
  height: 540px;
  background: url("../../../assets/public/exam_box.png") no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -520px;
  margin-top: -270px;
  .exam_index_title {
    border-bottom: 5px solid rgb(0, 235, 255);
    width: 90px;
    padding-bottom: 5px;
    margin-top: 90px;
    margin-left: 100px;
    p {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .exam_index_txt {
    margin-left: 100px;
    margin-top: 50px;
    width: 660px;
    height: 280px;
    p {
      line-height: 30px;
      font-size: 17px;
    }
  }
  .import {
    margin-left: 250px;
    width: 200px;
  }
}
</style>