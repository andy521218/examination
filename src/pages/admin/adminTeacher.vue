<template>
  <div class="admin_record">
    <div class="main_mask" v-show="mask"></div>
    <edit-user
      :tips="tips"
      v-if="editStudentShow"
      title="教师"
      :upData="upData"
      @submit="submit"
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
        <select
          class="select"
          v-if="tips"
          v-model="upData.did"
          @change="checkDid"
        >
          <option :value="selected">请选择院系</option>
          <option
            :value="item.id"
            v-for="(item, index) in departments"
            :key="index"
          >
            {{ item.name }}
          </option>
        </select>
        <span class="edit_text_i" v-else>{{ upData.departmentName }}</span>
        <p class="edit_tips">{{ departmentsText }}</p>
      </template>
    </edit-user>

    <edit-import
      :title="'教师'"
      :uploadUrl="uploadUrl"
      @getData="getData"
      @downLoad="downLoad"
      v-if="editload"
    ></edit-import>

    <div class="main_header">
      <button class="add" @click="addTeacher">添加教师</button>
      <button class="import" @click="importTeacher">教师导入</button>
      <label for>院系</label>
      <select class="select" v-model="departmentId">
        <option value>请选择院系</option>
        <option
          v-for="(item, index) in departments"
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
      <label for>教师姓名</label>
      <input
        type="text"
        class="text_box"
        v-model="searchName"
        placeholder="请输入教师姓名"
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
            <td>{{ item.userName }}</td>
            <td>{{ item.passwd }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.departmentName }}</td>
            <td>{{ item.lastLoginTime | lastTime(item.lastLoginTime) }}</td>
            <td>
              <i-switch
                true-color="rgb(0,235,255)"
                v-model="item.status"
                @on-change="switchChange(item)"
              ></i-switch>
            </td>
            <td>
              <span @click="edit(item)">编辑</span>
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
import editImport from "../../components/edit/editImport";

export default {
  name: "admin-teacher",
  components: {
    turnPage,
    editUser,
    editImport,
  },
  data() {
    return {
      upData: {},
      uploadUrl: "/users/teacher/import",
      tips: true,
      switchValue: "",
      editStudentShow: false,
      total: "",
      page: "1",
      size: "10",
      searchName: "",
      status: "",
      studentData: {},
      departments: "",
      departmentsText: "",
      departmentId: "",
      selected: undefined,
      editload: false,
      mask: false,
    };
  },
  mounted() {
    this.getData();
    this.getdepartments();
  },
  methods: {
    addTeacher() {
      this.mask = true;
      this.editStudentShow = true;
    },
    getdepartments() {
      this.axios
        .get("/departments", {
          params: {
            classRoomId: this.classRoomID,
            fuzzyName: this.searchName,
            status: this.status,
            page: this.page,
            size: this.size,
          },
        })
        .then((res) => {
          this.departments = res.data.rows;
        });
    },
    getData() {
      this.axios
        .get("/users/teacher", {
          params: {
            departmentId: this.departmentId,
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
    checkDid() {
      if (!this.upData.did) {
        this.departmentsText = "请选择院系";
        return false;
      }
      this.departmentsText = "";
      return true;
    },
    downLoad() {
      let url = this.$url.replace("/download/", "");
      window.location.href = `${url}/users/teach/template`;
    },
    importTeacher() {
      this.mask = true;
      this.editload = true;
    },
    edit(e) {
      this.tips = false;
      this.mask = true;
      this.editStudentShow = true;
      this.upData = e;
      this.upData.did = e.departmentId;
    },
    submit() {
      if (!this.checkDid()) return;
      var methods = "post",
        url = "",
        id = this.upData.did,
        msg = "添加";
      if (!this.tips) {
        methods = "put";
        id = this.upData.did;
        url = this.upData.id;
        msg = "编辑";
      }
      this.http[methods](`/users/${id}/teacher/${url}`, {
        name: this.upData.name,
        passwd: this.upData.passwd,
        userName: this.upData.userName,
        mobile: this.upData.mobile,
        status: this.status,
        email: this.upData.email,
      }).then((res) => {
        if (res.code == "000000") {
          this.getData();
          this.upData = {};
          this.tips = true;
          this.editStudentShow = false;
          this.mask = false;
          this.$Message.warning(`${msg}成功!`);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    switchChange(e) {
      this.http
        .put(`/users/${e.departmentId}/teacher/${e.id}`, {
          avatar: e.avatar,
          passwd: e.passwd,
          userName: e.userName,
          classRoomId: e.classRoomId,
          mobile: e.mobile,
          status: e.status,
          email: e.email,
        })
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("修改成功!");
          } else {
            this.$Message.error(res.msg);
          }
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