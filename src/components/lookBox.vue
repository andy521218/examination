<template>
  <div class="cont_bg look_box">
    <edit-result v-if="result" :editTitle="editTitle"></edit-result>
    <div class="mask"   v-if="result"></div>
    <div class="cont_header">{{ title }}诊断</div>
    <ul>
      <li v-for="(item, index) in data" :key="index" @click="tabShow(index)">
        <div class="item_cont">
          <div class="item_left">
            <i></i>
            <span>{{ item.title }}</span>
          </div>
          <div class="item_right" :class="{ transform: item.show }"></div>
        </div>
        <div class="item_container" :class="{ active: item.show }">
          <p v-for="(i, index) in item.item" :key="index">{{ i }}</p>
        </div>
      </li>
    </ul>
    <button class="addResult" @click="editResult()">+</button>
  </div>
</template>

<script>
import editResult from "../pages/admin/edit/editResult";
export default {
  name: "look-box",
  data() {
    return {
      index: "1",
      transformIndex: "-1",
      result: false,
      editTitle: this.title,
    };
  },
  components: {
    editResult,
  },
  props: ["data", "title", "editshow"],
  methods: {
    tabShow(index) {
      this.data[index].show = !this.data[index].show;
    },
    editResult() {
      this.result = true;
    },
  },
};
</script>

<style lang="scss">
.look_box {
  .edit {
    top: 45px;
    width: 96%;
    margin-left: 2%;
    .title {
      width: 135px;
    }
    .edit_left{
      width: 100px;
    }
    li {
      border: none;
    }
  }
}
</style>
