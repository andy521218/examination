<template>
  <div class="login" ref="login">
    <div class="login-bg">
      <div class="login-left">
        <img src="../assets/img/login/left.png" alt />
      </div>
      <div class="login-right">
        <div class="login-box user">
          <img src="../assets/img/login/user.png" alt />
          <input type="text" v-model="user" placeholder="用户名" />
        </div>
        <div class="login-box pwd">
          <img src="../assets/img/login/pwd.png" alt />
          <input type="password" v-model="pwd" placeholder="请输入密码......" />
        </div>
        <div class="related">
          <div class="related_left">
            <input type="radio" :checked="isChecked" @click="checked" />
            <label for>记住密码</label>
          </div>
          <div class="related_right">
            <span>忘记密码?</span>
          </div>
        </div>
        <div class="btn" @click="login">
          <span>登 入</span>
        </div>
        <span class="count">访问次数:123456次</span>
        <div class="notes">技术支持:上海域园信息科技有限公司</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: "",
      pwd: "",
      isShow: true,
      isChecked: false,
    };
  },
  methods: {
    checked() {
      this.isChecked = !this.isChecked;
    },
    login() {
      this.$router.replace("/home");
    },
  },
};
</script>

<style lang="scss">
.login {
  height: 100%;
  color: rgb(255, 255, 255);
  position: relative;
  .login-bg {
    width: 100%;
    height: 100%;
    display: flex;
    min-width: 1200px;
    min-height: 920px;
    overflow: hidden;
    background: url("../assets/img/login/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .login-left {
    width: 960px;
    height: 880px;
    margin-top: 110px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .login-right {
    margin-top: 8%;
    margin-left: 10%;
    width: 502px;
    height: 565px;
    background: url("../assets/img/login/login_bg.png") no-repeat;
    position: relative;
    .login-box {
      height: 49px;
      width: 359px;
      border: 1px solid rgb(255, 255, 255);
      background-color: rgb(20, 37, 75);
      border-radius: 6px;
      display: flex;
      margin: 30px auto;
      position: relative;

      ::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: rgb(255, 255, 255);
      }
      :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: rgb(255, 255, 255);
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: rgb(255, 255, 255);
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgb(255, 255, 255);
      }
      input {
        height: 49px;
        width: 310px;
        margin-left: 10px;
        color: rgb(255, 255, 255);
        background-color: rgb(20, 37, 75);
        border: none;
        outline: none;
      }
      img {
        margin-top: 12px;
        margin-left: 10px;
        height: 25px;
        width: 25px;
      }
    }
    .login-box.user {
      margin-top: 210px;
    }
    .related {
      margin: 30px auto;
      display: flex;
      justify-content: space-between;
      height: 49px;
      width: 359px;
      span,
      label {
        height: 49px;
        line-height: 49px;
      }
      .related_left,
      .related_right {
        height: 49px;
        input {
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
    }
    .btn {
      width: 390px;
      height: 49px;
      background: url("../assets/img/login/btn.png") no-repeat center;
      margin: 10px auto;
      position: relative;
      span {
        width: 49px;
        height: 49px;
        line-height: 49px;
        position: absolute;
        font-size: 18px;
        left: 180px;
      }
    }
    .btn:hover {
      background: url("../assets/img/login/btnmove.png") no-repeat center;
    }
    .count {
      position: absolute;
      bottom: -47px;
      right: 0;
    }
    .notes {
      position: absolute;
      right: 0;
      bottom: -35%;
    }
    @media (min-height: 937.98px) {
      .notes {
        bottom: -55%;
      }
    }
  }
}
</style>