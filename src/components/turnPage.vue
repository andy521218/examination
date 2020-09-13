<template>
  <div class="turn_page">
    <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
    <div class="count">
      <span>共20条数据/每页10条</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "turn_page",
};
</script>

<style lang="scss">
.turn_page {
  width: 100%;
  height: 28px;
  display: flex;
  margin-top: 30px;
  .count {
      margin-right: 32px;
  }
  .el-pagination {
    width: 450px;
    margin: 0 auto;
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      border: none;
      background-color: '';
    }
    .active{
      background: rgb(3,198,216) !important;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      border: 1px solid rgb(255, 255, 255);
      background-color: rgba(10, 30, 63, 0.1);
      color: rgb(255, 255, 255);
    }
  }
}
</style>