<template>
  <div class="user_record">
    <div class="main_header"></div>
    <div class="main_table">
      <table class="main_table">
        <thead class="thead-dark">
          <tr>
            <th>序号</th>
            <th>病系</th>
            <th>患者</th>
            <th>开始时间</th>
            <th>完成时间</th>
            <th>用时</th>
            <th>成绩</th>
            <th>查看</th>
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
         <!--  <tr>
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
          </tr> -->
        </tbody>
      </table>
    </div>
    <turn-page></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
export default {
    name: "user-record",
    components:{
        turnPage
    }
}
</script>

<style lang="scss">
    .user_record{
        .main_table{
            span{
                cursor: pointer;
                margin-right: 10px;
                border-bottom: rgb(0,235,255) 1px solid;
                color: rgb(0,235,255);
            }
        }
    }
</style>