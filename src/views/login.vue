<template>
  <div class="login" ref="login">
    <div class="login-bg">
      <div class="center_auto">
        <div class="setting_logo">
          <img :src="url" alt="" />
        </div>
        <div class="login-left">
          <img src="../assets/img/login/left.png" alt />
        </div>
        <div class="login-right" v-show="!RetrievePassword_show">
          <div class="login-box user">
            <img src="../assets/img/login/user.png" alt />
            <input
              type="text"
              v-model="user"
              placeholder="用户名"
              @change="userName"
            />
          </div>
          <div class="login-box pwd">
            <img src="../assets/img/login/pwd.png" alt />
            <input
              type="password"
              v-model="pwd"
              placeholder="请输入密码......"
              @change="password"
            />
          </div>
          <div class="related">
            <div class="related_left">
              <input type="checkbox" v-model="isChecked" @change="delePwd" />
              <label for>记住密码</label>
            </div>
            <div class="related_right">
              <span @click="RetrievePassword_show = true">忘记密码?</span>
            </div>
          </div>
          <div class="btn" @click="login">
            <span>登 入</span>
          </div>
          <span class="count">访问次数:{{ count }}次</span>
          <div class="notes">技术支持:上海域园信息科技有限公司</div>
        </div>
        <RetrievePassword v-if="RetrievePassword_show" />
      </div>
    </div>
  </div>
</template>

<script>
import user from "../router/user";
import admin from "../router/admin";
import teacher from "../router/teacher";
import RetrievePassword from "../components/RetrievePassword";

export default {
  name: "login",
  data() {
    return {
      user: "",
      pwd: "123456",
      isShow: true,
      isChecked: false,
      RetrievePassword_show: false,
      count: "",
      url: "",
    };
  },
  components: {
    RetrievePassword,
  },
  mounted() {
    this.user = localStorage.getItem("user");
    this.pwd = localStorage.getItem("pwd");
    this.isChecked = localStorage.getItem("isChecked");
    this.axios.get("/metrics/login").then((res) => {
      this.count = res.data;
    });
    let url = this.$url.replace("/download/", "");
    this.url = url + "/metrics/logo";
  },
  methods: {
    userName() {
      if (!this.user) {
        return false;
      }
      return true;
    },
    delePwd() {
      if (!this.isChecked) {
        localStorage.clear();
      }
    },
    password() {
      if (!this.pwd) {
        return false;
      }
      return true;
    },
    login() {
      if (!this.userName() || !this.password()) {
        return this.$Message.error("用户名或密码不能为空");
      }
      this.axios
        .post("login", {
          username: this.user,
          password: this.pwd,
        })
        .then((res) => {
          if (res.code == "000000") {
            localStorage.setItem("authority", res.data.authority);
            if (res.data.authority == "STUDENT") {
              this.$router.addRoutes(user);
            }
            if (res.data.authority == "ADMIN") {
              this.$Message.warning(`${this.user},登入成功!`);
              this.$router.addRoutes(admin);
              this.$router.push("/adminmaster");
              return;
            }
            if (res.data.authority == "TEACHER") {
              this.$router.addRoutes(teacher);
            }
            if (this.isChecked) {
              localStorage.setItem("user", this.user);
              localStorage.setItem("pwd", this.pwd);
              localStorage.setItem("isChecked", this.isChecked);
            }

            this.$store.state.authority = res.data.authority;
            this.$Message.warning(`${this.user},登入成功!`);
            this.$router.push("/index");
            return;
          } else {
            this.$Message.error(res.msg);
          }
        });
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
    overflow: hidden;
    background: url("../assets/img/login/bg.png") no-repeat;
    background-size: 100% 100%;
    .center_auto {
      width: 100%;
      height: 100%;
      max-width: 1920px;
      max-height: 937px;
      display: flex;
      margin: auto auto;
      position: relative;
    }
    .setting_logo {
      position: absolute;
      width: 50%;
      top: 2%;
      right: 2%;
      display: flex;
      justify-content: flex-end;
    }
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
      input {
        height: 47px;
        width: 310px;
        line-height: 47px;
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
        span {
          cursor: pointer;
        }
      }
    }
    .btn {
      width: 390px;
      height: 49px;
      background: url("../assets/img/login/btn.png") no-repeat center;
      margin: 10px auto;
      position: relative;
      cursor: pointer;
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