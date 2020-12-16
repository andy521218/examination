<template>
  <div class="main_table_none_title">
    <span>{{ title ? title : "暂无数据" }}</span>
    <div class="main_table_none_title_bottm"></div>
  </div>
</template>

<script>
export default {
  name: "main-itps",
  props: ["title"],
};
</script>

<style lang="scss">
.main_table_none_title {
  width: 1300px;
  height: 100px;
  margin: 5% auto;
  border: 1px solid rgb(9, 124, 168);
  background: rgb(11, 59, 105);
  text-align: center;
  position: relative;
  span {
    font-size: 18px;
    line-height: 100px;
  }
  .main_table_none_title_bottm {
    position: absolute;
    width: 400px;
    height: 5px;
    background: rgb(0, 235, 255);
    border-radius: 3px;
    bottom: 0px;
    left: 450px;
  }
}
</style>