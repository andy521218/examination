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
export default {
  name: "user-home",
  data() {
    return {
      bgIndex: "-1",
      colorIndex: "-1",
      menuData: "",
      adminMenu: [
        {
          title: "教师管理",
          item: "",
          show: false,
          router: "adminmaster",
          itemRouter: "",
        },
        {
          title: "编制管理",
          item: "",
          show: false,
          router: "adminorganization",
          itemRouter: "",
        },
        {
          title: "数据管理",
          item: "",
          show: false,
          router: "adminstatistics",
          itemRouter: "",
        },
        {
          title: "内容管理",
          item: [
            "望诊诊断",
            "闻诊诊断",
            "切诊诊断",
            "病名诊断",
            "治则治法",
            "方剂方药",
            "药材库",
          ],
          show: false,
          router: "admincontent",
          itemRouter: [
            "adminlook",
            "adminhear",
            "adminpulse",
            "adminname",
            "admintreatment",
            "adminprescription",
            "adminHerb",
          ],
        },
        {
          title: "LOGO修改",
          item: "",
          show: false,
          router: "adminlogo",
          itemRouter: "",
        },
        {
          title: "算分逻辑",
          item: "",
          show: false,
          router: "adminnumber",
          itemRouter: "",
        },
      ],
      teacherMenu: [
        {
          title: "账号管理",
          router: "teacheruser",
          item: "",
        },
        {
          title: "班级管理",
          router: "teacherclass",
          item: "",
        },
        {
          title: "学生成绩",
          router: "teacherstudent",
          item: "",
        },
        {
          title: "案例管理",
          router: "teachercase",
          item: "",
        },
        {
          title: "发布考试",
          router: "teacherrelease",
          item: "",
        },
        {
          title: "数据分析",
          router: "teacherstatistics",
          item: "",
        },
      ],
      stuedntMenu: [
        {
          title: "个人信息",
          router: "usercenter",
          item: "",
        },
        {
          title: "修改密码",
          router: "userpassword",
          item: "",
        },
        {
          title: "学习记录",
          router: "userrecord",
          item: "",
        },
        {
          title: "考试成绩",
          router: "userachievement",
          item: "",
        },
        {
          title: "数据统计",
          router: "userstatistics",
          item: "",
        },
      ],
    };
  },
  mounted() {
    this.axios.get("/users/current").then((res) => {
      if (res.code == "000000") {
        localStorage.setItem("authority", res.data.authority);
        if (res.data.authority == "ADMIN") {
          this.menuData = this.adminMenu;
          return;
        }
        if (res.data.authority == "TEACHER") {
          this.menuData = this.teacherMenu;
          return;
        }
        if (res.data.authority == "STUDENT") {
          this.menuData = this.stuedntMenu;
          return;
        }
      }
    });
  },

  methods: {
    oneRouting(index) {
      this.bgIndex = index;
      this.menuData[index].show = !this.menuData[index].show;
      this.$router.push(this.menuData[index].router);
    },
    twoRouting(index, i) {
      this.colorIndex = i;
      this.$router.push(this.menuData[index].itemRouter[i]);
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