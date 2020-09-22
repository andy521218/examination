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
import { mapState } from "vuex";
export default {
  name: "cont-bg",
  data() {
    return {
      index: "1",
      transformIndex: "-1",
    };
  },
  props: ["data", "title"],
  computed: {
    ...mapState(["titleName"]),
  },
  methods: {
    tabShow(index) {
      this.data[index].show = !this.data[index].show;
    },
    editResult() {
     this.titleName=this.title
    },
  },
};
</script>

<style lang="scss">
.cont_bg {
  width: 30%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  ul {
    width: 96%;
    margin: 0 auto;
    li {
      width: 100%;
      border-bottom: 1px solid rgb(0, 235, 255);
      padding: 10px;
      .item_cont {
        display: flex;
        justify-content: space-between;
        .item_left {
          i {
            background: rgb(255, 255, 255);
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: inline-block;
            margin: 0 10px;
          }
        }
        .item_right {
          width: 0;
          height: 0;
          border: 10px solid;
          transform: rotate(-90deg);
          border-color: rgb(255, 255, 255) transparent transparent;
        }
        .transform {
          transform: rotate(0deg);
        }
      }
      .item_container {
        width: 100%;
        padding-left: 25px;
        display: none;
        p {
          padding: 5px;
        }
      }
      .active {
        display: block;
      }
    }
  }
}
</style>