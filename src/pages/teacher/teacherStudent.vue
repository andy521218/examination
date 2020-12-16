<template>
  <div class="teacher_student">
    <edit-score
      v-show="editscore_show"
      :editData="editData"
      @getResult="getResult"
    ></edit-score>
    <div class="main_header">
      <button class="add" style="margin-right: 644px">批量存档</button>
      <label for>班级</label>
      <select name id class="select" v-model="classroomId" @change="getReport">
        <option value="">请选择班级</option>
        <option
          v-for="(item, index) in classrooms"
          :key="index"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>
      <label for class="big_left">试卷名称</label>
      <select v-model="testPaperId" class="select" style="width: 250px">
        <option value="">请选择试卷名称</option>
        <option
          v-for="(item, index) in examName"
          :key="index"
          :value="item.testPaperId"
        >
          {{ item.name }}
        </option>
      </select>
      <button class="submit" @click="getResult(1)">检索</button>
    </div>
    <div class="records">
      <user-study></user-study>
    </div>
    <table
      class="main_table"
      style="border-collapse: separate; border-spacing: 0px 8px"
    >
      <thead class="thead-dark">
        <tr>
          <th>序号</th>
          <th>考试名称</th>
          <th>用户名/学号</th>
          <th>姓名</th>
          <th>班级</th>
          <th>考试日期</th>
          <th>用时</th>
          <th>考试成绩</th>
          <th>作答记录</th>
          <th>主观成绩</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in examNumber" :key="index">
          <td>{{ index | sortNumber(page) }}</td>
          <td>考试名称</td>
          <td>{{ item.userId }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.classroomName }}</td>
          <td>{{ item.startTime | lastTime(item.startTime) }}</td>
          <td>{{ parseInt((item.finishTime - item.startTime) / 60000) }}分</td>
          <td>
            <span>{{ parseInt(item.score) }}</span>
          </td>
          <td>
            <p @click="seeExam(item)">查看</p>
          </td>
          <td>
            <p v-if="!item.adjustScore" @click="editScore(item)">打分</p>
            <span v-else>{{ item.adjustScore }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <main-itps v-show="main_show"></main-itps>
    <turn-page
      v-show="total > 10"
      :totaltotal="Number(total)"
      :size="Number(10)"
      @getData="getResult"
    ></turn-page>
  </div>
</template>
<script>
import turnPage from "../../components/turnPage";
import mainItps from "../../components/mainItps";
import editScore from "../../components/edit/editScore";
import userStudy from "../../pages/usercore/case/userStudy";
export default {
  name: "teahcer-student",
  components: {
    turnPage,
    editScore,
    mainItps,
    userStudy,
  },
  data() {
    return {
      classrooms: "",
      classroomId: "",
      examName: "",
      testPaperId: "",
      result: "",
      total: "",
      page: "",
      main_show: false,
      examNumber: "",
      editscore_show: false,
      editData: "",
      userId: "",
    };
  },
  mounted() {
    this.getResult();
    this.getclassrooms();
  },
  methods: {
    //班级
    getclassrooms() {
      this.axios
        .get("classrooms", {
          params: {
            page: "1",
            size: "500",
          },
        })
        .then((res) => {
          this.classrooms = res.data.rows;
        });
    },
    //试卷名称二级联动
    getReport() {
      this.axios
        .get(`/case/report/testpaper/${this.classroomId}`)
        .then((res) => {
          this.examName = res.data;
        });
    },
    //获取数据与检索
    getResult(page = "1") {
      this.page = page;
      this.axios
        .get("/exam/result", {
          params: {
            classroomId: this.classroomId,
            testPaperId: this.testPaperId,
            page: page,
            size: "10",
          },
        })
        .then((res) => {
          if (res.data.rows.length == 0) {
            this.main_show = true;
          } else {
            this.main_show = false;
          }
          this.examNumber = res.data.rows;
          this.total = res.data.total;
        });
    },
    // 打分
    editScore(item) {
      this.editscore_show = true;
      this.editData = item;
    },
    //查看
    seeExam(item) {
      localStorage.setItem("caseId", item.caseId[0]);
      localStorage.setItem("examNo", item.examNo);
      this.userId = item.userId;
      this.ask = true;
      console.log(item);
    },
  },
};
</script>


<style lang="scss">
.records {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}
</style>

