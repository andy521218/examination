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
    <!-- 学习记录 -->
    <div class="records" v-if="records_show">
      <div class="records_tile">
        <ul>
          <li
            v-for="(item, index) in caseId"
            :key="index"
            @click="tapExam(item, index)"
          >
            案例{{ index + 1 }}
            <p :class="{ active: title_index == index }"></p>
          </li>
        </ul>
        <div class="switch_close" @click="close">X</div>
      </div>
      <study-main></study-main>
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
          <th>开始日期</th>
          <th>结束日期</th>
          <th>学生用时</th>
          <th>考试成绩</th>
          <th>作答记录</th>
          <th>主观成绩</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in examNumber" :key="index">
          <td>{{ index | sortNumber(page) }}</td>
          <td>考试名称</td>
          <td>{{ item.username }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.classroomName }}</td>
          <td>{{ item.startTime | lastTime(item.startTime) }}</td>
          <td>{{ item.finishTime | lastTime(item.finishTime) }}</td>
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
import studyMain from "../usercore/study/studyMain";
export default {
  name: "teahcer-student",
  components: {
    turnPage,
    editScore,
    mainItps,
    studyMain,
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
      records_show: false,
      editData: "",
      title_index: "",
      caseId: [],
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
      localStorage.setItem("examId", item.userId);
      this.caseId = item.caseId;
      this.records_show = true;
      this.ask = true;
    },
    //切换案例
    tapExam(caseId, index) {
      this.title_index = index;
      this.$store.state.examId = index;
    },
    close() {
      this.records_show = false;
    },
  },
};
</script>


<style lang="scss">
.records {
  position: absolute;
  height: 100%;
  width: 100%;
  top: -10px;
  background: url("../../assets/public/23a9142cc272e65ed9e24189f5cd7bb.png")
    no-repeat center;
  background-size: 100% 100%;
  .records_tile {
    width: 99%;
    height: 50px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(9, 124, 168);

    ul {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      text-align: center;
      li {
        width: 5%;
        cursor: pointer;
        position: relative;
        margin-right: 15px;
        p {
          display: none;
          position: absolute;
          width: 80%;
          height: 3px;
          background: rgb(0, 235, 255);
          border-radius: 2px;
          left: 10%;
          bottom: -13px;
        }
        .active {
          display: block;
        }
      }
    }
    .switch_close {
      position: absolute;
      font-size: 22px;
      right: 20px;
      top: 10px;
      cursor: pointer;
    }
  }
}
</style>

