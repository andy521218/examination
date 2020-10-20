<template>
  <div class="admin_record">
    <edit-user
      v-if="editStudentShow"
      :editData="editData"
      :tips="tips"
      @getData="getData"
    >
      <template v-slot:user>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">用户名/工号:</span>
        </div>
      </template>
      <template v-slot:select>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">院系:</span>
        </div>
      </template>
    </edit-user>
    <div class="main_header">
      <button class="add" @click="addTeacher">添加教师</button>
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
      <table
        class="main_table"
        style="border-collapse: separate; border-spacing: 0px 8px"
      >
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
          <tr v-for="(item, index) in studentData" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.avatar }}</td>
            <td>{{ item.passwd }}</td>
            <td>{{ item.userName }}</td>
            <td>{{ item.classRoomName }}</td>
            <td>2020-07-01 15:30</td>
            <td>
              <i-switch
                true-color="rgb(0,235,255)"
                v-model="item.status"
              ></i-switch>
            </td>
            <td>
              <span @click="edit(item)">编辑</span>
            </td>
            <td>
              <p>学习记录</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <turn-page
      class="admin_page"
      :totaltotal="Number(total)"
      :size="Number(size)"
      @getData="getData"
    ></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
import editUser from "../../components/edit/editUser";

export default {
  name: "admin-teacher",
  data() {
    return {
      editData: {},
      tips: true,
      switchValue: "",
      editStudentShow: false,
      total: "",
      page: "1",
      size: "10",
      searchName: "",
      status: "",
      studentData: {},
    };
  },
  components: {
    turnPage,
    editUser,
  },
  mounted() {
    this.getData();
  },
  methods: {
    addTeacher() {
      this.editStudentShow = true;
    },
    getData() {
      this.axios
        .get("/users/teacher", {
          params: {
            classRoomId: this.classRoomID,
            fuzzyName: this.searchName,
            status: this.status,
            page: this.page,
            size: this.size,
          },
        })
        .then((res) => {
          this.studentData = res.data.rows;
          this.total = res.data.total;
        });
    },
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
      margin-right: 185px;
    }
  }
}
</style>