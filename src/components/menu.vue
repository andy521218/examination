<template>
  <div class="user_menu">
    <div class="admin_menu_item" v-for="(item, index) in menuData" :key="index">
      <p :class="{ active: bgIndex == index }" @click="oneRouting(index)">
        {{ item.title }}
      </p>
      <ul :class="{ show: bgIndex == index }">
        <li
          v-for="(item, i) in item.item"
          :key="i"
          :class="{ color: i == colorIndex }"
        >
          <i></i>
          <span @click="twoRouting(index, i)">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "user-home",
  data() {
    return {
      bgIndex: "-1",
      colorIndex: "-1",
    };
  },
  computed: {
    ...mapState(["menuData"]),
  },
  methods: {
    oneRouting(index) {
      this.bgIndex = index;
      this.menuData[index].show = !this.menuData[index].show;
      this.$router.push(this.menuData[index].router);
    },
    twoRouting(index, i) {
      this.colorIndex = i;
      this.$router.push(this.menuData[index].router);
    },
  },
};
</script>

<style lang="scss">
.admin_menu_item {
  width: 157px;
  margin-bottom: 29px;
  p {
    height: 54px;
    line-height: 54px;
    text-align: center;
    font-size: 20px;
    background: url("../assets/public/menu.png");
    cursor: pointer;
  }
  p:hover {
    background: url("../assets/public/menumove.png");
  }
  .active {
    background: url("../assets/public/menumove.png");
  }
  ul {
    width: 100%;
    margin-top: 25px;
    display: none;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 10px;
      cursor: pointer;
      i {
        width: 13px;
        height: 13px;
        background: rgb(255, 255, 255);
        border-radius: 50%;
        margin-left: 35px;
        margin-right: 15px;
      }
      span {
        font-size: 20px;
      }
      i:hover {
        background: rgb(0, 235, 255);
      }
      span:hover {
        color: rgb(0, 235, 255);
      }
    }
    .color {
      i {
        background: rgb(0, 235, 255);
      }
      span {
        color: rgb(0, 235, 255);
      }
    }
  }
  .show {
    display: block;
  }
}
</style>