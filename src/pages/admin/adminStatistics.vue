<template>
  <div class="admin_statistics">
    <edit-dele :edit_title="edit_title" v-show="0">
      <template v-slot:edit_p>
        <p>确定删除2019级中医药1班?</p>
        <p class="edit_dele_p">(删除后无法找回)</p>
      </template>
    </edit-dele>
    <div class="main_header" v-show="0">
      <label for>专业</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <label for>年级</label>
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
      <button class="submit">检索</button>
    </div>
    <div class="main_table" v-show="0">
      <table
        class="main_table"
        style="border-collapse: separate; border-spacing: 0px 8px"
      >
        <thead class="thead-dark">
          <tr>
            <th class="table_5">序号</th>
            <th class="table_10">院系</th>
            <th class="table_10">专业</th>
            <th class="table_10">年级</th>
            <th class="table_10">班级</th>
            <th class="table_10">学生人数</th>
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
              <i-switch
                v-model="switchValue"
                true-color="rgb(0,235,255)"
              ></i-switch>
            </td>
            <td>
              <span class="tbody_dele">删除</span>
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
              <i-switch
                v-model="switchValue"
                true-color="rgb(0,235,255)"
              ></i-switch>
            </td>
            <td>
              <span class="tbody_dele">删除</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <turn-page class="admin_page" v-show="0"></turn-page>
    <div style="text-align: center">
      <h4>数据管理</h4>
      <h2>功能待完善</h2>
    </div>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
import editDele from "../../components/edit/editDele";
export default {
  name: "admin-statistics",
  data() {
    return {
      switchValue: true,
      edit_title: "删除",
    };
  },
  components: {
    turnPage,
    editDele,
  },
};
</script>

<style lang="scss">
.admin_statistics {
  .main_header {
    justify-content: flex-end;
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
  }
}
</style>