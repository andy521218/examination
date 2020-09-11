<template>
  <div class="home_user">
    <div>
      <span class="news">
        <img src="../assets/img/home/news.png" alt />
      </span>
      <span class="count">9</span>
      <span class="field">消息</span>
      <span class="user_log">
        <img src="../assets/img/home/user.png" alt />
      </span>
      <span class="user_name">姓名</span>
    </div>
    <div class="select">
      <div class="triangle"></div>
      <div class="select_name">用户名</div>
      <div class="select_list">
        <ul>
          <li
            v-for="(item,index) in list"
            :key="index"
            :class="{'select_item':itemIndex==index}"
            @click="isbg(index)"
          >{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-header",
  data() {
    return {
      list: ["个人信息", "密码修改", "学习记录", "数据统计", "退出登入"],
      itemIndex: "0",
    };
  },
  methods: {
    isbg(i) {
      this.itemIndex = i;
    },
  },
};
</script>

<style lang="scss">
.home_user {
  float: right;
  width: 245px;
  margin-top: 10px;
  height: 50px;
  position: relative;
  box-sizing: border-box;
  span {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
  }
  .news {
    width: 27px;
    img {
      height: 30px;
      width: 27px;
    }
  }
  .count {
    width: 14px;
    height: 14px;
    line-height: 14px;
    font-size: 8px;
    position: absolute;
    left: 13px;
    top: 6px;
    border-radius: 50%;
    background-color: rgb(255, 0, 0);
  }
  .field {
    height: 14px;
    line-height: 30px;
    margin-bottom: 15px;
    margin-left: 5px;
    margin-right: 32px;
  }
  .user_log {
    height: 50px;
    width: 50px;
    img {
      height: 50px;
      width: 50px;
      border: 1px solid rgb(4, 111, 174);
      border-radius: 50%;
    }
  }
  .user_name {
    margin-left: 10px;
  }
  .select {
    width: 150px;
    background: rgb(255, 255, 255);
    margin-top: 30px;
    margin-left: 50px;
    position: relative;
    text-align: center;
    z-index: 999;
    .triangle {
      width: 50px;
      height: 50px;
      background: rgb(255, 255, 255);
      transform: rotate(-45deg);
      position: absolute;
      top: -10px;
      left: 50px;
      z-index: -999;
    }
    .select_name {
      color: rgb(34, 163, 247);
      height: 50px;
      z-index: 99;
      line-height: 50px;
      border-bottom: 1px solid rgb(220, 230, 239);
      // box-shadow: 0 20px 5px rgb(222,232,241);
    }
    .select_list {
      color: rgb(0, 0, 0);
      li {
        height: 35px;
        line-height: 35px;
      }
      li:hover {
        color: rgb(255, 255, 255);
        background-image: linear-gradient(
          to right,
          rgb(18, 195, 237),
          rgb(47, 138, 255)
        );
      }
      .select_item {
        color: rgb(255, 255, 255);
        background-image: linear-gradient(
          to right,
          rgb(18, 195, 237),
          rgb(47, 138, 255)
        );
      }
    }
  }
}
</style>