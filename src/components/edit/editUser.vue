<template>
  <div class="edit">
    <div class="edit_title">
      <span class="title">{{ tips ? "添加" : "编辑" }}{{ title }}</span>
      <span class="edit_switch" @click="close"></span>
    </div>
    <ul>
      <li>
        <slot name="user"></slot>
        <input
          type="text"
          class="text_box"
          placeholder="请输入用户名/学号"
          v-model="upData.userName"
          @change="checkuserName"
        />
        <p class="edit_tips">{{ userNameText }}</p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">密码:</span>
        </div>
        <input
          :type="type"
          class="text_box"
          placeholder="请输入密码"
          v-model="upData.passwd"
          @change="checkpasswd"
        />
        <img
          src="../../assets/public/pwd.png"
          class="edit_pwd"
          alt
          v-if="pwdSwitch"
          @click="pwdShow"
        />
        <img
          src="../../assets/public/pwdmove.png"
          class="edit_pwd"
          alt
          v-else
          @click="pwdShow"
        />
        <p class="edit_tips">{{ passwdText }}</p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_red">*</span>
          <span class="edit_text">姓名:</span>
        </div>
        <input
          type="text"
          class="text_box"
          v-if="tips"
          placeholder="请输入姓名"
          v-model="upData.name"
          @change="checkavatar"
        />
        <span class="edit_text_i" v-else>{{ upData.name }}</span>
        <p class="edit_tips">{{ avaterText }}</p>
      </li>
      <li>
        <slot name="select"></slot>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_text">手机号:</span>
        </div>
        <input
          type="text"
          class="text_box"
          placeholder="请输入手机号"
          v-model="upData.mobile"
          @change="checkPhone"
        />
        <p class="edit_tips">{{ mobileText }}</p>
      </li>
      <li>
        <div class="edit_left">
          <span class="edit_text">邮箱:</span>
        </div>
        <input
          type="text"
          class="text_box"
          placeholder="请输入邮箱"
          v-model="upData.email"
          @change="checkEmail"
        />
        <p class="edit_tips">{{ emailText }}</p>
      </li>
    </ul>
    <div class="edit_btn_box">
      <button class="edit_cancel" @click="close">取消</button>
      <button class="edit_submit" @click="submit">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-user",
  data() {
    return {
      pwdSwitch: true,
      type: "password",
      classRoom: "",
      mobileText: "",
      emailText: "",
      avaterText: "",
      passwdText: "",
      userNameText: "",
    };
  },
  props: ["tips", "upData", "title"],
  methods: {
    pwdShow() {
      this.pwdSwitch = !this.pwdSwitch;
      this.pwdSwitch ? (this.type = "password") : (this.type = "text");
    },
    close() {
      this.$parent.upData = {};
      this.$parent.tips = true;
      this.$parent.editStudentShow = false;
    },
    checkavatar() {
      if (!this.upData.avatar) {
        this.avaterText = "请输入用户名/学号";
        return false;
      }
      this.avaterText = "";
      return true;
    },
    checkpasswd() {
      if (!this.upData.passwd) {
        this.passwdText = "请输入密码";
        return false;
      }
      this.passwdText = "";
      return true;
    },
    checkuserName() {
      if (!this.upData.userName) {
        this.userNameText = "请输入密码";
        return false;
      }
      this.userNameText = "";
      return true;
    },

    checkPhone() {
      if (!this.upData.mobile) {
        this.mobileText = "";
        return true;
      }
      if (
        !/^1(?:70\d|(?:9[89]|8[0-24-9]|7[135-8]|66|5[0-35-9])\d|3(?:4[0-8]|[0-35-9]\d))\d{7}$/.test(
          this.upData.mobile
        )
      ) {
        this.mobileText = "请输入正确手机号";
        return false;
      }
      return true;
    },
    checkEmail() {
      /* eslint-disable */
      if (!this.upData.email) {
        this.emailText = "";
        return true;
      }
      var reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (!reg.test(this.upData.email)) {
        this.emailText = "请输入正确邮箱";
        return false;
      }
      return true;
    },
    submit() {
      if (this.checkEmail() || this.checkPhone()) {
        if (this.checkavatar() && this.checkpasswd() && this.checkuserName()) {
          this.$emit("submit");
        }
      }
    },
  },
};
</script>

