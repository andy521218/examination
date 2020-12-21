<template>
  <div class="user_menu">
    <div
      class="admin_menu_item"
      v-for="(item, index) in menuData"
      :key="index"
      v-show="item.title != '修改密码' && item.title != '个人信息'"
    >
      <p :class="{ active: menuId == index }" @click="oneRouting(index)">
        {{ item.title }}
      </p>
      <ul :class="{ show: menuId == index }">
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
      colorIndex: "0",
      menuData: [],
      authority: "",
    };
  },
  computed: {
    ...mapState([
      "adminMenu",
      "teacherMenu",
      "stuedntMenu",
      "menuId",
      "messageMenu",
    ]),
  },
  mounted() {
    this.getMenu();
  },
  methods: {
    getMenu() {
      if (this.$store.state.menuId == "-1") {
        this.$store.state.menuId = localStorage.getItem("bgindex");
      }
      this.axios.get("/users/current").then((res) => {
        if (res.code == "000000") {
          localStorage.setItem("authority", res.data.authority);
          this.authority = res.data.authority;
          if (res.data.authority == "ADMIN") {
            this.menuData = this.adminMenu;
            return;
          }
          if (res.data.authority == "TEACHER") {
            this.menuData = [];
            if (/message/.test(window.location)) {
              this.menuData.push(this.messageMenu[0]);
              this.menuData.push(this.messageMenu[3]);
              return;
            }
            if (
              /teacher/.test(window.location) ||
              /examanalysis/.test(window.location) ||
              /trainanalysis/.test(window.location)
            ) {
              this.menuData = this.teacherMenu;
              return;
            }
          }
          if (res.data.authority == "STUDENT") {
            if (/message/.test(window.location)) {
              return (this.menuData = this.messageMenu);
            }
            this.menuData = this.stuedntMenu;
            return;
          }
        }
      });
    },
    oneRouting(index) {
      this.$store.state.menuId = index;
      localStorage.setItem("bgindex", index);
      this.menuData[index].show = !this.menuData[index].show;
      this.$router.push(this.menuData[index].router);
    },
    twoRouting(index, i) {
      this.colorIndex = i;
      this.$router.push(this.menuData[index].itemRouter[i]);
    },
  },
  watch: {
    $route() {
      this.getMenu();
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