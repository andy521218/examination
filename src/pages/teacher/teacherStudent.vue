<template>
  <div class="teacher_student">
    <edit-score v-if="0"></edit-score>
    <div class="main_header">
      <button class="add" style="margin-right: 644px">批量存档</button>
      <label for>班级</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <label for class="big_left">试卷名称</label>
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
          <tr>
            <td>1</td>
            <td>20200521</td>
            <td>123456</td>
            <td>张三</td>
            <td>中医药1班</td>
            <td>2020-07-01 15:30</td>
            <td>
              <i-switch true-color="rgb(0,235,255)"></i-switch>
            </td>
            <td>
              <span>编辑</span>
            </td>
            <td>
              <p>查看</p>
            </td>
            <td>
              <p>打分</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <turn-page></turn-page>
  </div>
</template>
<script>
import turnPage from "../../components/turnPage";
import editScore from "../../components/edit/editScore";
export default {
  name: "teahcer-student",
  components: {
    turnPage,
    editScore,
  },
};
</script>
