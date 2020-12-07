<template>
  <div class="teacher_exam">
    <div class="main_header">
      <button class="add" style="margin-right: 644px">批量存档</button>
      <label for>状态</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <label for class="big_left">考试名称</label>
      <select name id class="select" style="width: 250px">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <button class="submit">检索</button>
    </div>
    <div class="main_table">
      <table
        class="main_table"
        style="border-collapse: separate; border-spacing: 0px 8px"
      >
        <thead class="thead-dark">
          <tr>
            <th>序号</th>
            <th>考试名称</th>
            <th>考试班级</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>考试时长</th>
            <th>案例</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in examData" :key="index">
            <td>{{ index | sortNumber(page) }}</td>
            <td></td>
            <td>{{ item.classrooms[0].classroonName }}</td>
            <td>
              {{
                item.classrooms[0].beginTime
                  | lastTime(item.classrooms[0].beginTime)
              }}
            </td>
            <td>
              {{
                item.classrooms[0].endTime
                  | lastTime(item.classrooms[0].endTime)
              }}
            </td>
            <td>40分</td>
            <td style="width: 200px">
              <span class="nameTxT">
                {{ caseName(item) }}
              </span>
            </td>
            <td class="status">
              <span
                v-if="item.classrooms[0].status == 2"
                style="color: rgb(255, 255, 255)"
                >已结束</span
              >
              <span v-if="item.classrooms[0].status == 1">进行中</span>
              <span
                v-if="item.classrooms[0].status == 0"
                style="color: rgb(255, 255, 255)"
                >未开始</span
              >
            </td>
            <td class="see_dele">
              <p>查看</p>
              <p>取消</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <turn-page
      ref="turnPage"
      v-show="total > size"
      :totaltotal="Number(total)"
      :size="Number(size)"
      @getData="getexam"
    ></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
export default {
  name: "teacher-exam",
  components: {
    turnPage,
  },
  data() {
    return {
      page: "1",
      total: "",
      size: "10",
      examData: "",
    };
  },
  mounted() {
    this.getexam();
  },
  methods: {
    getexam(page = "1") {
      this.page = page;
      this.axios
        .get("exam/list", {
          params: {
            keyword: "1",
            page: page,
            size: this.size,
          },
        })
        .then((res) => {
          this.examData = res.data.rows;
          this.total = res.data.total;
        });
    },
    caseName(item) {
      let nameTxt = item.cases;
      let nameArr = "";
      nameTxt.forEach((i) => {
        nameArr += i.name + ",";
      });
      return nameArr;
    },
  },
};
</script>

<style lang="scss">
.nameTxT {
  display: block;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgb(255, 255, 255) !important;
  border: none !important;
}
.status {
  span {
    border: none !important;
  }
}
.see_dele {
  width: 200px;
  p {
    display: inline-block;
    margin: 0 10px !important;
  }
  p:last-child {
    border: 1px solid rgb(252, 94, 95);
    color: rgb(252, 94, 95);
  }
}
</style>