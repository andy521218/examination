<template>
  <div class="teacher_class">
    <edit-class v-if="1"></edit-class>
    <div class="main_header">
      <button class="add">新建班级</button>
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
      <select name id class="select smal">
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
      <table class="main_table" style="border-collapse:separate; border-spacing:0px 8px;">
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
          </tr>
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import editClass from "../../components/edit/editClass"
export default {
    name:'teacher-class',
    components:{
      editClass
    }
}
</script>
<style lang="scss">
.teacher_class {
  .main_header {
    .add {
      margin-right: 423px;
    }
    .smal {
      width: 170px;
    }
  }
}
</style>