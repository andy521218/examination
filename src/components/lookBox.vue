<template>
  <div class="cont_bg">
    <div class="cont_header">{{title}}诊断</div>
    <ul>
      <li v-for="(item,index) in data" :key="index" @click="tabShow(index)">
        <div class="item_cont">
          <div class="item_left">
            <i></i>
            <span>{{item.title}}</span>
          </div>
          <div class="item_right" :class="{'transform':item.show}"></div>
        </div>
        <div class="item_container" :class="{'active':item.show}">
          <p v-for="(i,index) in item.item" :key="index">{{i}}</p>
        </div>
      </li>
    </ul>
    <button class="addResult" @click="editResult()">+</button>
  </div>
</template>

<script>
export default {
  name: "look-box",
  data() {
    return {
      index: "1",
      transformIndex: "-1",
    };
  },
  props: ["data", "title",'editshow'],
  methods: {
    tabShow(index) {
      this.data[index].show = !this.data[index].show;
    },
    editResult() {
     this.$emit('editshow',true)
    },
  },
};
</script>
