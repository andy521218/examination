<template>
  <div class="user_center">
    <div class="user_top">
      <div class="user_big">
        <div class="user_small">
          <img src alt />
          <span class="edit">点击修改头像</span>
        </div>
        <span class="user_number">20200912</span>
      </div>
    </div>
    <div class="user_bottom">
      <ul>
        <li>
          <span>姓名:</span>
          <p>{{ current.userName }}</p>
        </li>
        <li>
          <span>班级:</span>
          <p>{{ current.classRoomName }}</p>
        </li>
        <li>
          <span>手机号:</span>
          <input class="text_box" type="text" />
        </li>
        <li>
          <span>邮箱:</span>
          <input class="text_box" type="text" />
        </li>
      </ul>
      <button class="submit">保存</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-center",
  data() {
    return {
      current: {},
    };
  },
  mounted() {
    this.getCurrent();
  },
  methods: {
    getCurrent() {
      this.axios.get("/users/current").then((res) => {
        this.current = res.data;
      });
    },
  },
};
</script>
<style lang="scss">
.user_center {
  .user_top {
    width: 99%;
    height: 315px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(9, 124, 168);
    position: relative;
    .user_big {
      width: 215px;
      height: 215px;
      position: absolute;
      top: 50px;
      left: 50%;
      margin-left: -108px;
      border: 1px solid rgb(9, 124, 168);
      border-radius: 50%;
      padding: 5px;
      .user_small {
        width: 100%;
        height: 100%;
        border: 3px solid rgb(32, 85, 127);
        border-radius: 50%;
        .edit {
          position: relative;
          width: 100px;
          bottom: -225px;
        }
      }
      .user_number {
        width: 200px;
        height: 25px;
        position: relative;
        left: 240px;
        top: -115px;
        font-size: 20px;
      }
    }
  }
  .user_bottom {
    width: 1000px;
    margin: 0 auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      li {
        display: flex;
        width: 350px;
        height: 45px;
        line-height: 45px;
        margin-left: 100px;
        margin-top: 70px;
        span {
          margin-right: 10px;
        }
        .text_box {
          width: 275px;
        }
      }
    }
    .submit {
      width: 370px;
      height: 45px;
      line-height: 30px;
      margin: 90px auto;
    }
  }
}
</style>