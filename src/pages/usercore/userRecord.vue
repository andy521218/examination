<template>
  <div class="user_record">
    <div class="main_header">
      <label for>分类</label>
      <select name id class="select">
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
        <option value>1</option>
      </select>
      <input type="text" class="text_box" placeholder="请输入患者名字" />
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
          <tr>
            <td>1</td>
            <td>肺病系</td>
            <td>张三</td>
            <td>2020-07-09</td>
            <td>2020-07-09</td>
            <td>10min</td>
            <td>99</td>
            <td>
              <span>辩证过程</span>
              <span>思维导图</span>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>肺病系</td>
            <td>张三</td>
            <td>2020-07-09</td>
            <td>2020-07-09</td>
            <td>10min</td>
            <td>99</td>
            <td>
              <span>辩证过程</span>
              <span>思维导图</span>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>肺病系</td>
            <td>张三</td>
            <td>2020-07-09</td>
            <td>2020-07-09</td>
            <td>10min</td>
            <td>99</td>
            <td>
              <span>辩证过程</span>
              <span>思维导图</span>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>肺病系</td>
            <td>张三</td>
            <td>2020-07-09</td>
            <td>2020-07-09</td>
            <td>10min</td>
            <td>99</td>
            <td>
              <span>辩证过程</span>
              <span>思维导图</span>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>肺病系</td>
            <td>张三</td>
            <td>2020-07-09</td>
            <td>2020-07-09</td>
            <td>10min</td>
            <td>99</td>
            <td>
              <span>辩证过程</span>
              <span>思维导图</span>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>肺病系</td>
            <td>张三</td>
            <td>2020-07-09</td>
            <td>2020-07-09</td>
            <td>10min</td>
            <td>99</td>
            <td>
              <span>辩证过程</span>
              <span>思维导图</span>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>肺病系</td>
            <td>张三</td>
            <td>2020-07-09</td>
            <td>2020-07-09</td>
            <td>10min</td>
            <td>99</td>
            <td>
              <span>辩证过程</span>
              <span>思维导图</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <turn-page
      v-show="total > size"
      :totaltotal="Number(total)"
      :size="Number(size)"
      @getData="getManage"
    ></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
export default {
  name: "user-record",
  data() {
    return {
      size: "10",
      total: "11",
    };
  },
  components: {
    turnPage,
  },
};
</script>

<style lang="scss">
.user_record {
  .main_header {
    justify-content: flex-end;
    .select {
      width: 245px;
    }
    input {
      width: 295px;
    }
    .submit {
      border-radius: 3px;
      margin-right: 20px;
      width: 115px;
    }
    .select,
    input {
      margin-right: 50px;
    }
    label {
      margin-right: 10px;
    }
  }
  .main_table {
    .table_number {
      width: 10%;
    }
    span {
      cursor: pointer;
      margin-right: 10px;
      color: rgb(0, 235, 255);
    }
    td span:hover {
      border-bottom: 1px solid rgb(0, 235, 255);
    }
  }
}
</style>