<template>
  <div class="user_record">
    <div class="main_header"></div>
    <div class="main_table">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%;"
        :header-cell-style="{background:' rgba(10,40,70)'}"
        :row-style="{height: '53px'}"
      >
        <el-table-column prop="serialNumber" label="序号" class="serialNumber"></el-table-column>
        <el-table-column prop="category" label="病系"></el-table-column>
        <el-table-column prop="name" label="患者"></el-table-column>
        <el-table-column prop="startTime" label="开始时间"></el-table-column>
        <el-table-column prop="endtTime" label="结束时间"></el-table-column>
        <el-table-column prop="time" label="用时"></el-table-column>
        <el-table-column prop="achievement" label="成绩"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template>
            <span>继续学习</span>
            <!-- <span>辩证过程</span>
            <span>思维导图</span>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <turn-page></turn-page>
  </div>
</template>

<script>
import turnPage from "../../components/turnPage";
export default {
  name: "user-record",
  data() {
    return {
      tableData: [
        {
          serialNumber: "1",
          category: "肺系病",
          name: "王小虎",
          startTime: "2016-05-02",
          endtTime: "2016-05-02",
          time: "10min",
          achievement: "99",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          serialNumber: "1",
          category: "肺系病",
          name: "王小虎",
          startTime: "2016-05-02",
          endtTime: "2016-05-02",
          time: "10min",
          achievement: "99",
          address: "上海市普陀区金沙江路 1518 弄",
        },

        {
          serialNumber: "1",
          category: "肺系病",
          name: "王小虎",
          startTime: "2016-05-02",
          endtTime: "2016-05-02",
          time: "10min",
          achievement: "99",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          serialNumber: "1",
          category: "肺系病",
          name: "王小虎",
          startTime: "2016-05-02",
          endtTime: "2016-05-02",
          time: "10min",
          achievement: "99",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          serialNumber: "1",
          category: "肺系病",
          name: "王小虎",
          startTime: "2016-05-02",
          endtTime: "2016-05-02",
          time: "10min",
          achievement: "99",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          serialNumber: "1",
          category: "肺系病",
          name: "王小虎",
          startTime: "2016-05-02",
          endtTime: "2016-05-02",
          time: "10min",
          achievement: "99",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          serialNumber: "1",
          category: "肺系病",
          name: "王小虎",
          startTime: "2016-05-02",
          endtTime: "2016-05-02",
          time: "10min",
          achievement: "99",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          serialNumber: "1",
          category: "肺系病",
          name: "王小虎",
          startTime: "2016-05-02",
          endtTime: "2016-05-02",
          time: "10min",
          achievement: "99",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          serialNumber: "1",
          category: "肺系病",
          name: "王小虎",
          startTime: "2016-05-02",
          endtTime: "2016-05-02",
          time: "10min",
          achievement: "99",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          serialNumber: "1",
          category: "肺系病",
          name: "王小虎",
          startTime: "2016-05-02",
          endtTime: "2016-05-02",
          time: "10min",
          achievement: "99",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
  },
  components: {
    turnPage,
  },
};
</script>
<style lang="scss">
.user_record {
  width: 98%;
  margin: 0 auto;
  .main_table {
    td,
    th {
      text-align: center;
    }
    tr:hover td{
      background: red;
    }
    margin-top: 20px;
  }
}
</style>