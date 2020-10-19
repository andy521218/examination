<template>
  <div class="teacher_user">
    <!-- 学习记录 -->
    <view-records v-if="0"></view-records>
    <!-- switch -->
    <edit-dele :edit_title="edit_title" v-if="0">
      <template v-slot:edit_p>
        <p>确定将学生状态改为禁用?</p>
      </template>
    </edit-dele>
    <!-- 编辑 添加 -->
    <edit-user
      :tips="tips"
      v-if="editStudentShow"
      :editData="editData"
      @getData="getData"
    >
      <template v-slot:user>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">用户名/学号:</span>
        </div>
      </template>
      <template v-slot:select>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">班级:</span>
        </div>
      </template>
    </edit-user>

    <div class="main_header">
      <button class="add" @click="addStudent">添加学生</button>
      <button class="import" style="margin-right: 213px">导入学生</button>
      <label for>班级</label>
      <select class="select" v-model="classRoomID">
        <option value>请选择班级</option>
        <option
          v-for="(item, index) in classRoom"
          :key="index"
          :value="item.id"
        >
          {{ item.name }}
        </option>
      </select>
      <label for>状态</label>
      <select class="select" style="width: 170px" v-model="status">
        <option value>请选择状态</option>
        <option value="true">正常</option>
        <option value="false">禁用</option>
      </select>
      <label for>姓名</label>
      <input
        type="text"
        class="text_box"
        placeholder="请输入学生姓名"
        v-model="searchName"
      />
      <button class="submit" @click="getData">检索</button>
    </div>
    <div class="main_table">
      <table
        class="main_table"
        style="border-collapse: separate; border-spacing: 0px 8px"
      >
        <thead class="thead-dark">
          <tr>
            <th class="table_5">序号</th>
            <th class="table_10">用户名/学号</th>
            <th class="table_10">密码</th>
            <th class="table_10">姓名</th>
            <th class="table_10">班级</th>
            <th class="table_10">最近登入时间</th>
            <th class="table_10">状态</th>
            <th class="table_10">操作</th>
            <th class="table_10">查看</th>
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
import editDele from "../../components/edit/editDele";
import viewRecords from "../../components/edit/viewRecords";

export default {
  name: "teacher-user",
  data() {
    return {
      edit_title: "提示",
      switchValue: "",
      editStudentShow: false,
      tips: true,
      page: "1",
      size: "10",
      total: "",
      searchName: "",
      status: '',
      classRoom: "",
      classRoomID:'',
      studentData: {},
      editData: {},
    };
  },
  components: {
    turnPage,
    editUser,
    editDele,
    viewRecords,
  },
  mounted() {
    this.getData();
    this.getclassRoom();
  },
  methods: {
    addStudent() {
      this.editStudentShow = true;
    },
    getData() {
      this.axios
        .get("/users/student", {
          params: {
            classRoomId:this.classRoomID,
            fuzzyName:this.searchName,
            status:this.status,
            page: this.page,
            size: this.size,
          },
        })
        .then((res) => {
          this.studentData = res.data.rows;
          this.total = res.data.total;
        });
    },
    getclassRoom() {
      this.axios
        .get("/classrooms", {
          params: {
            page: "1",
            size: "200",
          },
        })
        .then((res) => {
          this.classRoom = res.data.rows;
        });
    },
    edit(e) {
      this.tips = false;
      this.editStudentShow = true;
      this.editData = e;
    },
  },
};
</script>
