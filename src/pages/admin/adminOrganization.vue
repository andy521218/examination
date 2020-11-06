<template>
  <div class="admin_tion">
    <edit-admin
      :data="data"
      v-if="editShow"
      @getGrade="getGrade"
      @getDepartments="getDepartments"
      @getSpecialty="getSpecialty"
    ></edit-admin>
    <div class="main_mask" v-if="editShow"></div>
    <div class="main_header">
      <button class="add" @click="addGrade()">新建年级</button>
      <button class="import" @click="addDepartments()">新建院系</button>
      <button class="add_case" @click="addSpecialty()">新建专业</button>
    </div>
    <div class="admin_grade">
      <div class="main_table">
        <table
          class="main_table"
          style="border-collapse: separate; border-spacing: 0px 8px"
        >
          <thead class="thead-dark">
            <tr>
              <th class="table_10">序号</th>
              <th class="table_80">年级</th>
              <th class="tabble_10">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in grade" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>
                <span @click="editGrade(item)">编辑</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <turn-page
        class="admin_page"
        :totaltotal="Number(gradeTotal)"
        :size="2"
        @getData="getGrade"
      ></turn-page>
    </div>
    <div class="admin_number">
      <div class="main_table">
        <table
          class="main_table"
          style="border-collapse: separate; border-spacing: 0px 8px"
        >
          <thead class="thead-dark">
            <tr>
              <th class="table_10">序号</th>
              <th class="table_80">院/系</th>
              <th class="tabble_10">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in departments" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>
                <span @click="editDepartments(item)">编辑</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <turn-page
        class="admin_page"
        :totaltotal="Number(departmentsTotal)"
        :size="2"
        @getData="getDepartments"
      ></turn-page>
    </div>
    <div class="admin_major">
      <div class="main_table">
        <table
          class="main_table"
          style="border-collapse: separate; border-spacing: 0px 8px"
        >
          <thead class="thead-dark">
            <tr>
              <th class="table_10">序号</th>
              <th class="table_80">专业</th>
              <th class="tabble_10">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in specialty" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>
                <span @click="editSpecialty(item)">编辑</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <turn-page
        class="admin_page"
        :totaltotal="Number(specialtyTotal)"
        :size="2"
        @getData="getSpecialty"
      ></turn-page>
    </div>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
import editAdmin from "../../components/edit/editAdmin";
export default {
  name: "admin_tion",
  data() {
    return {
      data: {},
      editShow: false,
      grade: {},
      departments: {},
      specialty: {},
      size: "2",
      gradeTotal: "",
      departmentsTotal: "",
      specialtyTotal: "",
    };
  },
  components: {
    turnPage,
    editAdmin,
  },
  mounted() {
    this.getGrade();
    this.getSpecialty();
    this.getDepartments();
  },
  methods: {
    addGrade() {
      this.data.title = "添加年级";
      this.data.text = "请输入年级";
      this.editShow = true;
    },
    addDepartments() {
      this.data.title = "添加院系";
      this.data.text = "请输入院系";
      this.editShow = true;
    },
    addSpecialty() {
      this.data.title = "添加专业";
      this.data.text = "请输入专业";
      this.editShow = true;
    },

    editGrade(e) {
      this.data.title = "添加年级";
      this.data.text = "请输入年级";
      this.editShow = true;
      this.data.name = e.name;
      this.data.id = e.id;
    },
    editDepartments(e) {
      this.data.title = "添加院系";
      this.data.text = "请输入院系";
      this.editShow = true;
      this.data.name = e.name;
      this.data.id = e.id;
    },
    editSpecialty(e) {
      this.data.title = "添加专业";
      this.data.text = "请输入专业";
      this.editShow = true;
      this.data.name = e.name;
      this.data.id = e.id;
    },
    getGrade(page = 1) {
      this.axios
        .get("/grade", {
          params: {
            page: page,
            size: this.size,
          },
        })
        .then((res) => {
          this.gradeTotal = res.data.total;
          this.grade = res.data.rows;
          this.name = "";
        });
    },
    getDepartments(page = 1) {
      this.axios
        .get("/departments", {
          params: {
            page: page,
            size: this.size,
          },
        })
        .then((res) => {
          this.departments = res.data.rows;
          this.departmentsTotal = res.data.total;
          this.name = "";
        });
    },
    getSpecialty(page = 1) {
      this.axios
        .get("/specialty", {
          params: {
            page: page,
            size: this.size,
          },
        })
        .then((res) => {
          this.specialty = res.data.rows;
          this.specialtyTotal = res.data.total;
          this.name = "";
        });
    },
  },
};
</script>


<style lang="scss">
.admin_tion {
  height: 100%;
  .main_header {
    .add_case {
      margin-left: 15px;
    }
  }
  .admin_grade,
  .admin_number,
  .admin_major {
    height: 29%;
    width: 98%;
    margin: 0 auto;
    border-bottom: 1px solid rgb(9, 124, 168);
  }
  .admin_major {
    border: none;
  }
  .admin_page {
    width: 91%;
    margin-top: 15px;
    margin-left: 150px;
  }
}
</style>