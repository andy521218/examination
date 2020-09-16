<template>
  <div class="teacher_user">
    <!-- 学习记录 -->
    <view-records v-if="0"></view-records>
    <!-- switch -->
    <edit-dele :edit_title='edit_title' v-if="0">
      <template v-slot:edit_p>
        <p>确定将学生状态改为禁用?</p>
      </template>
    </edit-dele>
    <!-- 编辑 添加 -->
    <edit-user :title="title" v-if="1">
      <template v-slot:user>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">用户名/学号:</span>
        </div>
        <input type="text" class="text_box" v-if="title" placeholder="请输入用户名/学号" />
        <span class="edit_text_i" v-else>20200521</span>
        <p class="edit_tips">1111111111111</p>
      </template>
      <template v-slot:select>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">班级:</span>
        </div>
        <select name id class="select" v-if="title">
          <option value>1</option>
          <option value>1</option>
          <option value>1</option>
          <option value>1</option>
        </select>
        <span class="edit_text_i" v-else>中医二班</span>
        <p class="edit_tips"></p>
      </template>
    </edit-user>

    <div class="main_header">
      <button class="add">添加学生</button>
      <button class="import">导入学生</button>
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
      <label for>姓名</label>
      <input type="text" class="text_box" placeholder="请输入学生姓名" />
      <button class="submit">检索</button>
    </div>
    <div class="main_table">
      <table class="main_table" style="border-collapse:separate; border-spacing:0px 8px;">
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
            <td>
              <p>学习记录</p>
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
            <td>
              <p>学习记录</p>
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
            <td>
              <p>学习记录</p>
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
            <td>
              <p>学习记录</p>
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
            <td>
              <p>学习记录</p>
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
            <td>
              <p>学习记录</p>
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
            <td>
              <p>学习记录</p>
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
            <td>
              <p>学习记录</p>
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
            <td>
              <p>学习记录</p>
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
            <td>
              <p>学习记录</p>
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
import editUser from "../../components/edit/editUser";
import editDele from "../../components/edit/editDele";
import viewRecords from "../../components/edit/viewRecords";

export default {
  name: "teacher-user",
  data() {
    return {
      title: false,
      edit_title:'提示',
      switchValue: "",
    };
  },
  components: {
    turnPage,
    editUser,
    editDele,
    viewRecords
  },
};
</script>

<style lang="scss">
.teacher_user {
  .main_header {
    .import {
      margin-right: 213px;
    }
  }
}
</style>