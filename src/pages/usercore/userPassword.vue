<template>
  <div class="user_pwd">
    <ul>
      <li>
        <span>旧密码:</span>
        <input type="text" class="text_box" v-model="password.oldPwd" />
        <p>{{ oldPwd }}</p>
      </li>
      <li style="position: relative">
        <span>新密码:</span>
        <input :type="type" class="text_box" v-model="password.newPwd" />
        <img
          v-if="type == 'password'"
          src="../../assets/public/pwd.png"
          class="edit_pwd"
          @click="type = 'text'"
        />
        <img
          v-else
          src="../../assets/public/pwdmove.png"
          @click="type = 'password'"
          class="edit_pwd"
        />
        <p>{{ newPwd }}</p>
      </li>
      <li style="position: relative">
        <span>确认新密码:</span>
        <input :type="type" class="text_box" v-model="password.confirmPwd" />
        <img
          v-if="type == 'password'"
          src="../../assets/public/pwd.png"
          class="edit_pwd"
          @click="type = 'text'"
        />
        <img
          v-else
          src="../../assets/public/pwdmove.png"
          @click="type = 'password'"
          class="edit_pwd"
        />
        <p>{{ confirmPwd }}</p>
      </li>
    </ul>
    <button class="submit" @click="submit">保存</button>
  </div>
</template>

<script>
export default {
  name: "user-pwd",
  data() {
    return {
      password: {},
      oldPwd: "",
      newPwd: "",
      confirmPwd: "",
      type: "password",
    };
  },
  methods: {
    submit() {
      if (!this.password.oldPwd) {
        return (this.oldPwd = "请输入旧密码");
      }
      this.oldPwd = "";
      if (!this.password.newPwd) {
        return (this.newPwd = "请输入新密码");
      }
      this.newPwd = "";
      if (!this.password.confirmPwd) {
        return (this.confirmPwd = "请确认新密码");
      }
      this.confirmPwd = "";
      if (this.password.newPwd != this.password.confirmPwd) {
        return (this.newPwd = "两次输入密码不一致");
      }
      this.http
        .put(
          `/my/password?${this.qs.stringify({
            oldPasswd: this.password.oldPwd,
            newPasswd: this.password.newPwd,
          })}`
        )
        .then((res) => {
          if (res.code == "000000") {
            this.$Message.warning("密码修改成功!");
            this.password = {};
            this.$router.push("/");
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
  },
};
</script>

<style lang="scss">
.user_pwd {
  width: 700px;
  margin: 0 auto;
  ul {
    width: 100%;
    li {
      display: flex;
      margin-top: 80px;
      height: 45px;
      line-height: 45px;
      span {
        text-align: right;
        width: 100px;
      }
      .text_box {
        width: 325px;
        margin: 0 10px;
      }
      .edit_pwd {
        width: 19px;
        height: 13px;
        position: absolute;
        right: 275px;
        top: 10px;
      }
      p {
        color: rgb(255, 0, 0);
      }
    }
  }
  .submit {
    width: 376px;
    height: 45px;
    margin: 200px 0 0 80px;
  }
}
</style>