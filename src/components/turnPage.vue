<template>
  <div class="turn_page">
    <div class="pagination">
      <Page :total="totaltotal" :page-size="size" @on-change="change" />
    </div>
    <div class="count">
      <span>共{{ totaltotal }}条数据/每页{{ size }}条</span>
    </div>
  </div>
</template>

<script>
import { Page } from "view-design";
export default {
  name: "turn_page",
  props: ["totaltotal", "size"],
  data() {
    return {
      pageNumber: "",
      pages: "1",
    };
  },
  methods: {
    page(index) {
      this.pageNumber = index;
    },
    change(page) {
      this.pages = page;
      this.$emit("getData", page);
    },
  },
  components: {
    Page,
  },
};
</script>

<style lang="scss">
.turn_page {
  width: 100%;
  height: 28px;
  display: flex;
  margin-top: 30px;
  .count {
    margin-top: 10px;
    margin-right: 32px;
  }
  .pagination {
    margin: 0 auto;
    .ivu-page {
      text-align: center;
      a {
        color: rgb(255, 255, 255);
        text-decoration: none;
      }
      .ivu-page-item {
        background: transparent;
        border: 1px solid rgb(255, 255, 255);
      }
      .ivu-page-next,
      .ivu-page-prev {
        background: transparent;
      }
      .ivu-page-item a,
      .ivu-page-next a,
      .ivu-page-prev a {
        color: rgb(255, 255, 255);
      }
      .ivu-page-item:hover,
      .ivu-page-next:hover,
      .ivu-page-prev:hover,
      .ivu-page-item-jump-next:hover {
        color: rgb(255, 255, 255);
        background: rgb(0, 235, 255);
        border: 1px solid rgb(0, 235, 255);
      }
      .ivu-page-item-active {
        border: 1px solid rgb(0, 235, 255);
        background: rgb(0, 235, 255) !important;
      }
    }
  }
}
</style>