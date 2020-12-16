<template>
  <div class="teacher_class">
    <div class="main_mask" v-show="editClass"></div>
    <edit-class
      v-if="editClass"
      :specialtyData="specialtyData"
      :gradeData="gradeData"
      :departmentsData="departmentsData"
      :editData="editData"
      :tips="tips"
      @getData="getData"
    ></edit-class>
    <div class="main_header">
      <button class="add" style="margin-right: 423px" @click="addClass()">
        新建班级
      </button>
      <label for>专业</label>
      <select class="select" v-model="upData.specialtyId">
        <option :value="selected">请选择专业</option>
        <option
          :value="item.id"
          v-for="(item, index) in specialtyData"
          :key="index"
        >
          {{ item.name }}
        </option>
      </select>
      <label for>年级</label>
      <select v-if="1" class="select" v-model="upData.gradeId">
        <option :value="selected">请选择年纪</option>
        <option
          :value="item.id"
          v-for="(item, index) in gradeData"
          :key="index"
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
      <button class="submit" @click="search()">检索</button>
    </div>
    <div class="main_table">
      <table
        class="main_table"
        style="border-collapse: separate; border-spacing: 0px 8px"
      >
        <thead class="thead-dark">
          <tr>
            <th class="table_5">序号</th>
            <th class="table_10">院/系</th>
            <th class="table_10">专业</th>
            <th class="table_10">年级</th>
            <th class="table_10">班级</th>
            <th class="table_10">学生人数</th>
            <th class="table_10">状态</th>
            <th class="table_10">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in classroomsData" :key="index">
            <td>{{ index | sortNumber(page) }}</td>
            <td>{{ item.departmentName }}</td>
            <td>{{ item.specialtyName }}</td>
            <td>{{ item.gradeName }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.studentCnt }}</td>
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
      <main-itps v-show="main_show"></main-itps>
      <turn-page
        v-show="total > size"
        :totaltotal="Number(total)"
        :size="10"
        @getData="getData"
      ></turn-page>
    </div>
  </div>
</template>

<script>
import mainItps from "../../components/mainItps";
import editClass from "../../components/edit/editClass";
import turnPage from "../../components/turnPage";
export default {
  name: "teacher-class",
  components: {
    editClass,
    turnPage,
    mainItps,
  },
  data() {
    return {
      editClass: false,
      classroomsData: "",
      specialtyData: "",
      gradeData: "",
      departmentsData: "",
      page: "1",
      size: "200",
      total: "",
      status: "",
      upData: {},
      editData: {},
      tips: true,
      selected: undefined,
      searchName: "",
      main_show: false,
    };
  },
  mounted() {
    this.getSpecialty();
    this.getDepartments();
    this.getGrade();
    this.getData();
  },
  methods: {
    addClass() {
      this.tips = false;
      this.editClass = true;
    },
    getClassrooms(name) {
      this.axios("classrooms", {
        name: name,
      });
    },
    getSpecialty() {
      this.axios
        .get("/specialty", {
          params: { page: this.page, size: this.size },
        })
        .then((res) => {
          this.specialtyData = res.data.rows;
        });
    },
    getGrade() {
      this.axios
        .get("/grade", {
          params: { page: this.page, size: this.size },
        })
        .then((res) => {
          this.gradeData = res.data.rows;
        });
    },
    getDepartments() {
      this.axios
        .get("/departments", {
          params: { page: this.page, size: this.size },
        })
        .then((res) => {
          this.departmentsData = res.data.rows;
        });
    },
    search() {
      this.getData();
    },
    getData(page = 1) {
      this.page = page;
      this.axios
        .get("classrooms", {
          params: {
            gradeId: this.upData.gradeId,
            specialtyId: this.upData.specialtyId,
            fuzzyName: this.searchName,
            status: this.status,
            page: page,
            size: "10",
          },
        })
        .then((res) => {
          if (!res.data.rows) {
            this.main_show = true;
          } else {
            this.main_show = false;
          }
          this.total = res.data.total;
          this.classroomsData = res.data.rows;
        });
    },
    switchChange(e) {
      this.axios
        .put(
          `/classrooms/${e.id}?${this.qs.stringify({
            did: e.departmentId,
            name: e.name,
            gradeId: e.gradeId,
            sid: e.specialtyId,
            status: e.status,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("修改班级成功!");
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    edit(e) {
      this.editClass = true;
      this.editData = e;
    },
  },
};
</script>
