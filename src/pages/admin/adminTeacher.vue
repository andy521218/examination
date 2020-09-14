<template>
  <div class="admin_record">
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
            <th class="table_10">病系</th>
            <th class="table_10">患者</th>
            <th class="table_10">开始时间</th>
            <th class="table_10">完成时间</th>
            <th class="table_10">用时</th>
            <th class="table_10">成绩</th>
            <th class="table_10">查看</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>肺病系</td>
            <td>张三</td>
            <td>2020-07-09</td>
            <td>2020-07-09</td>
            <td>10min</td>
            <td>99</td>
            <td>
              <span>继续学习</span>
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
export default {
  components: {
    turnPage,
  },
};
</script>

<style lang="scss">
.admin_record{
    .main_header{
        input,.select{
            width: 250px;
        }
        .submit{
            width: 100px;
            margin-left: 40px;
        }
        label{
            margin-left: 45px;
            margin-right: 15px;
        }
        .import{
            margin-right: 180px;
        }
    }
}
</style>