<template>
  <div class="admin_tion">
    <edit-admin :data='data'></edit-admin>
    <div class="main_header">
      <button class="add">新建年级</button>
      <button class="import">新建院系</button>
      <button class="add_case">新建专业</button>
    </div>
    <div class="admin_grade">
      <div class="main_table">
        <table class="main_table" style="border-collapse:separate; border-spacing:0px 8px;">
          <thead class="thead-dark">
            <tr>
              <th class="table_10">序号</th>
              <th class="table_80">年级</th>
              <th class="tabble_10">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2018</td>
              <td>
                <span>操作</span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>2018</td>
              <td>
                <span>操作</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <turn-page class="admin_page"></turn-page>
    </div>
    <div class="admin_number">
      <div class="main_table">
        <table class="main_table" style="border-collapse:separate; border-spacing:0px 8px;">
          <thead class="thead-dark">
            <tr>
               <th class="table_10">序号</th>
              <th class="table_80">年级</th>
              <th class="tabble_10">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2018</td>
              <td>
                <span>操作</span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>2018</td>
              <td>
                <span>操作</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <turn-page class="admin_page"></turn-page>
    </div>
    <div class="admin_major">
      <div class="main_table">
        <table class="main_table" style="border-collapse:separate; border-spacing:0px 8px;">
          <thead class="thead-dark">
            <tr>
              <th class="table_10">序号</th>
              <th class="table_80">年级</th>
              <th class="tabble_10">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2018</td>
              <td>
                <span>操作</span>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>2018</td>
              <td>
                <span>操作</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <turn-page class="admin_page"></turn-page>
    </div>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
import editAdmin from "../../components/edit/editAdmin";
export default {
  name: "admin_tion",
  data(){
    return{
      data:{
        title:'编辑',
        text:'请输入专业'
      }
    }
  },
  components: {
    turnPage,
    editAdmin
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
    margin-top: 15px;
  }
}
</style>