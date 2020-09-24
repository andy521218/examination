<template>
  <div class="cont_bg">
    <edit-hear v-if="hearData.show" :hearData="hearData"></edit-hear>
    <div class="mask"  v-if="hearData.show"></div>
    <div class="cont_header">{{title}}</div>
    <ul>
      <li v-for="(item,index) in data" :key="index">
        <div class="item_cont" @click="tabShow(index)">
          <div class="item_left">
            <i></i>
            <span>{{item.title}}</span>
          </div>
          <div class="item_right" :class="{'transform':item.show}"></div>
        </div>
        <div class="item_container" :class="{'active':item.show}">
          <div class="item_container_between" v-for="(i,index) in item.item" :key="index">
            <p>{{i}}</p>
            <div>
              <span>查看</span>
              <span>编辑</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <button class="addResult" @click="editResult()">+</button>
  </div>
</template>

<script>
import editHear from "../pages/admin/edit/editHear";
export default {
  name: "hear-box",
  components: {
    editHear,
  },
  data() {
    return {
      index: "1",
      transformIndex: "-1",
      hearData: {
        show: false,
        sex: "男",
        id: true,
      },
    };
  },
  props: ["data", "title", "editshow"],
  methods: {
    tabShow(index) {
      this.data[index].show = !this.data[index].show;
    },
    editResult() {
      /男/.test(this.title)
        ? (this.hearData.sex = "男")
        : (this.hearData.sex = "女");
      this.hearData.show = true;
    },
  },
};
</script>
