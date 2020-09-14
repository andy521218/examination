<template>
  <div class="admin_record">
    <edit-teacher></edit-teacher>
    <div class="main_header">
      <button class="add">添加教师</button>
      <button class="import">教师导入</button>
      <label for>班级</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <label for>状态</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <label for>教师姓名</label>
      <input type="text" class="text_box" placeholder="请输入教师姓名" />
      <button class="submit">检索</button>
    </div>
    <div class="main_table">
      <table class="main_table" style="border-collapse:separate; border-spacing:0px 8px;">
        <thead class="thead-dark">
          <tr>
            <th class="table_5">序号</th>
            <th class="table_10">用户名/工号</th>
            <th class="table_10">密码</th>
            <th class="table_10">姓名</th>
            <th class="table_10">院系</th>
            <th class="table_10">最近登入时间</th>
            <th class="table_10">状态</th>
            <th class="table_10">操作</th>
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
              <i-switch v-model="switchValue" true-color="rgb(0,235,255)" ></i-switch>
            </td>
            <td>
              <span>编辑</span>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>20200521</td>
            <td>123456</td>
            <td>张三</td>
            <td>中医药1班</td>
            <td>2020-07-01 15:30</td>
            <td>
              <i-switch v-model="switchValue" true-color="rgb(0,235,255)"></i-switch>
            </td>
            <td>
              <span>编辑</span>
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
import editTeacher from "../../components/editTeacher";

export default {
  name: "admin-teacher",
  data() {
    return {
      switchValue: true,
    };
  },
  components: {
    turnPage,
    editTeacher
  },
};
</script>

<style lang="scss">
.admin_record {
  .main_header {
    input,
    .select {
      width: 250px;
    }
    .submit {
      width: 100px;
      margin-left: 40px;
    }
    label {
      margin-left: 45px;
      margin-right: 15px;
    }
    .import {
      margin-right: 180px;
    }
  }
  tbody span {
    color: rgb(0, 235, 255);
  }
  tr:hover td > span {
    color: rgb(0, 0, 0);
    background: rgb(3, 198, 216) !important;
  }
}
</style>